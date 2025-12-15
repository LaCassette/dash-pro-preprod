import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

export const runtime = 'edge';

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

    let where: any;

    if (user.role === 'ADMIN') {
      // Les admins peuvent voir tous les programmes
      where = { id };
    } else if (user.role === 'PRO') {
      // Les PROs peuvent voir les programmes qu'ils ont créés
      where = { id, createdById: user.id };
    } else {
      // Les USERs peuvent voir les programmes qui leur sont assignés
      // OU les programmes de leurs organisations
      const userOrgs = await prisma.organizationMember.findMany({
        where: { userId: user.id },
        select: { organizationId: true },
      });
      const orgIds = userOrgs.map((o: any) => o.organizationId);

      where = {
        id,
        OR: [
          { userId: user.id },
          ...(orgIds.length > 0 ? [{ organizationId: { in: orgIds } }] : []),
        ],
      };
    }

    const program = await prisma.program.findFirst({
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
          },
        },
      },
    });

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Les admins peuvent modifier tous les programmes, les PROs seulement ceux qu'ils ont créés
    const where: any =
      user.role === 'ADMIN'
        ? { id }
        : {
          id,
          createdById: user.id,
        };

    const program = await prisma.program.findFirst({
      where,
    });

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, description, content } = body;

    const updated = await prisma.program.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(content && { content }),
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

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Les admins peuvent supprimer tous les programmes, les PROs seulement ceux qu'ils ont créés
    const where: any =
      user.role === 'ADMIN'
        ? { id }
        : {
          id,
          createdById: user.id,
        };

    const program = await prisma.program.findFirst({
      where,
    });

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    await prisma.program.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

