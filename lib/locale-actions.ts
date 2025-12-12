'use server';

import { cookies } from 'next/headers';
import { Locale, locales, defaultLocale } from './i18n-config';

export async function setLocale(locale: Locale) {
    if (!locales.includes(locale)) {
        throw new Error(`Invalid locale: ${locale}`);
    }

    const cookieStore = await cookies();
    cookieStore.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 365 * 24 * 60 * 60, // 1 year
        sameSite: 'lax',
    });
}

export async function getLocale(): Promise<Locale> {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE');
    const locale = localeCookie?.value as Locale;

    return locales.includes(locale) ? locale : defaultLocale;
}
