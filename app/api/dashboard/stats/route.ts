import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');

    const where: any = {};

    // Statistiques selon le rôle
    if (user.role === 'ADMIN') {
      // Les admins voient toutes les stats globales
      if (organizationId) {
        where.organizationId = organizationId;
      }
    } else if (user.role === 'PRO') {
      // Les pros voient les programmes qu'ils ont créés OU les programmes de leurs organisations
      const proOrgs = await prisma.organizationMember.findMany({
        where: { userId: user.id },
        select: { organizationId: true },
      });
      const proOrgIds = proOrgs.map((o: any) => o.organizationId);

      // Récupérer aussi les organisations dont le PRO est propriétaire
      const ownedOrgs = await prisma.organization.findMany({
        where: { ownerId: user.id },
        select: { id: true },
      });
      const ownedOrgIds = ownedOrgs.map((o: any) => o.id);

      // Combiner toutes les organisations du PRO
      const allProOrgIds = [...new Set([...proOrgIds, ...ownedOrgIds])];

      if (organizationId) {
        // Si on filtre par organisation spécifique
        const isMember = allProOrgIds.includes(organizationId);
        if (isMember) {
          // Le PRO peut voir tous les programmes de cette organisation
          where.organizationId = organizationId;
        } else {
          // Si le PRO n'est pas membre, seulement ses propres programmes
          where.createdById = user.id;
        }
      } else {
        // Sans filtre : voir les programmes créés par le PRO OU les programmes de ses organisations
        if (allProOrgIds.length > 0) {
          where.OR = [
            { createdById: user.id },
            { organizationId: { in: allProOrgIds } },
          ];
        } else {
          where.createdById = user.id;
        }
      }
    } else {
      // Les users voient leurs propres programmes (assignés à eux) OU les programmes de leurs organisations
      const orgs = await prisma.organizationMember.findMany({
        where: { userId: user.id },
        select: { organizationId: true },
      });
      const orgIds = orgs.map((o: any) => o.organizationId);

      const orConditions: any[] = [
        { userId: user.id },
      ];

      if (orgIds.length > 0) {
        orConditions.push({ organizationId: { in: orgIds } });
      }

      if (organizationId) {
        // Si on filtre par organisation, vérifier que l'utilisateur en fait partie
        const isMember = orgIds.includes(organizationId);
        if (isMember) {
          // L'utilisateur voit tous les programmes de cette organisation
          where.organizationId = organizationId;
        } else {
          // Si l'utilisateur n'est pas membre, seulement ses propres programmes
          where.userId = user.id;
        }
      } else {
        where.OR = orConditions;
      }
    }

    // Compter les programmes
    // Pour les USER et PRO avec OR, il faut inclure le type dans chaque condition
    const sportWhere = (user.role === 'USER' || user.role === 'PRO') && where.OR
      ? { OR: where.OR.map((condition: any) => ({ ...condition, type: 'SPORT' })) }
      : { ...where, type: 'SPORT' };

    const nutritionWhere = (user.role === 'USER' || user.role === 'PRO') && where.OR
      ? { OR: where.OR.map((condition: any) => ({ ...condition, type: 'NUTRITION' })) }
      : { ...where, type: 'NUTRITION' };

    const [sportPrograms, nutritionPrograms, totalPrograms] = await Promise.all([
      prisma.program.count({ where: sportWhere }),
      prisma.program.count({ where: nutritionWhere }),
      prisma.program.count({ where }),
    ]);

    // Compter les programmes créés récemment (7 derniers jours)
    const recentWhere: any = {
      ...where,
    };

    // Pour les USER et PRO avec OR, inclure la date dans chaque condition
    if ((user.role === 'USER' || user.role === 'PRO') && where.OR) {
      recentWhere.OR = where.OR.map((condition: any) => ({
        ...condition,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      }));
    } else {
      recentWhere.createdAt = {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      };
    }

    const recentPrograms = await prisma.program.count({
      where: recentWhere,
    });

    // Compter les chats et messages
    const chatWhere: any = {};
    if (organizationId) {
      chatWhere.organizationId = organizationId;
    } else if (user.role === 'PRO') {
      // Les pros voient les chats de leurs organisations
      const orgs = await prisma.organization.findMany({
        where: {
          OR: [
            { ownerId: user.id },
            { members: { some: { userId: user.id } } },
          ],
        },
        select: { id: true },
      });
      chatWhere.organizationId = { in: orgs.map((o: any) => o.id) };
    } else if (user.role === 'USER') {
      // Les users voient les chats où ils sont membres
      const userChats = await prisma.chatMember.findMany({
        where: { userId: user.id },
        select: { chatId: true },
      });
      chatWhere.id = { in: userChats.map((c: any) => c.chatId) };
    }

    // Récupérer les IDs des chats pour compter les messages
    let chatIds: string[] = [];
    if (Object.keys(chatWhere).length > 0) {
      const chats = await prisma.chat.findMany({
        where: chatWhere,
        select: { id: true },
      });
      chatIds = chats.map((c: any) => c.id);
    }

    const [totalChats, totalMessages, recentMessages] = await Promise.all([
      prisma.chat.count({ where: chatWhere }),
      chatIds.length > 0
        ? prisma.message.count({
          where: {
            chatId: { in: chatIds },
          },
        })
        : 0,
      chatIds.length > 0
        ? prisma.message.count({
          where: {
            chatId: { in: chatIds },
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        })
        : 0,
    ]);

    // Compter les clients (pour PRO)
    let totalClients = 0;
    if (user.role === 'PRO') {
      const orgWhere: any = {
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } },
        ],
      };

      // Filtrer par organisation si fournie
      if (organizationId) {
        orgWhere.id = organizationId;
      }

      const organizations = await prisma.organization.findMany({
        where: orgWhere,
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  role: true
                },
              },
            },
          },
        },
      });

      const clients = organizations.flatMap((org: any) =>
        org.members
          .map((m: any) => m.user)
          .filter((u: any) => u.role === 'USER' && u.id !== user.id)
      );

      totalClients = new Set(clients.map((c: any) => c.id)).size;
    }

    // Compter les organisations
    let totalOrganizations = 0;
    if (user.role === 'PRO') {
      const orgCountWhere: any = {
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } },
        ],
      };

      // Si une organisation est sélectionnée, on retourne 1 si l'utilisateur en fait partie
      if (organizationId) {
        const org = await prisma.organization.findFirst({
          where: {
            id: organizationId,
            OR: [
              { ownerId: user.id },
              { members: { some: { userId: user.id } } },
            ],
          },
        });
        totalOrganizations = org ? 1 : 0;
      } else {
        totalOrganizations = await prisma.organization.count({
          where: orgCountWhere,
        });
      }
    } else if (user.role === 'USER') {
      if (organizationId) {
        // Vérifier si l'utilisateur est membre de cette organisation
        const membership = await prisma.organizationMember.findFirst({
          where: {
            userId: user.id,
            organizationId: organizationId,
          },
        });
        totalOrganizations = membership ? 1 : 0;
      } else {
        totalOrganizations = await prisma.organizationMember.count({
          where: { userId: user.id },
        });
      }
    }

    // Compter les assistants (pour PRO)
    let totalAssistants = 0;
    if (user.role === 'PRO') {
      const agentWhere: any = { createdById: user.id };

      // Filtrer par organisation si fournie (si les agents sont liés à des organisations)
      // Note: Cette partie dépend de votre schéma Agent
      // Si les agents ont un champ organizationId, ajoutez le filtre ici
      if (organizationId) {
        // Pour l'instant, on compte tous les agents du PRO
        // Si vous avez un champ organizationId sur Agent, utilisez:
        // agentWhere.organizationId = organizationId;
      }

      totalAssistants = await prisma.agent.count({
        where: agentWhere,
      });
    }

    return NextResponse.json({
      programs: {
        sport: sportPrograms,
        nutrition: nutritionPrograms,
        total: totalPrograms,
        recent: recentPrograms,
      },
      chats: {
        total: totalChats,
        messages: {
          total: totalMessages,
          recent: recentMessages,
        },
      },
      clients: totalClients,
      organizations: totalOrganizations,
      assistants: totalAssistants,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

