import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';


// GET: Liste des clients d'un PRO (membres de ses organisations)
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Récupérer toutes les organisations où le PRO est owner ou membre
    const organizations = await prisma.organization.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } },
        ],
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
                createdAt: true,
              },
            },
          },
        },
      },
    });

    // Extraire tous les clients (USERs) des organisations
    const clients = organizations.flatMap((org: any) =>
      org.members
        .map((m: any) => m.user)
        .filter((u: any) => u.role === 'USER' && u.id !== user.id)
    );

    // Dédupliquer par ID
    const uniqueClients = Array.from(
      new Map(clients.map((c: any) => [c.id, c])).values()
    );

    return NextResponse.json(uniqueClients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

