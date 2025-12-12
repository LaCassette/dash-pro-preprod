import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

// Removed edge runtime for Auth0 compatibility

/**
 * POST /api/organizations/[id]/invite
 * 
 * Invite un utilisateur à rejoindre une organisation.
 * 
 * RBAC: PRO seulement, et doit être le propriétaire de l'organisation.
 * 
 * Body:
 * - email?: string - Email de l'utilisateur à inviter (si l'utilisateur n'existe pas encore)
 * - userId?: string - ID de l'utilisateur à inviter (si l'utilisateur existe déjà)
 * 
 * Au moins un des deux (email ou userId) doit être fourni.
 */
export async function POST(
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

    const body = await request.json();
    const { email, userId } = body;

    // Validation: au moins email ou userId doit être fourni
    if (!email && !userId) {
      return NextResponse.json(
        { error: 'Email or userId is required' },
        { status: 400 }
      );
    }

    // Validation du format email si fourni
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Si userId est fourni, vérifier que l'utilisateur existe
    let targetUser = null;
    if (userId) {
      targetUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!targetUser) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
    } else {
      // Chercher l'utilisateur par email (email n'est pas unique, donc on utilise findFirst)
      targetUser = await prisma.user.findFirst({
        where: { email },
      });
    }

    const invitationEmail = targetUser?.email || email;

    // Vérifier si l'utilisateur est déjà membre
    if (targetUser) {
      const existingMember = await prisma.organizationMember.findUnique({
        where: {
          userId_organizationId: {
            userId: targetUser.id,
            organizationId: id,
          },
        },
      });

      if (existingMember) {
        return NextResponse.json(
          { error: 'User is already a member' },
          { status: 400 }
        );
      }
    }

    // Vérifier s'il existe déjà une invitation en attente pour cet email/userId
    const existingInvitation = await prisma.organizationInvitation.findFirst({
      where: {
        organizationId: id,
        OR: [
          { email: invitationEmail },
          ...(targetUser ? [{ userId: targetUser.id }] : []),
        ],
        status: 'PENDING',
      },
    });

    if (existingInvitation) {
      return NextResponse.json(
        { error: 'Invitation already sent' },
        { status: 400 }
      );
    }

    const invitation = await prisma.organizationInvitation.create({
      data: {
        organizationId: id,
        email: invitationEmail,
        userId: targetUser?.id || null,
        invitedById: user.id,
        status: 'PENDING',
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
        invitedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(invitation);
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

