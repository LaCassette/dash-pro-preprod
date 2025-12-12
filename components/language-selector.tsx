'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { setLocale } from '@/lib/locale-actions';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n-config';

export function LanguageSelector() {
    const locale = useLocale() as Locale;
    const [isPending, startTransition] = useTransition();

    const handleLocaleChange = (newLocale: Locale) => {
        startTransition(async () => {
            await setLocale(newLocale);
            // Refresh the page to apply new locale
            window.location.reload();
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isPending}>
                    <Globe className="h-4 w-4 mr-2" />
                    <span className="mr-1">{localeFlags[locale]}</span>
                    <span className="hidden sm:inline">{localeNames[locale]}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {locales.map((loc) => (
                    <DropdownMenuItem
                        key={loc}
                        onClick={() => handleLocaleChange(loc)}
                        className={locale === loc ? 'bg-accent' : ''}
                    >
                        <span className="mr-2">{localeFlags[loc]}</span>
                        {localeNames[loc]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
