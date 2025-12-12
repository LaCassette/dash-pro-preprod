'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { useSubscription } from '@/hooks/use-subscription';
import { useInvoices } from '@/hooks/use-invoices';
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  CreditCard,
  AlertCircle,
  ExternalLink,
  FileText,
  Download,
  TrendingUp,
  Calendar,
  Euro
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Stripe from 'stripe';

export function SubscriptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user } = useUser();
  const { subscription, loading: subscriptionLoading } = useSubscription();
  const { invoices, loading: invoicesLoading } = useInvoices();
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Synchroniser les données d'abonnement au chargement si nécessaire
  useEffect(() => {
    if (subscription && !subscriptionLoading && !syncing) {
      // Si on a un abonnement mais que certaines données sont manquantes, synchroniser
      const needsSync = 
        (subscription.status === 'TRIAL' && !subscription.trialEndsAt) ||
        (!subscription.currentPeriodEnd && subscription.stripeSubscriptionId) ||
        (!subscription.plan && subscription.stripeSubscriptionId);

      if (needsSync) {
        setSyncing(true);
        fetch('/api/subscription/sync', { method: 'POST' })
          .then((res) => res.json())
          .then(() => {
            // Recharger la page pour afficher les nouvelles données
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error syncing subscription:', error);
            setSyncing(false);
          });
      }
    }
  }, [subscription, subscriptionLoading, syncing]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast({
        title: 'Abonnement activé',
        description: 'Votre abonnement a été activé avec succès !',
      });
      router.replace('/dashboard/subscription');
    }
    if (searchParams.get('canceled') === 'true') {
      toast({
        title: 'Paiement annulé',
        description: 'Le processus de paiement a été annulé.',
        variant: 'destructive',
      });
      router.replace('/dashboard/subscription');
    }
  }, [searchParams, router, toast]);

  const handleSubscribe = async (plan: 'MONTHLY' | 'YEARLY') => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error('Error creating checkout:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer la session de paiement',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create portal');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error('Error creating portal:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible d\'accéder au portail de gestion',
        variant: 'destructive',
      });
      setPortalLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!subscription) return null;

    switch (subscription.status) {
      case 'TRIAL':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            Essai gratuit
          </Badge>
        );
      case 'ACTIVE':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Actif
          </Badge>
        );
      case 'CANCELLED':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300">
            <XCircle className="h-3 w-3 mr-1" />
            Annulé
          </Badge>
        );
      case 'PAST_DUE':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Paiement en retard
          </Badge>
        );
      case 'UNPAID':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Impayé
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount / 100);
  };

  const calculateSavings = () => {
    if (!subscription || !subscription.plan) return null;

    const monthlyPrice = 49;
    const yearlyPrice = 499;
    const yearlyMonthlyEquivalent = yearlyPrice / 12;

    if (subscription.plan === 'YEARLY') {
      const savings = (monthlyPrice - yearlyMonthlyEquivalent) * 12;
      return {
        amount: savings,
        percentage: Math.round((savings / (monthlyPrice * 12)) * 100),
      };
    }
    return null;
  };

  const calculateTrialEndDate = () => {
    if (!subscription || subscription.status !== 'TRIAL') return null;
    
    // Si trialEndsAt est null, calculer à partir de createdAt + 14 jours
    if (!subscription.trialEndsAt && subscription.createdAt) {
      const createdAt = new Date(subscription.createdAt);
      const trialEnd = new Date(createdAt);
      trialEnd.setDate(trialEnd.getDate() + 14);
      return trialEnd;
    }
    
    return subscription.trialEndsAt ? new Date(subscription.trialEndsAt) : null;
  };

  const getNextPaymentDate = () => {
    if (!subscription) return null;
    
    if (subscription.status === 'TRIAL') {
      return calculateTrialEndDate();
    }
    
    return subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd) : null;
  };

  if (user?.role !== 'PRO') {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Cette page est réservée aux professionnels.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (user.proStatus === 'PENDING') {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Abonnement</h1>
            <p className="text-muted-foreground">
              Gérez votre abonnement Atletia
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compte en attente de validation</CardTitle>
            <CardDescription>
              Votre compte professionnel est en attente de validation par un administrateur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Une fois votre compte validé, vous pourrez souscrire à un abonnement et accéder à toutes les fonctionnalités.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const savings = calculateSavings();
  const nextPaymentDate = getNextPaymentDate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6 flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-3xl font-bold">Abonnement</h1>
          <p className="text-muted-foreground">
            Gérez votre abonnement Atletia
          </p>
        </div>
      </div>

      {subscriptionLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : subscription ? (
        <div className="grid gap-6">
          {/* Statut actuel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Votre abonnement</CardTitle>
                  <CardDescription>
                    {subscription.plan === 'MONTHLY' 
                      ? 'Plan Mensuel - 49€/mois'
                      : subscription.plan === 'YEARLY'
                      ? 'Plan Annuel - 499€/an (41,58€/mois)'
                      : 'Aucun plan actif'}
                  </CardDescription>
                </div>
                {getStatusBadge()}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <p className="text-lg font-semibold">
                    {subscription.status === 'TRIAL' && 'Essai gratuit'}
                    {subscription.status === 'ACTIVE' && 'Actif'}
                    {subscription.status === 'CANCELLED' && 'Annulé'}
                    {subscription.status === 'PAST_DUE' && 'Paiement en retard'}
                    {subscription.status === 'UNPAID' && 'Impayé'}
                  </p>
                </div>
                {nextPaymentDate && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {subscription.status === 'TRIAL' ? 'Fin de l\'essai' : 'Prochain paiement'}
                    </p>
                    <p className="text-lg font-semibold">
                      {formatDate(nextPaymentDate.toISOString())}
                    </p>
                  </div>
                )}
                {savings && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Économies annuelles
                    </p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                      {savings.amount.toFixed(2)}€ ({savings.percentage}%)
                    </p>
                  </div>
                )}
              </div>

              {subscription.status === 'TRIAL' && (
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="font-semibold text-blue-900 dark:text-blue-100">
                      Période d'essai active
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {nextPaymentDate ? (
                      <>
                        Votre essai gratuit se termine le {formatDate(nextPaymentDate.toISOString())}.
                        {!subscription.cancelAtPeriodEnd && (
                          <span className="block mt-1">
                            Votre abonnement sera automatiquement renouvelé à cette date.
                          </span>
                        )}
                      </>
                    ) : (
                      'Votre période d\'essai de 14 jours est active.'
                    )}
                  </p>
                </div>
              )}

              {subscription.cancelAtPeriodEnd && (
                <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                      Abonnement annulé
                    </p>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    {nextPaymentDate ? (
                      <>
                        Votre abonnement sera annulé à la fin de la période actuelle ({formatDate(nextPaymentDate.toISOString())}).
                        Vous continuerez à avoir accès jusqu'à cette date.
                      </>
                    ) : (
                      'Votre abonnement sera annulé à la fin de la période actuelle.'
                    )}
                  </p>
                </div>
              )}

              {savings && (
                <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Euro className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <p className="font-semibold text-green-900 dark:text-green-100">
                      Vous économisez avec le plan annuel
                    </p>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    En choisissant le plan annuel, vous économisez <strong>{savings.amount.toFixed(2)}€</strong> par an 
                    (soit <strong>{savings.percentage}%</strong> de réduction) par rapport au plan mensuel.
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                  variant="outline"
                >
                  {portalLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Gérer l'abonnement
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Changer de plan - Afficher uniquement l'autre plan */}
          {subscription.plan && (
            <Card>
              <CardHeader>
                <CardTitle>Changer de plan</CardTitle>
                <CardDescription>
                  {subscription.plan === 'MONTHLY' 
                    ? 'Passez au plan annuel et économisez 89€ par an'
                    : 'Passez au plan mensuel pour plus de flexibilité'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {subscription.plan === 'MONTHLY' ? (
                  // Afficher uniquement le plan annuel
                  <div className="rounded-lg border-2 border-primary p-6">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">Plan Annuel</h3>
                        <Badge variant="secondary" className="text-xs">Économisez 89€</Badge>
                      </div>
                      <p className="text-3xl font-bold">499€<span className="text-lg font-normal text-muted-foreground">/an</span></p>
                      <p className="text-sm text-muted-foreground mt-1">Soit 41,58€/mois</p>
                      <p className="text-sm font-semibold text-primary mt-2">Économisez 89€ par rapport au plan mensuel</p>
                    </div>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Tout du plan Mensuel
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Assistants IA illimités
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Gestion d'organisations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Support prioritaire
                      </li>
                    </ul>
                    <Button
                      className="w-full"
                      onClick={() => handleSubscribe('YEARLY')}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Chargement...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Passer au plan annuel
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  // Afficher uniquement le plan mensuel
                  <div className="rounded-lg border p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Plan Mensuel</h3>
                      <p className="text-3xl font-bold">49€<span className="text-lg font-normal text-muted-foreground">/mois</span></p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Plus de flexibilité avec un engagement mensuel
                      </p>
                    </div>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Programmes illimités
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        1 assistant IA
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Support par email
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSubscribe('MONTHLY')}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Chargement...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Passer au plan mensuel
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Factures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Factures
              </CardTitle>
              <CardDescription>
                Historique de vos factures et paiements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {invoicesLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : invoices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune facture pour le moment</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {invoices.map((invoice: Stripe.Invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">
                              {invoice.description || `Facture #${invoice.number || invoice.id.slice(-8)}`}
                            </p>
                            {invoice.status === 'paid' && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Payée
                              </Badge>
                            )}
                            {invoice.status === 'open' && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300">
                                En attente
                              </Badge>
                            )}
                            {invoice.status === 'void' && (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300">
                                Annulée
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {invoice.created ? new Date(invoice.created * 1000).toLocaleDateString('fr-FR') : 'N/A'}
                            </span>
                            {invoice.period_start && invoice.period_end && (
                              <span>
                                {new Date(invoice.period_start * 1000).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })} - {new Date(invoice.period_end * 1000).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-semibold">
                          {formatCurrency(invoice.amount_paid || invoice.amount_due || 0)}
                        </p>
                        {invoice.hosted_invoice_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(invoice.hosted_invoice_url || '', '_blank')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Aucun abonnement actif</CardTitle>
            <CardDescription>
              Choisissez un plan pour accéder à toutes les fonctionnalités
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">Plan Mensuel</h3>
                  <p className="text-3xl font-bold">49€<span className="text-lg font-normal text-muted-foreground">/mois</span></p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Parfait pour tester ou une utilisation ponctuelle
                  </p>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Programmes illimités
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    1 assistant IA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Support par email
                  </li>
                </ul>
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe('MONTHLY')}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Choisir le plan mensuel
                    </>
                  )}
                </Button>
              </div>

              <div className="rounded-lg border-2 border-primary p-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary">Le plus populaire</Badge>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">Plan Annuel</h3>
                  <p className="text-3xl font-bold">499€<span className="text-lg font-normal text-muted-foreground">/an</span></p>
                  <p className="text-sm text-muted-foreground mt-1">Soit 41,58€/mois</p>
                  <p className="text-sm font-semibold text-primary mt-2">Économisez 89€</p>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Tout du plan Mensuel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Assistants IA illimités
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Gestion d'organisations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Support prioritaire
                  </li>
                </ul>
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe('YEARLY')}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Choisir le plan annuel
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Essai gratuit de 14 jours</strong> • Aucune carte bancaire requise pour l'essai • Annulation à tout moment
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
