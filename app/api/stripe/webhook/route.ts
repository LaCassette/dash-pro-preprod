import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { STRIPE_PRICE_IDS } from '@/lib/stripe-prices';
import Stripe from 'stripe';

export const runtime = 'edge';
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const priceId = subscription.items.data[0]?.price.id;
  const plan = priceId === STRIPE_PRICE_IDS.MONTHLY
    ? 'MONTHLY'
    : priceId === STRIPE_PRICE_IDS.YEARLY
      ? 'YEARLY'
      : null;

  // Trouver l'utilisateur par customer ID
  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeCustomerId: customerId },
    include: { user: true },
  });

  if (!dbSubscription) {
    console.error('Subscription not found for customer:', customerId);
    return;
  }

  // Déterminer le statut
  let status: 'TRIAL' | 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'UNPAID' = 'ACTIVE';

  if (subscription.status === 'trialing') {
    status = 'TRIAL';
  } else if (subscription.status === 'active') {
    status = 'ACTIVE';
  } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    status = subscription.status === 'canceled' ? 'CANCELLED' : 'UNPAID';
  } else if (subscription.status === 'past_due') {
    status = 'PAST_DUE';
  }

  const trialEndsAt = subscription.trial_end
    ? new Date(subscription.trial_end * 1000)
    : null;
  const currentPeriodEnd = (subscription as any).current_period_end
    ? new Date((subscription as any).current_period_end * 1000)
    : null;

  await prisma.subscription.update({
    where: { userId: dbSubscription.userId },
    data: {
      stripeSubscriptionId: subscriptionId,
      ...(plan && { plan }),
      status,
      trialEndsAt,
      currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (dbSubscription) {
    await prisma.subscription.update({
      where: { userId: dbSubscription.userId },
      data: {
        status: 'CANCELLED',
        cancelAtPeriodEnd: false,
      },
    });
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (dbSubscription && dbSubscription.status !== 'ACTIVE') {
    await prisma.subscription.update({
      where: { userId: dbSubscription.userId },
      data: {
        status: 'ACTIVE',
      },
    });
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (dbSubscription) {
    await prisma.subscription.update({
      where: { userId: dbSubscription.userId },
      data: {
        status: 'PAST_DUE',
      },
    });
  }
}

