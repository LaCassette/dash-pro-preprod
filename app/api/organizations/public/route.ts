import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

export const runtime = 'edge';

/**
 * GET /api/organizations/public
 * 
 * Liste toutes les organisations publiques pour permettre aux utilisateurs
 * de les découvrir et de demander à les rejoindre.
 * 
 * RBAC: Tous les utilisateurs authentifiés.
 * 
 * Note: Cette route retourne toutes les organisations, mais les utilisateurs
 * peuvent filtrer côté client pour exclure celles dont ils sont déjà membres.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Récupérer toutes les organisations
    const organizations = await prisma.organization.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(organizations);
  } catch (error) {
    console.error('Error fetching public organizations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

