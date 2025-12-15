import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';


/**
 * Route pour définir le rôle PRO lors de l'inscription
 * Appelée après la première connexion Auth0 si l'utilisateur a choisi PRO
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const auth0User = session.user;
    const auth0Id = auth0User.sub;
    const body = await request.json();
    const { role } = body;

    if (role !== 'PRO') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Ne permettre le changement que si l'utilisateur est encore USER
    // et que c'est sa première connexion (pas encore de rôle PRO défini)
    if (user.role !== 'USER') {
      return NextResponse.json(
        { error: 'Role already set' },
        { status: 400 }
      );
    }

    // Mettre à jour le rôle en PRO avec statut PENDING
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        role: 'PRO',
        proStatus: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error setting role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

