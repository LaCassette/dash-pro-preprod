import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';


export async function GET() {
  try {
    // Dans App Router route handlers, getSession() utilise automatiquement la requête du contexte
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const auth0User = session.user;
    const auth0Id = auth0User.sub;

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { auth0Id },
      include: {
        organizationMemberships: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id,
          email: auth0User.email || '',
          name: auth0User.name || auth0User.email || null,
          picture: auth0User.picture || null,
          role: 'USER',
        },
        include: {
          organizationMemberships: {
            include: {
              organization: true,
            },
          },
        },
      });
    } else {
      // Update user info if needed
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          email: auth0User.email || user.email,
          name: auth0User.name || user.name,
          picture: auth0User.picture || user.picture,
        },
        include: {
          organizationMemberships: {
            include: {
              organization: true,
            },
          },
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in /api/auth/user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Dans App Router route handlers, getSession() utilise automatiquement la requête du contexte
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const auth0User = session.user;
    const auth0Id = auth0User.sub;

    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, email } = body;

    // Seul un ADMIN peut changer le rôle via /api/users/[id]
    // Ici, on permet seulement de mettre à jour le nom et l'email de son propre profil
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
      },
      include: {
        organizationMemberships: {
          include: {
            organization: true,
          },
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
