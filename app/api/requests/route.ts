import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

// Removed edge runtime for Auth0 compatibility

/**
 * GET /api/requests
 * 
 * Liste toutes les demandes d'adhésion de l'utilisateur connecté.
 * 
 * RBAC: USER seulement (les PROs gèrent les demandes via /api/organizations/[id]/requests).
 * 
 * Retourne toutes les demandes (PENDING, APPROVED, REJECTED) pour permettre
 * à l'utilisateur de voir l'historique.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Les USERs peuvent voir leurs demandes, les PROs les gèrent via /api/organizations/[id]/requests
    // On permet quand même aux PROs de voir leurs propres demandes s'ils en ont
    const requests = await prisma.organizationRequest.findMany({
      where: {
        userId: user.id,
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logo: true,
            accentColor: true,
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

