
// src/i18n/config.js
export const defaultLocale = 'en';
export const locales = ['en', 'fr', 'es'];

export const getLocaleFromPathname = (pathname) => {
  const segments = pathname.split('/');
  const possibleLocale = segments[1];
  return locales.includes(possibleLocale) ? possibleLocale : defaultLocale;
};

// Helper to get translations for the current locale
export const getTranslations = async (locale) => {
  try {
    const translations = await import(`./locales/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale ${locale}:`, error);
    // Fallback to default locale
    const defaultTranslations = await import(`./locales/${defaultLocale}.json`);
    return defaultTranslations.default;
  }
};