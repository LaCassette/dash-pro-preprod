'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Download } from 'lucide-react';
import Image from 'next/image';

const features = [
    'Programmes sportifs personnalisés illimités',
    'Programmes nutritionnels adaptés',
    'Suivi de progression complet',
    'Notifications intelligentes',
    'Défis et badges à débloquer',
    'Chat avec IA assistant',
    'Connexion avec ton coach (optionnel)',
    'Pas de publicités intrusives',
];

export function PricingB2C() {
    return (
        <section id="pricing" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <span className="text-emerald-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Tarification
                    </span>
                    <h2
                        className="mt-3 mb-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                        100% Gratuit. Sérieusement.
                    </h2>
                    <p className="text-xl text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Pas d&apos;abonnement caché. Pas de version &quot;premium&quot; obligatoire.
                        <br />
                        <span className="text-emerald-400 font-semibold">Toutes les fonctionnalités. Gratuitement.</span>
                    </p>
                </div>

                {/* Pricing card */}
                <div className="max-w-xl mx-auto">
                    <Card className="group relative border-2 border-emerald-500/50 bg-slate-800/70 backdrop-blur-sm shadow-2xl shadow-emerald-500/20">
                        {/* Glow effect */}
                        <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-20 blur-lg" />

                        {/* Popular badge */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                            <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                                <Sparkles className="h-3.5 w-3.5" />
                                Entièrement Gratuit
                            </div>
                        </div>

                        <CardHeader className="relative z-10 pt-8">
                            <CardTitle
                                className="text-3xl text-white text-center"
                                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                            >
                                ATLETIA
                            </CardTitle>
                            <CardDescription className="text-slate-400 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                Ton coach IA personnel, toujours dans ta poche
                            </CardDescription>
                            <div className="mt-6 text-center">
                                <span
                                    className="text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                                >
                                    0€
                                </span>
                                <span className="text-slate-400 ml-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                    pour toujours
                                </span>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6 relative z-10">
                            <ul className="space-y-3">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <Check className="mt-0.5 h-5 w-5 text-emerald-400 flex-shrink-0" />
                                        <span className="text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Download buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <a
                                    href="https://expo.dev/accounts/lacassette/projects/atletia/builds/b386b67c-3d71-4e86-913d-39a61a54b29e"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn relative inline-block transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/10 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                    <Image
                                        src="/download/get-in-on-google-play.png"
                                        alt="Télécharger sur Google Play"
                                        width={160}
                                        height={48}
                                        className="h-auto rounded-lg relative"
                                    />
                                </a>
                                <a
                                    href="https://testflight.apple.com/join/3HnFCND3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn relative inline-block transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/10 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                    <Image
                                        src="/download/download-on-the-app-store.png"
                                        alt="Télécharger sur l'App Store"
                                        width={160}
                                        height={48}
                                        className="h-auto rounded-lg relative"
                                    />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom text */}
                <div className="mt-12 text-center">
                    <p className="text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <strong className="text-white">Tu es coach ou professionnel ?</strong>{' '}
                        <a href="/pro" className="text-violet-400 hover:text-violet-300 underline transition-colors">
                            Découvre notre offre Pro →
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
