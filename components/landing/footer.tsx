'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800/50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & description */}
          <div className="md:col-span-1">
            <div className="relative h-12 w-32 mb-4">
              <Image
                src="/logo.png"
                alt="ATLETIA"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              L'application IA pour le sport et la nutrition personnalisée.
            </p>
          </div>

          {/* Légal */}
          <div>
            <h3 className="mb-4 font-semibold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Légal</h3>
            <ul className="space-y-2 text-sm text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <li>
                <Link href="/legal/terms" className="hover:text-violet-400 transition-colors">
                  Conditions Générales d'Utilisation (CGU)
                </Link>
              </li>
              <li>
                <Link href="/legal/cgv" className="hover:text-violet-400 transition-colors">
                  Conditions Générales de Vente (CGV)
                </Link>
              </li>
              <li>
                <Link href="/legal/termination" className="hover:text-violet-400 transition-colors">
                  Conditions de Résiliation
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-violet-400 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/mentions" className="hover:text-violet-400 transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA et réseaux */}
          <div>
            <h3 className="mb-4 font-semibold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Rejoignez-nous</h3>
            <Button asChild className="mb-4 w-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 hover:from-blue-700 hover:via-violet-700 hover:to-fuchsia-700 border-0">
              <Link href="/auth/login">
                Essai gratuit 14 jours
              </Link>
            </Button>
            <div className="flex gap-3">
              <Link
                href="https://instagram.com/atletia.fit"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700/50 p-2.5 bg-slate-800/50 hover:bg-violet-500/20 hover:border-violet-500/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-slate-400 hover:text-violet-400" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/atletia-votre-allié-bien-être-et-santé-939503387/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700/50 p-2.5 bg-slate-800/50 hover:bg-violet-500/20 hover:border-violet-500/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-slate-400 hover:text-violet-400" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <li>
                <a
                  href="mailto:beta@atletia.fit"
                  className="flex items-center gap-2 hover:text-violet-400 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  beta@atletia.fit
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              © {currentYear} Atletia. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <Link href="/legal/terms" className="hover:text-violet-400 transition-colors">
                CGU
              </Link>
              <Link href="/legal/cgv" className="hover:text-violet-400 transition-colors">
                CGV
              </Link>
              <Link href="/legal/termination" className="hover:text-violet-400 transition-colors">
                Résiliation
              </Link>
              <Link href="/legal/privacy" className="hover:text-violet-400 transition-colors">
                Confidentialité
              </Link>
              <Link href="/legal/mentions" className="hover:text-violet-400 transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
