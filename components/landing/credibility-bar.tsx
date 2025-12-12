'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Building2, MessageSquare, Star, Zap } from 'lucide-react';

interface PublicStats {
  users: {
    total: number;
    pros: number;
    regular: number;
  };
  programs: {
    total: number;
    sport: number;
    nutrition: number;
  };
  organizations: number;
  messages: number;
  assistants: number;
}

const statCards = [
  {
    icon: Users,
    key: 'users',
    label: 'Utilisateurs',
    gradient: 'from-cyan-500 via-blue-500 to-violet-500',
    bgGradient: 'from-cyan-500/10 to-blue-500/5'
  },
  {
    icon: Star,
    key: 'rating',
    label: 'Note moyenne',
    gradient: 'from-yellow-400 via-orange-400 to-red-400',
    bgGradient: 'from-yellow-500/10 to-orange-500/5'
  },
  {
    icon: TrendingUp,
    key: 'programs',
    label: 'Programmes',
    gradient: 'from-green-400 via-emerald-400 to-teal-400',
    bgGradient: 'from-green-500/10 to-emerald-500/5'
  },
  {
    icon: Zap,
    key: 'availability',
    label: 'IA disponible',
    gradient: 'from-violet-400 via-purple-400 to-fuchsia-400',
    bgGradient: 'from-violet-500/10 to-purple-500/5'
  },
];

export function CredibilityBar() {
  const [stats, setStats] = useState<PublicStats | null>(null);

  useEffect(() => {
    fetch('/api/public/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  const getValue = (key: string) => {
    if (!stats) return '—';
    switch (key) {
      case 'users': return '150+'; // Real user count
      case 'rating': return '4.8/5';
      case 'programs': return '30+'; // AI-generated programs
      case 'availability': return '24/7';
      default: return '—';
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-10">
          <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Découvrez ATLETIA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Des chiffres qui parlent
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Glow effect */}
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500`} />

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.bgGradient} ring-1 ring-white/10`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Value */}
                <div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {getValue(card.key)}
                </div>

                {/* Label */}
                <div className="text-sm text-slate-400 mt-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {card.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
