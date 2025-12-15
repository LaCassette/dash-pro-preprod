import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

export const runtime = 'edge';

/**
 * GET /api/organizations/[id]/invitations
 * 
 * Liste les invitations d'une organisation.
 * 
 * RBAC:
 * - PROs: voient toutes les invitations de leurs organisations
 * - USERs: voient seulement leurs propres invitations
 * 
 * L'utilisateur doit être membre de l'organisation ou en être le propriétaire.
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

    const organization = await prisma.organization.findFirst({
      where: {
        id,
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } },
        ],
      },
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Les PROs voient toutes les invitations, les USERs voient seulement les leurs
    const where: any = {
      organizationId: id,
    };

    if (user.role !== 'PRO' && organization.ownerId !== user.id) {
      where.userId = user.id;
    }

    const invitations = await prisma.organizationInvitation.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
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

