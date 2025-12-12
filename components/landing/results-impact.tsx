'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, Users, Zap } from 'lucide-react';

const results = [
  {
    icon: Clock,
    metric: '80%',
    description: 'De temps économisé',
    detail: 'Grâce à l\'IA, créez des programmes en 2 minutes au lieu de 30 minutes minimum',
    gradient: 'from-blue-500 to-violet-500',
    bgGradient: 'from-blue-500/20 to-violet-500/10',
  },
  {
    icon: Users,
    metric: '3x',
    description: 'Plus de clients gérés',
    detail: 'Organisez et suivez efficacement tous vos clients depuis une seule plateforme unifiée',
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-500/20 to-purple-500/10',
  },
  {
    icon: TrendingUp,
    metric: '95%',
    description: 'De satisfaction client',
    detail: 'Vos clients apprécient énormément les programmes ultra-personnalisés et le suivi régulier',
    gradient: 'from-fuchsia-500 to-pink-500',
    bgGradient: 'from-fuchsia-500/20 to-pink-500/10',
  },
  {
    icon: Zap,
    metric: '+50%',
    description: 'De productivité',
    detail: 'Automatisez les tâches répétitives et concentrez-vous sur ce qui compte vraiment',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/20 to-blue-500/10',
  },
];

export function ResultsImpact() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Impact mesurable
          </span>
          <h2
            className="mt-3 mb-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Résultats Concrets & Mesurables
          </h2>
          <p className="text-xl text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Les professionnels qui utilisent ATLETIA voient des <span className="text-violet-400 font-semibold">résultats tangibles</span> dès les premières semaines
          </p>
        </div>

        {/* Results grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <Card
                key={index}
                className="group relative text-center border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${result.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Glow effect */}
                <div className={`absolute -inset-px rounded-lg bg-gradient-to-r ${result.gradient} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500`} />

                <CardHeader className="relative z-10">
                  {/* Icon */}
                  <div className="mx-auto mb-4 inline-flex">
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`relative rounded-xl bg-gradient-to-br ${result.bgGradient} p-3 ring-1 ring-violet-500/20 group-hover:ring-violet-500/40 transition-all`}>
                        <Icon className="h-6 w-6 text-violet-400" />
                      </div>
                    </div>
                  </div>

                  {/* Metric */}
                  <CardTitle
                    className={`text-5xl font-bold bg-gradient-to-r ${result.gradient} bg-clip-text text-transparent`}
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {result.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="mb-2 font-semibold text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {result.description}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {result.detail}
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

