import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';


/**
 * POST /api/messages/[id]/read
 * 
 * Marque un message comme lu par l'utilisateur connecté.
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

    // Vérifier que le message existe et que l'utilisateur est membre du chat
    const message = await prisma.message.findUnique({
      where: { id },
      include: {
        chat: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Vérifier que l'utilisateur est membre du chat
    const isMember = message.chat.members.some((m: any) => m.userId === user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: 'You are not a member of this chat' },
        { status: 403 }
      );
    }

    // Ne pas marquer ses propres messages comme lus
    if (message.senderId === user.id) {
      return NextResponse.json({ success: true, alreadyOwn: true });
    }

    // Créer ou mettre à jour le MessageRead (si disponible)
    if (prisma.messageRead) {
      try {
        await prisma.messageRead.upsert({
          where: {
            messageId_userId: {
              messageId: id,
              userId: user.id,
            },
          },
          create: {
            messageId: id,
            userId: user.id,
          },
          update: {
            readAt: new Date(),
          },
        });
      } catch (error) {
        console.error('Error creating MessageRead (model may not be available):', error);
        // Continuer même si messageRead n'est pas disponible
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking message as read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

