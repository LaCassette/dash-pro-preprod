'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Server, CheckCircle2 } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Chiffrement AES-256-GCM',
    description: 'Toutes vos données et celles de vos clients sont chiffrées avec un niveau de sécurité bancaire de pointe.',
    gradient: 'from-blue-500/20 to-violet-500/10',
    iconGradient: 'from-blue-500 to-violet-500',
  },
  {
    icon: Shield,
    title: 'Conformité RGPD',
    description: 'Nous respectons strictement le RGPD et garantissons la protection maximale de vos données personnelles.',
    gradient: 'from-violet-500/20 to-purple-500/10',
    iconGradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Server,
    title: '99.9% d\'uptime',
    description: 'Notre infrastructure cloud est conçue pour une disponibilité maximale et une performance optimale.',
    gradient: 'from-fuchsia-500/20 to-pink-500/10',
    iconGradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: CheckCircle2,
    title: 'Satisfait ou Remboursé',
    description: 'Essayez ATLETIA pendant 14 jours. Si vous n\'êtes pas 100% satisfait, nous vous remboursons intégralement.',
    gradient: 'from-green-500/20 to-emerald-500/10',
    iconGradient: 'from-green-500 to-emerald-500',
  },
];

export function SecurityTrust() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Votre tranquillité d'esprit
          </span>
          <h2
            className="mt-3 mb-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Sécurité & Confiance
          </h2>
          <p className="text-xl text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Vos données et celles de vos clients sont notre <span className="text-violet-400 font-semibold">priorité absolue</span>
          </p>
        </div>

        {/* Security features grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative text-center border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Glow effect */}
                <div className={`absolute -inset-px rounded-lg bg-gradient-to-r ${feature.iconGradient} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500`} />

                <CardHeader className="relative z-10">
                  {/* Icon */}
                  <div className="mx-auto mb-4 inline-flex">
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`relative rounded-xl bg-gradient-to-br ${feature.gradient} p-3 ring-1 ring-violet-500/20 group-hover:ring-violet-500/40 transition-all`}>
                        <Icon className="h-6 w-6 text-violet-400" />
                      </div>
                    </div>
                  </div>
                  <CardTitle
                    className="text-lg text-white"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-slate-400 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {feature.description}
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

