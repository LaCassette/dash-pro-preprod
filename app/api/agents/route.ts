import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const agents = await prisma.agent.findMany({
      where: { createdById: user.id },
      include: {
        profileUser: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
        _count: {
          select: {
            sessions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
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

    const body = await request.json();
    const { name, image, prompt, context, profileUserId } = body;

    if (!name || !prompt) {
      return NextResponse.json(
        { error: 'Name and prompt are required' },
        { status: 400 }
      );
    }

    const agent = await prisma.agent.create({
      data: {
        name,
        image,
        prompt,
        context,
        createdById: user.id,
        profileUserId: profileUserId || null,
      },
      include: {
        profileUser: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
      },
    });

    return NextResponse.json(agent);
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

