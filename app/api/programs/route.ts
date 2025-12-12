import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

// Removed edge runtime for Auth0 compatibility

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const organizationId = searchParams.get('organizationId');
    const type = searchParams.get('type');

    const where: any = {};

    if (user.role === 'ADMIN') {
      // Les admins voient tous les programmes
      if (userId) {
        where.userId = userId;
      }
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

      if (userId) {
        // Si on filtre par userId, on garde seulement les programmes créés par le PRO pour cet utilisateur
        where.createdById = user.id;
        where.userId = userId;
      } else if (organizationId) {
        // Si on filtre par organisation spécifique
        const isMember = allProOrgIds.includes(organizationId);
        if (isMember) {
          // Le PRO peut voir tous les programmes de cette organisation
          // OU ses propres programmes sans organizationId (pour la migration)
          where.OR = [
            { organizationId: organizationId },
            { createdById: user.id, organizationId: null },
          ];
        } else {
          // Si le PRO n'est pas membre, seulement ses propres programmes de cette organisation
          // (mais il ne devrait pas avoir accès à cette organisation)
          where.createdById = user.id;
          where.organizationId = organizationId;
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

      if (organizationId) {
        // Si on filtre par organisation, vérifier que l'utilisateur en fait partie
        const isMember = orgIds.includes(organizationId);

        if (isMember) {
          // L'utilisateur voit tous les programmes de cette organisation
          // (peu importe s'ils sont assignés à lui ou non, tant qu'ils sont dans l'organisation)
          where.organizationId = organizationId;
        } else {
          // Si l'utilisateur n'est pas membre, seulement ses propres programmes
          where.userId = user.id;
        }
      } else {
        // Sans filtre : voir les programmes assignés à l'utilisateur OU les programmes de ses organisations
        const orConditions: any[] = [
          { userId: user.id },
        ];

        if (orgIds.length > 0) {
          orConditions.push({ organizationId: { in: orgIds } });
        }

        where.OR = orConditions;
      }
    }

    if (type && ['SPORT', 'NUTRITION'].includes(type)) {
      where.type = type;
    }

    const programs = await prisma.program.findMany({
      where,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        user: {
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
            accentColor: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Vérifier que le PRO a un abonnement actif (TRIAL ou ACTIVE)
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    if (!subscription || (subscription.status !== 'TRIAL' && subscription.status !== 'ACTIVE')) {
      return NextResponse.json(
        {
          error: 'Un abonnement actif est requis pour créer des programmes.',
          code: 'SUBSCRIPTION_REQUIRED'
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, type, content, userId, organizationId } = body;

    if (!name || !type || !content) {
      return NextResponse.json(
        { error: 'Name, type, and content are required' },
        { status: 400 }
      );
    }

    if (!['SPORT', 'NUTRITION'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be SPORT or NUTRITION' },
        { status: 400 }
      );
    }

    // L'organizationId est maintenant requis pour associer le programme à une organisation
    if (!organizationId) {
      return NextResponse.json(
        { error: 'organizationId is required. Please select an organization.' },
        { status: 400 }
      );
    }

    // Vérifier que le PRO a accès à cette organisation
    const org = await prisma.organization.findFirst({
      where: {
        id: organizationId,
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } },
        ],
      },
    });

    if (!org) {
      return NextResponse.json(
        { error: 'You do not have access to this organization' },
        { status: 403 }
      );
    }

    // Vérifier que l'utilisateur cible est dans l'organisation du pro
    if (userId) {
      const membership = await prisma.organizationMember.findUnique({
        where: {
          userId_organizationId: {
            userId,
            organizationId,
          },
        },
      });

      if (!membership) {
        return NextResponse.json(
          { error: 'User is not a member of this organization' },
          { status: 400 }
        );
      }
    }

    const program = await prisma.program.create({
      data: {
        name,
        description,
        type,
        content,
        createdById: user.id,
        userId: userId || null,
        organizationId: organizationId, // Toujours défini maintenant
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        user: {
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

    return NextResponse.json(program);
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

