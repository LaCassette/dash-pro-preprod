'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
    Brain,
    Target,
    Bell,
    Trophy,
    User,
    BarChart3,
    LucideIcon
} from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    emoji: string;
    title: string;
    description: string;
    details: string;
    features: string[];
    gradient: string;
}

const features: Feature[] = [
    {
        icon: Brain,
        emoji: "🧠",
        title: "IA Personnalisée",
        description: "Ton coach sur-mesure",
        details: "L'IA analyse tes habitudes, objectifs et contraintes pour créer un plan 100% adapté à toi.",
        features: ["Plan sur-mesure", "Adaptation continue", "Optimisation IA"],
        gradient: "from-blue-500/20 to-violet-500/20",
    },
    {
        icon: Target,
        emoji: "🎯",
        title: "Exercices Évolutifs",
        description: "Jamais de routine monotone",
        details: "Tes entraînements s'adaptent automatiquement à tes progrès et tes préférences.",
        features: ["Variété infinie", "Progression intelligente", "Vidéos guidées"],
        gradient: "from-violet-500/20 to-fuchsia-500/20",
    },
    {
        icon: Bell,
        emoji: "🔔",
        title: "Notifications Intelligentes",
        description: "Motivation au bon moment",
        details: "Reçois des rappels personnalisés, des encouragements et des conseils précis.",
        features: ["Timing parfait", "Messages personnalisés", "Boost motivation"],
        gradient: "from-fuchsia-500/20 to-pink-500/20",
    },
    {
        icon: Trophy,
        emoji: "🏆",
        title: "Défis & Récompenses",
        description: "Gamification intelligente",
        details: "Participe à des défis uniques, gagne des badges et reste motivé(e) chaque jour.",
        features: ["Badges à débloquer", "Défis quotidiens", "Classements"],
        gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
        icon: User,
        emoji: "⚡",
        title: "Profil Intelligent",
        description: "Évolution continue",
        details: "Ton profil grandit avec toi : chaque session enrichit tes données pour des recommandations parfaites.",
        features: ["Apprentissage continu", "Recommandations précises", "Historique complet"],
        gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
        icon: BarChart3,
        emoji: "📊",
        title: "Suivi de Progrès",
        description: "Visualise tes succès",
        details: "Graphiques interactifs, statistiques détaillées pour voir tes progrès en temps réel.",
        features: ["Graphiques visuels", "Stats détaillées", "Motivation long terme"],
        gradient: "from-violet-500/20 to-blue-500/20",
    },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
    const Icon = feature.icon;

    return (
        <Card
            className={cn(
                "group relative h-full overflow-hidden transition-all duration-500",
                "hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-2",
                "border-slate-700/50 hover:border-violet-500/30 bg-slate-800/50 backdrop-blur-sm"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Background gradient on hover */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                feature.gradient
            )} />

            <CardHeader className="relative z-10">
                <div className="flex items-start gap-4">
                    {/* Icon with glow */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-violet-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative rounded-xl bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-fuchsia-500/10 p-3 ring-1 ring-violet-500/20 group-hover:ring-violet-500/40 transition-all">
                            <Icon className="h-6 w-6 text-violet-400" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <CardTitle className="text-lg mb-1 flex items-center gap-2 text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                            <span>{feature.emoji}</span>
                            <span>{feature.title}</span>
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-400">{feature.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
                {/* Description */}
                <p className="text-slate-300 text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {feature.details}
                </p>

                {/* Features list */}
                <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                            {item}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export function FeaturesSectionB2C() {
    return (
        <section id="fonctionnalites" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div className="text-center mb-12">
                    <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Tout ce dont tu as besoin
                    </span>
                    <h2
                        className="text-3xl md:text-4xl font-bold mt-3 mb-4 bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                        Fonctionnalités Qui Changent Tout
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Découvre comment ATLETIA transforme ton approche du sport et de la nutrition 🚀
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} feature={feature} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
