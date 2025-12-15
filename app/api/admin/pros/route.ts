import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';


export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const auth0User = session.user;
    const auth0Id = auth0User.sub;

    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Récupérer tous les PROs avec leur statut
    const pros = await prisma.user.findMany({
      where: {
        role: 'PRO',
      },
      select: {
        id: true,
        email: true,
        name: true,
        picture: true,
        proStatus: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(pros);
  } catch (error) {
    console.error('Error fetching pros:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

