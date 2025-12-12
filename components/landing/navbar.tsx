'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Fonctionnalités' },
    { href: '#pricing', label: 'Tarifs' },
    { href: '#faq', label: 'FAQ' },
  ];

  // Déterminer le thème actuel (theme peut être 'system', donc on utilise systemTheme)
  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light';
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => {
    if (theme === 'system') {
      // Si le thème est 'system', on passe directement à 'dark' ou 'light' selon le système
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-lg'
          : 'bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/30 to-primary/20 opacity-0 transition-opacity group-hover:opacity-100 blur-md" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-lg ring-2 ring-primary/20">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-2xl font-bold text-transparent">
                  Atletia
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative rounded-lg px-5 py-2.5 text-sm font-semibold transition-all',
                  'text-muted-foreground hover:text-foreground',
                  'hover:bg-muted/60',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                )}
              >
                {link.label}
                <span className="absolute inset-x-5 bottom-1 h-0.5 origin-center scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className={cn(
                  'ml-4 flex h-9 w-9 items-center justify-center rounded-lg transition-all',
                  'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  'border border-border'
                )}
                aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-foreground" />
                ) : (
                  <Moon className="h-4 w-4 text-foreground" />
                )}
              </button>
            )}

            <div className="ml-2 flex items-center gap-2 border-l pl-4">
              <Button asChild variant="ghost" size="sm" className="font-semibold">
                <Link href="/auth/login">Se connecter</Link>
              </Button>
              <Button asChild size="sm" className="font-semibold shadow-lg">
                <Link href="/auth/login">Essai gratuit</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-all',
                  'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  'border border-border'
                )}
                aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground" />
                )}
              </button>
            )}
            <button
              className={cn(
                'relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative h-5 w-5">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-0.5 w-5 origin-center rounded-full bg-foreground transition-all duration-300',
                    mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-2 h-0.5 w-5 rounded-full bg-foreground transition-all duration-300',
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-4 h-0.5 w-5 origin-center rounded-full bg-foreground transition-all duration-300',
                    mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="border-t py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-4 py-3 text-base font-semibold transition-colors',
                    'text-muted-foreground hover:bg-muted hover:text-foreground',
                    'active:bg-muted active:text-foreground'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t pt-4">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start font-semibold"
                >
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    Se connecter
                  </Link>
                </Button>
                <Button asChild className="w-full font-semibold shadow-lg">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    Essai gratuit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
