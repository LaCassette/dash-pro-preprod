import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';

// Removed edge runtime for Auth0 compatibility

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const auth0User = session.user;
    const auth0Id = auth0User.sub;

    const admin = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: proId } = await params;

    // Mettre à jour le statut du PRO
    const pro = await prisma.user.update({
      where: { id: proId },
      data: {
        proStatus: 'REJECTED',
      },
    });

    return NextResponse.json({ success: true, pro });
  } catch (error) {
    console.error('Error rejecting pro:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

