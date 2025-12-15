import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
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
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';

    // Créer la session du portail client Stripe
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.subscription.stripeCustomerId,
      return_url: `${baseUrl}/dashboard/subscription`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

