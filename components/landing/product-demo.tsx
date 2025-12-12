'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function ProductDemo() {
  return (
    <section id="demo" className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div>
              <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Découvrez la puissance d'ATLETIA
              </span>
              <h2
                className="mt-3 mb-4 text-4xl md:text-5xl font-bold tracking-tight text-white"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Voyez ATLETIA en Action
              </h2>
              <p className="mb-6 text-xl text-slate-300 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Découvrez comment ATLETIA <span className="text-violet-400 font-semibold">révolutionne</span> votre façon de travailler.
                Notre plateforme intuitive vous permet de créer des programmes <span className="text-white font-medium">ultra-personnalisés</span> en quelques clics.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                  <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="text-white font-semibold">Génération IA instantanée</span> - Programmes créés en moins de 2 minutes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                  <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="text-white font-semibold">Interface premium</span> - Design moderne et expérience utilisateur exceptionnelle
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500" />
                  <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="text-white font-semibold">Gestion centralisée</span> - Tous vos clients au même endroit
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="text-white font-semibold">Communication sécurisée</span> - Messagerie intégrée avec chiffrement end-to-end
                  </span>
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 hover:from-blue-700 hover:via-violet-700 hover:to-fuchsia-700 border-0 text-white font-semibold shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all"
              >
                <Link href="/auth/login">
                  <Calendar className="mr-2 h-4 w-4" />
                  Prendre rendez-vous pour une démo
                </Link>
              </Button>
            </div>

            {/* Demo visual */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative aspect-video w-full rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm shadow-2xl overflow-hidden ring-1 ring-violet-500/10">
                {/* Dashboard screenshot or video placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl" />
                        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-500/30">
                          <Play className="h-10 w-10 text-violet-400 ml-1" />
                        </div>
                      </div>
                      <span className="text-lg text-slate-300 font-medium mb-2" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                        Vidéo démo du produit
                      </span>
                      <span className="text-sm text-slate-500" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Disponible prochainement
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

