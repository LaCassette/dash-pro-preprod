import Stripe from 'stripe';

// Lazy-loaded Stripe client to prevent build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    });
  }
  return stripeInstance;
}

// Legacy export for backwards compatibility - will throw at runtime if env var missing
export const stripe = {
  get customers() { return getStripe().customers; },
  get subscriptions() { return getStripe().subscriptions; },
  get paymentMethods() { return getStripe().paymentMethods; },
  get invoices() { return getStripe().invoices; },
  get checkout() { return getStripe().checkout; },
  get billingPortal() { return getStripe().billingPortal; },
  get webhooks() { return getStripe().webhooks; },
  get prices() { return getStripe().prices; },
  get products() { return getStripe().products; },
};

// Prix des abonnements (en centimes)
export const PRICING = {
  MONTHLY: {
    amount: 4900, // 49€
    currency: 'eur',
    interval: 'month' as const,
  },
  YEARLY: {
    amount: 49900, // 499€
    currency: 'eur',
    interval: 'year' as const,
  },
} as const;

// Durée de la période d'essai (14 jours)
export const TRIAL_PERIOD_DAYS = 14;

