import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const session = await auth0.getSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const auth0User = session.user;
    const auth0Id = auth0User.sub;

    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: {
        subscription: true,
      },
    });

    if (!user || !user.subscription?.stripeCustomerId) {
      return NextResponse.json([]);
    }

    // Récupérer les invoices depuis Stripe
    const invoices = await stripe.invoices.list({
      customer: user.subscription.stripeCustomerId,
      limit: 12, // 12 dernières factures
    });

    return NextResponse.json(invoices.data);
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

