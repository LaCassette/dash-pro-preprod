'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Gift } from 'lucide-react';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Intégrer avec votre service d'email
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Card className="group relative mx-auto max-w-2xl border-violet-500/30 bg-slate-800/50 backdrop-blur-sm">
          {/* Gradient background */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-fuchsia-500/5" />

          {/* Glow effect */}
          <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 opacity-20 blur-lg" />

          <CardHeader className="text-center relative z-10">
            <div className="mx-auto mb-4 inline-flex">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl" />
                <div className="relative rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 p-3 ring-1 ring-violet-500/30">
                  <Gift className="h-6 w-6 text-violet-400" />
                </div>
              </div>
            </div>
            <CardTitle
              className="text-3xl md:text-4xl text-white"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Recevez Nos Conseils & Actualités
            </CardTitle>
            <CardDescription className="text-lg text-slate-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Inscrivez-vous à notre newsletter et recevez des <span className="text-violet-400 font-semibold">conseils exclusifs</span> pour développer votre activité
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Votre email professionnel"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 hover:from-blue-700 hover:via-violet-700 hover:to-fuchsia-700 border-0 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
              >
                <Mail className="mr-2 h-4 w-4" />
                {submitted ? 'Inscrit !' : "S'inscrire"}
              </Button>
            </form>
            {submitted && (
              <p className="mt-4 text-center text-sm text-green-400 font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                ✨ Merci ! Vous recevrez bientôt nos actualités et conseils exclusifs.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

