import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { encrypt, decrypt } from '@/lib/encryption';

export const runtime = 'edge';

/**
 * GET /api/chats/[id]/messages
 * 
 * Récupère tous les messages d'un chat.
 * 
 * RBAC: L'utilisateur doit être membre du chat.
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

    // Récupérer tous les messages du chat avec leurs statuts de lecture
    let messages;
    let chatMembersCount = 0;

    try {
      // Vérifier si la relation readBy existe
      const hasReadByRelation = prisma.messageRead !== undefined;

      if (hasReadByRelation) {
        messages = await prisma.message.findMany({
          where: {
            chatId: id,
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                picture: true,
              },
            },
            readBy: {
              where: {
                userId: user.id,
              },
              select: {
                readAt: true,
              },
            },
            // Pour les messages envoyés par l'utilisateur, récupérer tous les lecteurs
            _count: {
              select: {
                readBy: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        });

        // Récupérer le nombre total de membres du chat (pour déterminer si tous ont lu)
        chatMembersCount = await prisma.chatMember.count({
          where: { chatId: id },
        });
      } else {
        // Fallback si readBy n'est pas disponible
        messages = await prisma.message.findMany({
          where: {
            chatId: id,
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                picture: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        });
      }
    } catch (error) {
      // Si l'include avec readBy échoue, récupérer sans readBy
      console.error('Error fetching messages with readBy, falling back:', error);
      messages = await prisma.message.findMany({
        where: {
          chatId: id,
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              picture: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      });
    }

    // Déchiffrer les messages et ajouter le statut de lecture
    const decryptedMessages = await Promise.all(messages.map(async (message: any) => {
      let decryptedContent = message.content;
      try {
        decryptedContent = await decrypt(message.content);
      } catch (error) {
        // Si le déchiffrement échoue (ancien message ou clé invalide), retourner un message d'erreur
        // au lieu de faire planter toute la requête
        console.warn(`Failed to decrypt message ${message.id}:`, error);
        decryptedContent = '🔒 Message non disponible (format obsolète)';
      }

      // Pour les messages de l'utilisateur : vérifier combien de personnes ont lu
      const isOwnMessage = message.senderId === user.id;
      const readCount = message._count?.readBy || 0;
      // Un message est considéré comme lu par tous si tous les autres membres (sauf l'expéditeur) l'ont lu
      const totalRecipients = chatMembersCount > 0 ? chatMembersCount - 1 : 0; // -1 pour exclure l'expéditeur
      const isReadByAll = isOwnMessage && chatMembersCount > 0 && readCount >= totalRecipients;
      const isRead = isOwnMessage ? isReadByAll : (message.readBy?.length > 0 || false);

      return {
        id: message.id,
        content: decryptedContent,
        chatId: message.chatId,
        senderId: message.senderId,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        sender: message.sender,
        isRead,
        isReadByAll,
        readCount: isOwnMessage ? readCount : undefined,
      };
    }));

    return NextResponse.json(decryptedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/chats/[id]/messages
 * 
 * Envoie un message dans un chat.
 * 
 * RBAC: L'utilisateur doit être membre du chat.
 * 
 * Body:
 * - content: string - Contenu du message
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

    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
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

    // Vérifier que le chat existe
    const chat = await prisma.chat.findUnique({
      where: { id },
    });

    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    // Chiffrer le message avant de le sauvegarder
    const encryptedContent = await encrypt(content.trim());

    // Créer le message
    const message = await prisma.message.create({
      data: {
        content: encryptedContent,
        chatId: id,
        senderId: user.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
      },
    });

    // Déchiffrer pour la réponse
    message.content = content.trim();

    // Mettre à jour le chat pour mettre à jour updatedAt
    await prisma.chat.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

