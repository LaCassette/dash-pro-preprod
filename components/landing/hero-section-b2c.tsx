'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Star, Download, Smartphone, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const stats = [
    { icon: Users, value: "300+", label: "Athlètes actifs" },
    { icon: Star, value: "4.8/5", label: "Note moyenne" },
    { icon: Download, value: "100%", label: "Gratuit" },
    { icon: Smartphone, value: "24/7", label: "Accessible" },
];

export function HeroSectionB2C() {
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
                                alt="ATLETIA"
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
                            <Badge className="bg-gradient-to-r from-green-500/20 via-emerald-500/15 to-teal-500/10 text-emerald-300 border-emerald-500/30 px-4 py-1.5 text-sm font-medium backdrop-blur-sm hover:bg-emerald-500/20 transition-colors">
                                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                                100% Gratuit • Télécharge maintenant
                            </Badge>
                        </div>

                        {/* Title with animated gradient */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                Ton Coach IA Personnel.
                            </span>
                            <br />
                            <span className="text-white">Gratuit. Dans Ta Poche.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                            Des <span className="text-violet-400 font-semibold">programmes sportifs et nutritionnels</span> ultra-personnalisés, créés par une IA qui te comprend.
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

                        {/* Download buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            {/* Android - Coming soon */}
                            <div className="relative inline-block cursor-not-allowed">
                                <div className="relative flex items-center gap-2 bg-slate-800/80 border border-slate-600/50 rounded-lg px-4 py-2.5 opacity-70">
                                    <Image
                                        src="/download/get-in-on-google-play.png"
                                        alt="Google Play"
                                        width={130}
                                        height={39}
                                        className="h-auto rounded opacity-50 grayscale"
                                    />
                                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                                        Arrive bientôt
                                    </span>
                                </div>
                            </div>
                            <a
                                href="https://testflight.apple.com/join/3HnFCND3"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-block transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Image
                                    src="/download/download-on-the-app-store.png"
                                    alt="Télécharger sur l'App Store"
                                    width={180}
                                    height={54}
                                    className="h-auto rounded-lg relative"
                                />
                            </a>
                        </div>

                        {/* Pro link */}
                        <div className="pt-4">
                            <a
                                href="/pro"
                                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors"
                                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                            >
                                Tu es coach ou professionnel du sport ?
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
