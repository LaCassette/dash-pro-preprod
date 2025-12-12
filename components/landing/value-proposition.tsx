'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Zap, Users, BarChart3, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'IA Révolutionnaire',
    description: 'Générez des programmes sportifs et nutritionnels ultra-personnalisés en quelques clics grâce à notre intelligence artificielle de pointe.',
    gradient: 'from-blue-500/20 via-violet-500/15 to-fuchsia-500/10',
    iconGradient: 'from-blue-500 to-violet-500',
  },
  {
    icon: Users,
    title: 'Gestion Simplifiée',
    description: 'Centralisez tous vos clients, suivez leurs progrès et communiquez efficacement depuis une interface intuitive et puissante.',
    gradient: 'from-violet-500/20 via-purple-500/15 to-fuchsia-500/10',
    iconGradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics Avancés',
    description: 'Analysez les performances en temps réel, identifiez les tendances et optimisez vos programmes avec des données précises et actionnables.',
    gradient: 'from-fuchsia-500/20 via-pink-500/15 to-rose-500/10',
    iconGradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Sécurité Absolue',
    description: 'Protection maximale de vos données et celles de vos clients avec un chiffrement de niveau bancaire et conformité RGPD totale.',
    gradient: 'from-cyan-500/20 via-blue-500/15 to-violet-500/10',
    iconGradient: 'from-cyan-500 to-blue-500',
  },
];

export function ValueProposition() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Votre avantage compétitif
          </span>
          <h2
            className="mt-3 mb-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Pourquoi Choisir ATLETIA ?
          </h2>
          <p className="text-xl text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            La plateforme qui <span className="text-violet-400 font-semibold">révolutionne</span> votre façon de travailler avec vos clients
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="group relative border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Glow effect */}
                <div className={`absolute -inset-px rounded-lg bg-gradient-to-r ${benefit.iconGradient} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500`} />

                <CardContent className="p-6 relative z-10">
                  {/* Icon */}
                  <div className="mb-4 inline-flex">
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`relative rounded-xl bg-gradient-to-br ${benefit.gradient} p-3 ring-1 ring-violet-500/20 group-hover:ring-violet-500/40 transition-all`}>
                        <Icon className="h-6 w-6 text-violet-400" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2 text-xl font-semibold text-white"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

