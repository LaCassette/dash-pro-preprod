import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { STRIPE_PRICE_IDS } from '@/lib/stripe-prices';

// Removed edge runtime for Auth0 compatibility

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
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Vérifier que l'utilisateur est un PRO actif
    if (user.role !== 'PRO' || user.proStatus !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Only active PRO users can subscribe' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { plan } = body; // 'MONTHLY' ou 'YEARLY'

    if (!plan || !['MONTHLY', 'YEARLY'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be MONTHLY or YEARLY' },
        { status: 400 }
      );
    }

    const priceId = STRIPE_PRICE_IDS[plan as keyof typeof STRIPE_PRICE_IDS];

    // Récupérer ou créer le client Stripe
    let customerId: string;
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    if (subscription?.stripeCustomerId) {
      customerId = subscription.stripeCustomerId;
    } else {
      // Créer un nouveau client Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      // Sauvegarder le customer ID
      await prisma.subscription.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          stripeCustomerId: customerId,
          status: 'TRIAL',
        },
        update: {
          stripeCustomerId: customerId,
        },
      });
    }

    // Créer la session de checkout Stripe
    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/dashboard/subscription?success=true`,
      cancel_url: `${baseUrl}/dashboard/subscription?canceled=true`,
      subscription_data: {
        trial_period_days: 14, // 14 jours d'essai gratuit
        metadata: {
          userId: user.id,
          plan,
        },
      },
      metadata: {
        userId: user.id,
        plan,
      },
    });

    return NextResponse.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

