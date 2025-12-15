import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { STRIPE_PRICE_IDS } from '@/lib/stripe-prices';

export const runtime = 'edge';

/**
 * Route pour synchroniser les données d'abonnement depuis Stripe
 * Utile pour corriger les données manquantes (trialEndsAt, currentPeriodEnd, plan)
 */
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
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    // Récupérer les abonnements Stripe pour ce client
    const subscriptions = await stripe.subscriptions.list({
      customer: user.subscription.stripeCustomerId,
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      // Pas d'abonnement Stripe actif, mais on peut avoir un TRIAL en base
      // Calculer trialEndsAt à partir de createdAt si manquant
      if (user.subscription.status === 'TRIAL' && !user.subscription.trialEndsAt && user.subscription.createdAt) {
        const createdAt = new Date(user.subscription.createdAt);
        const trialEndsAt = new Date(createdAt);
        trialEndsAt.setDate(trialEndsAt.getDate() + 14);

        await prisma.subscription.update({
          where: { userId: user.id },
          data: {
            trialEndsAt,
          },
        });

        return NextResponse.json({
          message: 'Trial end date calculated from createdAt',
          trialEndsAt,
        });
      }

      return NextResponse.json({
        message: 'No active Stripe subscription found',
      });
    }

    const stripeSubscription = subscriptions.data[0];
    const priceId = stripeSubscription.items.data[0]?.price.id;
    const plan = priceId === STRIPE_PRICE_IDS.MONTHLY
      ? 'MONTHLY'
      : priceId === STRIPE_PRICE_IDS.YEARLY
        ? 'YEARLY'
        : null;

    // Déterminer le statut
    let status: 'TRIAL' | 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'UNPAID' = 'ACTIVE';

    if (stripeSubscription.status === 'trialing') {
      status = 'TRIAL';
    } else if (stripeSubscription.status === 'active') {
      status = 'ACTIVE';
    } else if (stripeSubscription.status === 'canceled' || stripeSubscription.status === 'unpaid') {
      status = stripeSubscription.status === 'canceled' ? 'CANCELLED' : 'UNPAID';
    } else if (stripeSubscription.status === 'past_due') {
      status = 'PAST_DUE';
    }

    const trialEndsAt = stripeSubscription.trial_end
      ? new Date(stripeSubscription.trial_end * 1000)
      : null;
    const currentPeriodEnd = (stripeSubscription as any).current_period_end
      ? new Date((stripeSubscription as any).current_period_end * 1000)
      : null;

    // Mettre à jour l'abonnement en base
    const updated = await prisma.subscription.update({
      where: { userId: user.id },
      data: {
        stripeSubscriptionId: stripeSubscription.id,
        ...(plan && { plan }),
        status,
        trialEndsAt,
        currentPeriodEnd,
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end || false,
      },
    });

    return NextResponse.json({
      message: 'Subscription synchronized successfully',
      subscription: updated,
    });
  } catch (error: any) {
    console.error('Error syncing subscription:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

