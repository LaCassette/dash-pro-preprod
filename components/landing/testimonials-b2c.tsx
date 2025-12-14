'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Alex D.',
        role: 'Passionné de fitness',
        context: 'Utilise ATLETIA depuis 3 mois',
        image: null,
        rating: 5,
        text: 'Cette IA comprend vraiment mes besoins ! Les programmes sont parfaitement adaptés à mon emploi du temps et mes objectifs. J\'ai enfin une routine qui me correspond.',
    },
    {
        name: 'Marie L.',
        role: 'Débutante en sport',
        context: 'A perdu 8kg en 4 mois',
        image: null,
        rating: 5,
        text: 'Plus jamais de routine ennuyeuse ! Les exercices évoluent avec moi et je ne m\'ennuie jamais. Le suivi nutritionnel est top aussi.',
    },
    {
        name: 'Thomas R.',
        role: 'Sportif régulier',
        context: 'Utilisateur depuis le lancement',
        image: null,
        rating: 5,
        text: 'Les défis me poussent vraiment à me dépasser ! J\'adore le système de badges et les statistiques de progression. Une vraie motivation quotidienne.',
    },
    {
        name: 'Emma K.',
        role: 'Running & Yoga',
        context: 'Entraînement 4x/semaine',
        image: null,
        rating: 5,
        text: 'Mon profil s\'améliore à chaque session ! L\'app apprend vraiment mes préférences et me propose des séances de plus en plus pertinentes.',
    },
];

export function TestimonialsB2C() {
    return (
        <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-20 md:py-28 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Témoignages
                    </span>
                    <h2
                        className="mt-3 mb-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                        Ils Ont Transformé Leur Quotidien
                    </h2>
                    <p className="text-xl text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Rejoins une communauté d&apos;athlètes qui <span className="text-violet-400 font-semibold">se dépassent</span> chaque jour
                    </p>
                </div>

                {/* Testimonials grid */}
                <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="group relative border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10"
                        >
                            {/* Gradient background on hover */}
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Glow effect */}
                            <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />

                            <CardContent className="p-6 relative z-10">
                                {/* Quote icon */}
                                <div className="mb-4">
                                    <Quote className="h-8 w-8 text-violet-400/30" />
                                </div>

                                {/* Rating */}
                                <div className="mb-4 flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Testimonial text */}
                                <p
                                    className="mb-6 text-slate-300 italic leading-relaxed text-lg"
                                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                                >
                                    &quot;{testimonial.text}&quot;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                                    <Avatar className="ring-2 ring-violet-500/20">
                                        <AvatarImage src={testimonial.image || undefined} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-fuchsia-500/20 text-violet-400">
                                            {testimonial.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                            {testimonial.role} • {testimonial.context}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
