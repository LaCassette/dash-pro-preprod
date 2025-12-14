'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Users, Star, Zap, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const stats = [
    { icon: Users, value: "100+", label: "Professionnels" },
    { icon: Star, value: "4.8/5", label: "Note moyenne" },
    { icon: Clock, value: "5h+", label: "Économisé/semaine" },
    { icon: Zap, value: "24/7", label: "IA disponible" },
];

export function HeroSectionPro() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 py-20 md:py-28">
            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-violet-500/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/10 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-500/10 to-transparent rounded-full" />
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-400/5 rounded-full blur-2xl animate-pulse-slow" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Logo with glow effect */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-fuchsia-500/20 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60 group-hover:opacity-80" />
                        <div className="relative h-40 w-40 md:h-56 md:w-56 rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-violet-500/20 bg-gradient-to-br from-slate-900 to-blue-900/30 backdrop-blur-sm transform group-hover:scale-105 transition-all duration-500">
                            <Image
                                src="/logo.png"
                                alt="ATLETIA Pro"
                                fill
                                className="object-contain p-6"
                                priority
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        {/* Badge */}
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <Badge className="bg-gradient-to-r from-blue-500/20 via-violet-500/15 to-fuchsia-500/10 text-violet-300 border-violet-500/30 px-4 py-1.5 text-sm font-medium backdrop-blur-sm hover:bg-violet-500/20 transition-colors">
                                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                                Pour Professionnels • 14 jours d&apos;essai gratuit
                            </Badge>
                        </div>

                        {/* Title with animated gradient - Using Playfair Display */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                Révolutionnez
                            </span>
                            <br />
                            <span className="text-white">Votre Pratique Pro</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                            La plateforme <span className="text-violet-400 font-semibold">IA tout-en-un</span> pour les{' '}
                            <span className="text-white font-medium">coachs sportifs</span>,{' '}
                            <span className="text-white font-medium">nutritionnistes</span> et{' '}
                            <span className="text-white font-medium">salles de sport</span>
                        </p>

                        {/* Stats mini row */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/50 border border-violet-500/20 backdrop-blur-sm hover:border-violet-500/40 hover:bg-slate-800/70 transition-all duration-300"
                                >
                                    <stat.icon className="h-4 w-4 text-violet-400" />
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">{stat.value}</div>
                                        <div className="text-xs text-slate-400">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Button
                                asChild
                                size="lg"
                                className="font-semibold shadow-lg bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 hover:from-blue-700 hover:via-violet-700 hover:to-fuchsia-700 border-0 text-white hover:shadow-xl hover:shadow-violet-500/30 transition-all text-lg px-8"
                                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                            >
                                <Link href="/auth/login">
                                    <Sparkles className="h-5 w-5 mr-2" />
                                    Essai Gratuit 14 Jours
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="font-semibold border-slate-700/50 text-slate-300 bg-slate-800/30 hover:bg-slate-800/50 hover:border-violet-500/40 hover:text-white transition-all text-lg px-8"
                                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                            >
                                <Link href="#pricing">
                                    Voir les Tarifs
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Link>
                            </Button>
                        </div>

                        {/* B2C link */}
                        <div className="pt-4">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors"
                                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                            >
                                Vous êtes un particulier ? Téléchargez l&apos;app gratuitement
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
