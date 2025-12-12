import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

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

