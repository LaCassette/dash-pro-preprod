'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, Users, Building2 } from 'lucide-react';
import Link from 'next/link';

const useCases = [
  {
    icon: UserCheck,
    title: 'Coach Sportif Indépendant',
    context: 'Vous êtes coach personnel et gérez plusieurs clients en même temps.',
    problem: 'Vous passez trop de temps à créer des programmes manuellement et à suivre les progrès de vos clients.',
    solution: 'Avec ATLETIA, générez des programmes personnalisés en 2 minutes, suivez les progrès en temps réel et communiquez facilement avec vos clients via la messagerie intégrée.',
    cta: 'Essayer pour mon activité',
    gradient: 'from-blue-500/20 via-violet-500/15 to-fuchsia-500/10',
  },
  {
    icon: Users,
    title: 'Nutritionniste',
    context: 'Vous accompagnez vos clients dans leur parcours nutritionnel.',
    problem: 'La création de plans alimentaires prend des heures et le suivi est complexe.',
    solution: 'Créez des programmes nutritionnels ultra-personnalisés basés sur les profils de vos clients, suivez leur évolution et ajustez en temps réel grâce à l\'IA.',
    cta: 'Tester pour ma pratique',
    gradient: 'from-violet-500/20 via-purple-500/15 to-fuchsia-500/10',
  },
  {
    icon: Building2,
    title: 'Salle de Sport / Organisation',
    context: 'Vous gérez une équipe de coachs et de nombreux clients.',
    problem: 'Coordination difficile entre les coachs, suivi des clients dispersé, communication complexe.',
    solution: 'Organisez votre équipe, partagez les programmes, suivez tous vos clients depuis une plateforme centralisée avec gestion des organisations.',
    cta: 'Découvrir pour mon organisation',
    gradient: 'from-fuchsia-500/20 via-pink-500/15 to-rose-500/10',
  },
];

export function UseCases() {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Cas d'usage
          </span>
          <h2
            className="mt-3 mb-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Pour Qui Est Fait ATLETIA ?
          </h2>
          <p className="text-xl text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Que vous soyez <span className="text-violet-400 font-semibold">indépendant</span> ou que vous dirigiez une <span className="text-violet-400 font-semibold">équipe</span>, ATLETIA s'adapte à vos besoins
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card
                key={index}
                className="group relative flex flex-col border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Glow effect */}
                <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />

                <CardHeader className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 inline-flex">
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`relative rounded-xl bg-gradient-to-br ${useCase.gradient} p-3 ring-1 ring-violet-500/20 group-hover:ring-violet-500/40 transition-all`}>
                        <Icon className="h-6 w-6 text-violet-400" />
                      </div>
                    </div>
                  </div>
                  <CardTitle
                    className="text-2xl text-white"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {useCase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4 relative z-10">
                  {/* Context */}
                  <div>
                    <p className="mb-2 font-semibold text-xs uppercase tracking-wider text-violet-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Contexte
                    </p>
                    <p className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {useCase.context}
                    </p>
                  </div>

                  {/* Problem */}
                  <div>
                    <p className="mb-2 font-semibold text-xs uppercase tracking-wider text-red-400/80" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Problème
                    </p>
                    <p className="text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {useCase.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <p className="mb-2 font-semibold text-xs uppercase tracking-wider text-green-400/80" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Solution
                    </p>
                    <p className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {useCase.solution}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-slate-600 bg-slate-800/50 text-white hover:bg-violet-500/20 hover:border-violet-500/40 hover:text-white transition-all"
                    >
                      <Link href="/auth/login">{useCase.cta}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

