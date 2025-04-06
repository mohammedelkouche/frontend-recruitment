// src/i18n/I18nProvider.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocaleFromPathname, getTranslations, defaultLocale, locales } from './config';

// Create context
const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [translations, setTranslations] = useState({});
  const [locale, setLocale] = useState(defaultLocale);
  const [isLoading, setIsLoading] = useState(true);

  // Get current locale from path
  useEffect(() => {
    const detectedLocale = getLocaleFromPathname(pathname);
    setLocale(detectedLocale);
    
    // Load translations
    const loadTranslations = async () => {
      setIsLoading(true);
      const loadedTranslations = await getTranslations(detectedLocale);
      setTranslations(loadedTranslations);
      setIsLoading(false);
    };
    
    loadTranslations();
  }, [pathname]);

  // Function to change locale
  const changeLocale = (newLocale) => {
    if (!locales.includes(newLocale)) return;
    
    // Replace the locale segment in the URL
    const segments = pathname.split('/');
    
    if (locales.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    router.push(segments.join('/'));
  };

  // Translation helper function
  const t = (key) => {
    if (isLoading) return '';
    
    // Handle nested keys like "home.welcome"
    const keys = key.split('.');
    let result = translations;
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Return the key if translation is not found
      }
    }
    
    return result;
  };

  const value = {
    locale,
    translations,
    isLoading,
    t,
    changeLocale,
    availableLocales: locales
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

// Custom hook to use translations
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};