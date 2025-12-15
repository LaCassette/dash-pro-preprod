import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';


/**
 * GET /api/invitations
 * 
 * Liste toutes les invitations en attente pour l'utilisateur connecté.
 * 
 * RBAC: Tous les utilisateurs authentifiés peuvent voir leurs invitations.
 * 
 * Les invitations sont filtrées par:
 * - Email de l'utilisateur
 * - userId de l'utilisateur
 * - Statut PENDING uniquement
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Récupérer toutes les invitations pour cet utilisateur (par email ou userId)
    const invitations = await prisma.organizationInvitation.findMany({
      where: {
        OR: [
          { email: user.email },
          { userId: user.id },
        ],
        status: 'PENDING',
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logo: true,
            accentColor: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        invitedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(invitations);
  } catch (error) {
    console.error('Error fetching invitations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

