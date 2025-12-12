'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CaseStudy() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl">
          <Card className="group relative border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-500">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow effect */}
            <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-500" />

            <CardHeader className="relative z-10">
              <CardTitle
                className="text-3xl md:text-4xl text-white"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Étude de Cas : Fit & Co
              </CardTitle>
              <CardDescription className="text-lg text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Comment une salle de sport a <span className="text-violet-400 font-semibold">multiplié sa productivité par 3</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              {/* Challenge */}
              <div>
                <h3 className="mb-2 text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Le Défi
                </h3>
                <p className="text-slate-300 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Fit & Co, une salle de sport avec <span className="text-white font-semibold">6 coachs</span>, gérait plus de <span className="text-white font-semibold">150 clients</span>. La création
                  manuelle de programmes prenait <span className="text-red-400 font-semibold">2 heures par client</span>, soit 300 heures par mois. La
                  communication avec les clients était dispersée et le suivi très difficile.
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="mb-2 text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  La Solution
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Fit & Co a adopté <span className="text-violet-400 font-semibold">ATLETIA</span> pour toute son équipe. Les résultats ont été immédiats :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Création de programmes réduite de <span className="text-red-400 line-through">2h</span> à <span className="text-green-400 font-semibold">5 minutes</span> par client
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Gestion centralisée de tous les clients et programmes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Communication unifiée via la messagerie intégrée sécurisée
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Assistants IA pour répondre aux questions fréquentes 24/7
                    </span>
                  </li>
                </ul>
              </div>

              {/* Results */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Les Résultats
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="group relative rounded-xl bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-transparent p-5 ring-1 ring-violet-500/20 hover:ring-violet-500/40 transition-all">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
                    <div className="relative">
                      <div
                        className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                      >
                        14h
                      </div>
                      <div className="text-sm text-slate-400 mt-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        économisées par programme
                        <div className="text-xs text-slate-500 mt-0.5">(28 min × 30 programmes)</div>
                      </div>
                    </div>
                  </div>
                  <div className="group relative rounded-xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-transparent p-5 ring-1 ring-violet-500/20 hover:ring-violet-500/40 transition-all">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
                    <div className="relative">
                      <div
                        className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                      >
                        3x
                      </div>
                      <div className="text-sm text-slate-400 mt-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        plus de clients gérés
                      </div>
                    </div>
                  </div>
                  <div className="group relative rounded-xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-transparent p-5 ring-1 ring-green-500/20 hover:ring-green-500/40 transition-all">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
                    <div className="relative">
                      <div
                        className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                      >
                        98%
                      </div>
                      <div className="text-sm text-slate-400 mt-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        de satisfaction client
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 hover:from-blue-700 hover:via-violet-700 hover:to-fuchsia-700 border-0 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
                >
                  <Link href="/auth/login">
                    Rejoindre Fit & Co
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

