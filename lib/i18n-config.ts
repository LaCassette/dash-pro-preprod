// Shared i18n constants - can be imported in both client and server
export const locales = [
    'fr', 'en', 'it', 'es', 'ja', // Current languages
    'fi', // Finnish (requested)
    // 20 most spoken languages
    'zh', 'hi', 'ar', 'bn', 'pt', 'ru', 'de', 'ko', 'vi', 'tr',
    'pl', 'th', 'uk', 'nl', 'id', 'sv', 'el', 'cs', 'ro', 'hu'
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
    fr: 'Français',
    en: 'English',
    it: 'Italiano',
    es: 'Español',
    ja: '日本語',
    fi: 'Suomi',
    zh: '中文',
    hi: 'हिन्दी',
    ar: 'العربية',
    bn: 'বাংলা',
    pt: 'Português',
    ru: 'Русский',
    de: 'Deutsch',
    ko: '한국어',
    vi: 'Tiếng Việt',
    tr: 'Türkçe',
    pl: 'Polski',
    th: 'ไทย',
    uk: 'Українська',
    nl: 'Nederlands',
    id: 'Bahasa Indonesia',
    sv: 'Svenska',
    el: 'Ελληνικά',
    cs: 'Čeština',
    ro: 'Română',
    hu: 'Magyar',
};

export const localeFlags: Record<Locale, string> = {
    fr: '🇫🇷',
    en: '🇬🇧',
    it: '🇮🇹',
    es: '🇪🇸',
    ja: '🇯🇵',
    fi: '🇫🇮',
    zh: '🇨🇳',
    hi: '🇮🇳',
    ar: '🇸🇦',
    bn: '🇧🇩',
    pt: '🇧🇷',
    ru: '🇷🇺',
    de: '🇩🇪',
    ko: '🇰🇷',
    vi: '🇻🇳',
    tr: '🇹🇷',
    pl: '🇵🇱',
    th: '🇹🇭',
    uk: '🇺🇦',
    nl: '🇳🇱',
    id: '🇮🇩',
    sv: '🇸🇪',
    el: '🇬🇷',
    cs: '🇨🇿',
    ro: '🇷🇴',
    hu: '🇭🇺',
};
