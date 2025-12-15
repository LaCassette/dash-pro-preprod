import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { decrypt } from '@/lib/encryption';

export const runtime = 'edge';

/**
 * GET /api/chats
 * 
 * Récupère tous les chats de l'utilisateur connecté.
 * Inclut les membres et le dernier message de chaque chat.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Récupérer tous les chats où l'utilisateur est membre
    const chats = await prisma.chat.findMany({
      where: {
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
                role: true,
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
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Traiter les chats : déchiffrer le dernier message et compter les non lus
    const processedChats = await Promise.all(
      chats.map(async (chat: any) => {
        // Récupérer le ChatMember pour obtenir lastReadAt
        const chatMember = await prisma.chatMember.findUnique({
          where: {
            chatId_userId: {
              chatId: chat.id,
              userId: user.id,
            },
          },
        });

        const lastReadAt = chatMember?.lastReadAt || null;

        // Déchiffrer le dernier message si présent
        let lastMessage = null;
        if (chat.messages && chat.messages.length > 0) {
          const rawMessage = chat.messages[0];
          const decryptedContent = await decrypt(rawMessage.content);
          lastMessage = {
            ...rawMessage,
            content: decryptedContent ?? '🔒 Message non disponible (format obsolète)',
          };
        }

        // Compter les messages non lus (seulement ceux qui n'ont pas été marqués comme lus)
        let unreadCount = 0;
        if (lastReadAt) {
          // Messages créés après la dernière lecture
          const recentMessages = await prisma.message.findMany({
            where: {
              chatId: chat.id,
              senderId: { not: user.id },
              createdAt: { gt: lastReadAt },
            },
            select: { id: true },
          });

          if (recentMessages.length > 0) {
            // Récupérer tous les messages lus par l'utilisateur en une seule requête
            if (prisma.messageRead) {
              try {
                const readMessageIds = await prisma.messageRead.findMany({
                  where: {
                    messageId: { in: recentMessages.map((m: any) => m.id) },
                    userId: user.id,
                  },
                  select: { messageId: true },
                });

                const readIdsSet = new Set(readMessageIds.map((r: any) => r.messageId));
                unreadCount = recentMessages.filter((m: any) => !readIdsSet.has(m.id)).length;
              } catch (error) {
                // Si messageRead n'existe pas encore, considérer tous les messages comme non lus
                console.error('Error fetching read messages:', error);
                unreadCount = recentMessages.length;
              }
            } else {
              // Fallback si messageRead n'est pas disponible
              unreadCount = recentMessages.length;
            }
          }
        } else {
          // Si jamais lu, compter tous les messages des autres qui n'ont pas été lus
          const allMessages = await prisma.message.findMany({
            where: {
              chatId: chat.id,
              senderId: { not: user.id },
            },
            select: { id: true },
          });

          if (allMessages.length > 0) {
            // Récupérer tous les messages lus par l'utilisateur en une seule requête
            if (prisma.messageRead) {
              try {
                const readMessageIds = await prisma.messageRead.findMany({
                  where: {
                    messageId: { in: allMessages.map((m: any) => m.id) },
                    userId: user.id,
                  },
                  select: { messageId: true },
                });

                const readIdsSet = new Set(readMessageIds.map((r: any) => r.messageId));
                unreadCount = allMessages.filter((m: any) => !readIdsSet.has(m.id)).length;
              } catch (error) {
                // Si messageRead n'existe pas encore, considérer tous les messages comme non lus
                console.error('Error fetching read messages:', error);
                unreadCount = allMessages.length;
              }
            } else {
              // Fallback si messageRead n'est pas disponible
              unreadCount = allMessages.length;
            }
          }
        }

        return {
          ...chat,
          messages: lastMessage ? [lastMessage] : [],
          unreadCount,
          hasUnread: unreadCount > 0,
        };
      })
    );

    return NextResponse.json(processedChats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

