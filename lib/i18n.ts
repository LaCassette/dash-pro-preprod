import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { locales, defaultLocale, type Locale } from './i18n-config';

export default getRequestConfig(async () => {
    // Get locale from cookie, fallback to default
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE');
    const locale = (localeCookie?.value as Locale) || defaultLocale;

    // Validate locale
    const validLocale = locales.includes(locale as Locale) ? locale : defaultLocale;

    return {
        locale: validLocale,
        messages: (await import(`../messages/${validLocale}.json`)).default,
    };
});
