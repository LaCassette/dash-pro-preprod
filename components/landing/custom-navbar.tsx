'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  FileText,
  Shield,
  Scale,
  Sparkles,
  Gavel,
  Book
} from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface CustomNavbarProps {
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const CustomNavbar = ({
  logo = {
    url: '/',
    title: 'ATLETIA',
  },
  menu = [
    { title: 'Fonctionnalités', url: '#features' },
    { title: 'Tarifs', url: '#pricing' },
    { title: 'FAQ', url: '#faq' },
    {
      title: 'Légal',
      url: '#',
      items: [
        {
          title: 'CGU',
          description: 'Conditions Générales d\'Utilisation',
          icon: <FileText className="size-5 shrink-0" />,
          url: '/legal/terms',
        },
        {
          title: 'CGV',
          description: 'Conditions Générales de Vente',
          icon: <Scale className="size-5 shrink-0" />,
          url: '/legal/cgv',
        },
        {
          title: 'Résiliation',
          description: 'Conditions de résiliation',
          icon: <Gavel className="size-5 shrink-0" />,
          url: '/legal/termination',
        },
        {
          title: 'Confidentialité',
          description: 'Politique de confidentialité et protection des données',
          icon: <Shield className="size-5 shrink-0" />,
          url: '/legal/privacy',
        },
        {
          title: 'Mentions légales',
          description: 'Informations légales et éditeur du site',
          icon: <Book className="size-5 shrink-0" />,
          url: '/legal/mentions',
        },
      ],
    },
  ],
  mobileExtraLinks = [],
  auth = {
    login: { text: 'Se connecter', url: '/auth/login' },
    signup: { text: 'Essai gratuit', url: '/auth/login' },
  },
}: CustomNavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-slate-800/50 shadow-lg shadow-violet-500/5'
          : 'bg-slate-950/80 backdrop-blur-sm border-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between py-4 lg:flex">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              href={logo.url}
              className="group flex items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-500/30 to-blue-500/20 opacity-0 transition-opacity group-hover:opacity-100 blur-md" />
                <div className="relative flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900/30 ring-2 ring-violet-500/20 group-hover:ring-violet-500/40 transition-all">
                    <Image
                      src="/logo.png"
                      alt="ATLETIA"
                      fill
                      className="object-contain p-1.5"
                      priority
                    />
                  </div>
                  <span
                    className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {logo.title}
                  </span>
                </div>
              </div>
            </Link>

            {/* Navigation Menu */}
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-semibold border-slate-700/50 text-slate-300 bg-slate-800/30 hover:bg-slate-800/50 hover:border-violet-500/40 hover:text-white transition-all"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              <Link href={auth.login.url}>{auth.login.text}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="font-semibold shadow-lg bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 hover:from-blue-700 hover:via-violet-700 hover:to-fuchsia-700 border-0 text-white hover:shadow-xl hover:shadow-violet-500/30 transition-all"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              <Link href={auth.signup.url}>
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                {auth.signup.text}
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between py-4">
            {/* Logo Mobile */}
            <Link
              href={logo.url}
              className="group flex items-center gap-2.5 transition-transform hover:scale-105"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500/30 to-blue-500/20 opacity-0 transition-opacity group-hover:opacity-100 blur-md" />
                <div className="relative flex items-center gap-2.5">
                  <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900/30 ring-2 ring-violet-500/20">
                    <Image
                      src="/logo.png"
                      alt="ATLETIA"
                      fill
                      className="object-contain p-1.5"
                      priority
                    />
                  </div>
                  <span
                    className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {logo.title}
                  </span>
                </div>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-violet-500/40"
                >
                  <Menu className="h-5 w-5 text-slate-300" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto w-full sm:max-w-md bg-slate-900/95 backdrop-blur-md border-slate-800/50">
                <SheetHeader className="pb-6">
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2.5">
                      <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900/30 ring-2 ring-violet-500/20">
                        <Image
                          src="/logo.png"
                          alt="ATLETIA"
                          fill
                          className="object-contain p-1.5"
                        />
                      </div>
                      <span
                        className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                      >
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 pb-6">
                  {/* Mobile Navigation */}
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-2"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col gap-3 border-t border-slate-800/50 pt-6">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-slate-700/50 text-slate-300 bg-slate-800/30 hover:bg-slate-800/50 hover:border-violet-500/40 hover:text-white"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      <Link href={auth.login.url}>{auth.login.text}</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 hover:from-blue-700 hover:via-violet-700 hover:to-fuchsia-700 border-0 text-white shadow-lg"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      <Link href={auth.signup.url}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        {auth.signup.text}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className="text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/50 data-[state=open]:bg-slate-800/50 transition-all"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-slate-900/95 backdrop-blur-md border border-slate-800/50">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <Link
                    className="flex select-none gap-4 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-slate-800/50 group"
                    href={subItem.url}
                  >
                    <div className="text-violet-400 group-hover:text-violet-300 transition-colors">{subItem.icon}</div>
                    <div>
                      <div
                        className="text-sm font-semibold text-white mb-1"
                        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                      >
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p
                          className="text-sm leading-snug text-slate-400"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                        >
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800/50 hover:text-white"
        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        asChild
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b border-slate-800/50">
        <AccordionTrigger
          className="py-3 font-semibold text-white hover:no-underline hover:text-violet-400 transition-colors"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-4 rounded-lg p-3 leading-none outline-none transition-all hover:bg-slate-800/50 group"
              href={subItem.url}
            >
              <div className="text-violet-400 group-hover:text-violet-300 transition-colors">{subItem.icon}</div>
              <div>
                <div
                  className="text-sm font-semibold text-white mb-1"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {subItem.title}
                </div>
                {subItem.description && (
                  <p
                    className="text-sm leading-snug text-slate-400"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="font-semibold text-white hover:text-violet-400 transition-colors py-3"
      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
    >
      {item.title}
    </Link>
  );
};

export { CustomNavbar };
