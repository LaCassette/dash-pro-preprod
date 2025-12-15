import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

export const runtime = 'edge';

/**
 * POST /api/organizations/[id]/invitations/[invitationId]
 * 
 * Permet à un utilisateur d'accepter une invitation à rejoindre une organisation.
 * 
 * RBAC: L'utilisateur doit être celui pour qui l'invitation a été créée (vérifié par email ou userId).
 * 
 * Actions:
 * - Vérifie que l'invitation est en statut PENDING
 * - Vérifie que l'utilisateur n'est pas déjà membre
 * - Crée le membre et marque l'invitation comme ACCEPTED
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; invitationId: string }> }
) {
  try {
    const { id, invitationId } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const invitation = await prisma.organizationInvitation.findUnique({
      where: { id: invitationId },
      include: {
        organization: true,
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      );
    }

    // Vérifier que l'invitation est pour cet utilisateur
    if (invitation.userId && invitation.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (invitation.email !== user.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (invitation.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Invitation is not pending' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur est déjà membre
    const existingMember = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId: id,
        },
      },
    });

    if (existingMember) {
      // Marquer l'invitation comme acceptée même si déjà membre
      await prisma.organizationInvitation.update({
        where: { id: invitationId },
        data: { status: 'ACCEPTED', userId: user.id },
      });
      return NextResponse.json({ message: 'Already a member' });
    }

    // Créer le membre et marquer l'invitation comme acceptée
    await prisma.$transaction([
      prisma.organizationMember.create({
        data: {
          userId: user.id,
          organizationId: id,
        },
      }),
      prisma.organizationInvitation.update({
        where: { id: invitationId },
        data: { status: 'ACCEPTED', userId: user.id },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/organizations/[id]/invitations/[invitationId]
 * 
 * Permet à un PRO propriétaire d'annuler une invitation.
 * 
 * RBAC: PRO seulement, et doit être le propriétaire de l'organisation.
 * 
 * Actions:
 * - Marque l'invitation comme CANCELLED
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; invitationId: string }> }
) {
  try {
    const { invitationId } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const invitation = await prisma.organizationInvitation.findUnique({
      where: { id: invitationId },
      include: {
        organization: true,
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      );
    }

    if (invitation.organization.ownerId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.organizationInvitation.update({
      where: { id: invitationId },
      data: { status: 'CANCELLED' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error cancelling invitation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

