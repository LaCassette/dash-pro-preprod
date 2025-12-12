import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

// Removed edge runtime for Auth0 compatibility

/**
 * POST /api/programs/migrate
 * 
 * Route pour migrer les programmes existants sans organizationId vers une organisation.
 * 
 * RBAC: PRO seulement, et doit être propriétaire ou membre de l'organisation.
 * 
 * Body:
 * - organizationId: string (requis) - ID de l'organisation
 * - programIds?: string[] (optionnel) - IDs des programmes à migrer. Si non fourni, migre tous les programmes du PRO sans organizationId
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { organizationId, programIds } = body;

    if (!organizationId) {
      return NextResponse.json(
        { error: 'organizationId is required' },
        { status: 400 }
      );
    }

    // Vérifier que le PRO a accès à cette organisation
    const org = await prisma.organization.findFirst({
      where: {
        id: organizationId,
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } },
        ],
      },
    });

    if (!org) {
      return NextResponse.json(
        { error: 'You do not have access to this organization' },
        { status: 403 }
      );
    }

    // Construire la condition where
    const where: any = {
      createdById: user.id,
      organizationId: null,
    };

    if (programIds && Array.isArray(programIds) && programIds.length > 0) {
      where.id = { in: programIds };
    }

    // Mettre à jour les programmes
    const result = await prisma.program.updateMany({
      where,
      data: {
        organizationId: organizationId,
      },
    });

    return NextResponse.json({
      success: true,
      updated: result.count,
      message: `${result.count} programme(s) migré(s) vers l'organisation ${org.name}`,
    });
  } catch (error) {
    console.error('Error migrating programs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

