import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

// Removed edge runtime for Auth0 compatibility

/**
 * POST /api/chats/direct
 * 
 * Crée ou récupère un chat direct entre deux utilisateurs.
 * 
 * Body:
 * - userId: string - ID de l'utilisateur avec qui créer le chat
 * 
 * Si un chat direct existe déjà entre les deux utilisateurs, il est retourné.
 * Sinon, un nouveau chat est créé.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId || userId === user.id) {
      return NextResponse.json(
        { error: 'Invalid userId' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur cible existe
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Vérifier que les deux utilisateurs sont dans la même organisation
    // Récupérer les organisations où l'utilisateur est membre OU propriétaire
    const userOrgsAsMember = await prisma.organizationMember.findMany({
      where: { userId: user.id },
      select: { organizationId: true },
    });

    const userOrgsAsOwner = await prisma.organization.findMany({
      where: { ownerId: user.id },
      select: { id: true },
    });

    const targetUserOrgsAsMember = await prisma.organizationMember.findMany({
      where: { userId },
      select: { organizationId: true },
    });

    const targetUserOrgsAsOwner = await prisma.organization.findMany({
      where: { ownerId: userId },
      select: { id: true },
    });

    // Combiner toutes les organisations
    const userOrgIds = new Set([
      ...userOrgsAsMember.map((om: any) => om.organizationId),
      ...userOrgsAsOwner.map((org: any) => org.id),
    ]);

    const targetUserOrgIds = new Set([
      ...targetUserOrgsAsMember.map((om: any) => om.organizationId),
      ...targetUserOrgsAsOwner.map((org: any) => org.id),
    ]);

    // Vérifier s'il y a une organisation commune
    const commonOrgs = Array.from(userOrgIds).filter((id: any) =>
      targetUserOrgIds.has(id)
    );

    if (commonOrgs.length === 0) {
      return NextResponse.json(
        { error: 'Users must be in the same organization' },
        { status: 403 }
      );
    }

    // Chercher un chat direct existant entre ces deux utilisateurs
    // Un chat direct doit avoir exactement 2 membres : l'utilisateur actuel et l'utilisateur cible
    const allChats = await prisma.chat.findMany({
      where: {
        type: 'DIRECT',
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        members: {
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
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Trouver le chat qui a exactement 2 membres et qui contient les deux utilisateurs
    const existingChat = allChats.find((chat: any) => {
      const memberIds = chat.members.map((m: any) => m.userId);
      return (
        memberIds.length === 2 &&
        memberIds.includes(user.id) &&
        memberIds.includes(userId)
      );
    });

    // Si un chat existe déjà, le retourner
    if (existingChat) {
      return NextResponse.json(existingChat);
    }

    // Créer un nouveau chat direct
    const chat = await prisma.chat.create({
      data: {
        type: 'DIRECT',
        organizationId: commonOrgs[0], // Utiliser la première organisation commune
        members: {
          create: [
            { userId: user.id },
            { userId },
          ],
        },
      },
      include: {
        members: {
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
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.error('Error creating/fetching direct chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

