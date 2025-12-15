import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';


/**
 * GET /api/organizations/[id]/requests
 * 
 * Liste les demandes d'adhésion d'une organisation.
 * 
 * RBAC: PRO seulement, et doit être le propriétaire de l'organisation.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const organization = await prisma.organization.findFirst({
      where: {
        id,
        ownerId: user.id,
      },
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found or you are not the owner' },
        { status: 404 }
      );
    }

    const requests = await prisma.organizationRequest.findMany({
      where: {
        organizationId: id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

