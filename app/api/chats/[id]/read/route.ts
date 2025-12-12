import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

// Removed edge runtime for Auth0 compatibility

/**
 * POST /api/chats/[id]/read
 * 
 * Marque un chat comme lu en mettant à jour lastReadAt du ChatMember.
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

    // Vérifier que l'utilisateur est membre du chat
    const chatMember = await prisma.chatMember.findUnique({
      where: {
        chatId_userId: {
          chatId: id,
          userId: user.id,
        },
      },
    });

    if (!chatMember) {
      return NextResponse.json(
        { error: 'You are not a member of this chat' },
        { status: 403 }
      );
    }

    // Mettre à jour lastReadAt (si le champ existe)
    try {
      await prisma.chatMember.update({
        where: {
          chatId_userId: {
            chatId: id,
            userId: user.id,
          },
        },
        data: {
          lastReadAt: new Date(),
        },
      });
    } catch (error: any) {
      // Si lastReadAt n'existe pas encore dans le client Prisma, ignorer l'erreur
      if (error?.code === 'P2009' || error?.message?.includes('Unknown argument')) {
        console.warn('lastReadAt field not available in Prisma client, skipping update');
      } else {
        throw error;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking chat as read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

