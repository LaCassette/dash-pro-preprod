'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Mensuel',
    price: '49',
    period: '€ TTC / mois',
    monthlyPrice: 49,
    description: 'Parfait pour tester ou une utilisation ponctuelle',
    features: [
      'Programmes sportifs et nutritionnels illimités',
      'Gestion de clients illimitée',
      'Messagerie sécurisée',
      'Assistants IA (1 assistant)',
      'Calculatrices professionnelles',
      'Support par email',
    ],
    cta: 'Commencer maintenant',
    popular: false,
  },
  {
    name: 'Annuel',
    price: '499',
    period: '€ TTC / an',
    monthlyPrice: 41.58, // 499 / 12
    description: 'Le meilleur rapport qualité-prix, économisez 2 mois',
    savings: 'Économisez 89€ (soit 41,58€/mois)',
    features: [
      'Tout du plan Mensuel',
      'Assistants IA illimités',
      'Gestion d\'organisations',
      'Support prioritaire',
      'Statistiques avancées',
      '2 mois offerts',
    ],
    cta: 'Choisir l\'annuel',
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Tarification
          </span>
          <h2
            className="mt-3 mb-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Tarification Simple & Transparente
          </h2>
          <p className="text-xl text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Choisissez le plan qui correspond à vos <span className="text-violet-400 font-semibold">besoins</span>
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`group relative transition-all duration-500 hover:-translate-y-2 ${plan.popular
                ? 'border-2 border-violet-500/50 bg-slate-800/70 backdrop-blur-sm shadow-2xl shadow-violet-500/20'
                : 'border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10'
                }`}
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glow effect for popular */}
              {plan.popular && (
                <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 opacity-20 blur-lg" />
              )}

              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                    Le plus populaire
                  </div>
                </div>
              )}

              <CardHeader className="relative z-10">
                <CardTitle
                  className="text-2xl text-white"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span
                    className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {' '}{plan.period}
                  </span>
                  {plan.monthlyPrice && plan.name === 'Annuel' && (
                    <p className="mt-1 text-sm text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Soit <span className="font-semibold text-violet-400">{plan.monthlyPrice.toFixed(2)}€</span> / mois
                    </p>
                  )}
                </div>
                {plan.savings && (
                  <p className="mt-2 text-sm font-semibold text-green-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    ✨ {plan.savings}
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 text-violet-400 flex-shrink-0" />
                      <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className={`w-full font-semibold ${plan.popular
                    ? 'bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 hover:from-blue-700 hover:via-violet-700 hover:to-fuchsia-700 border-0 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40'
                    : 'border-violet-500/30 bg-slate-800/50 text-white hover:bg-violet-500/20 hover:border-violet-500/50'
                    }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  <Link href="/auth/login">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom text */}
        <div className="mt-12 text-center">
          <p className="text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            <strong className="text-white">Essai gratuit de 14 jours</strong> • Aucune carte bancaire requise • Annulation à tout moment
          </p>
        </div>
      </div>
    </section>
  );
}

