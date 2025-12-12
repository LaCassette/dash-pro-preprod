import { SubscriptionStatus, SubscriptionPlan } from '@prisma/client';

/**
 * Vérifie si l'utilisateur peut créer une organisation
 */
export function canCreateOrganization(
  subscriptionStatus: SubscriptionStatus | null,
  subscriptionPlan: SubscriptionPlan | null
): boolean {
  if (!subscriptionStatus || subscriptionStatus === 'TRIAL') {
    return false;
  }
  
  // Seul le plan annuel permet de créer des organisations
  return subscriptionPlan === 'YEARLY' && subscriptionStatus === 'ACTIVE';
}

/**
 * Vérifie si l'utilisateur peut créer des assistants IA illimités
 */
export function canCreateUnlimitedAgents(
  subscriptionStatus: SubscriptionStatus | null,
  subscriptionPlan: SubscriptionPlan | null
): boolean {
  if (!subscriptionStatus || subscriptionStatus === 'TRIAL') {
    return false;
  }
  
  // Seul le plan annuel permet des assistants illimités
  return subscriptionPlan === 'YEARLY' && subscriptionStatus === 'ACTIVE';
}

/**
 * Retourne le nombre maximum d'assistants IA selon l'abonnement
 */
export function getMaxAgents(
  subscriptionStatus: SubscriptionStatus | null,
  subscriptionPlan: SubscriptionPlan | null
): number {
  if (!subscriptionStatus || subscriptionStatus === 'TRIAL') {
    return 1; // 1 assistant pendant l'essai
  }
  
  if (subscriptionPlan === 'YEARLY' && subscriptionStatus === 'ACTIVE') {
    return Infinity; // Illimité pour le plan annuel
  }
  
  if (subscriptionPlan === 'MONTHLY' && subscriptionStatus === 'ACTIVE') {
    return 1; // 1 assistant pour le plan mensuel
  }
  
  return 0; // Aucun assistant si pas d'abonnement actif
}

/**
 * Vérifie si l'utilisateur a accès aux fonctionnalités premium
 */
export function hasActiveSubscription(
  subscriptionStatus: SubscriptionStatus | null
): boolean {
  return subscriptionStatus === 'ACTIVE' || subscriptionStatus === 'TRIAL';
}

/**
 * Vérifie si l'utilisateur est en période d'essai
 */
export function isTrialPeriod(
  subscriptionStatus: SubscriptionStatus | null,
  trialEndsAt: Date | null
): boolean {
  if (subscriptionStatus !== 'TRIAL' || !trialEndsAt) {
    return false;
  }
  
  return new Date() < trialEndsAt;
}

