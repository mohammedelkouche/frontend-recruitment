"use client";

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocaleFromPathname, getTranslations, defaultLocale, locales } from './config';

const translationsCache = {};

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [translations, setTranslations] = useState({});
  const [locale, setLocale] = useState(defaultLocale);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(false);

  useEffect(() => {
    const detectedLocale = getLocaleFromPathname(pathname);
    
    // Only trigger loading state on first render or actual locale change
    if (!mountedRef.current || detectedLocale !== locale) {
      setIsLoading(true);
      setLocale(detectedLocale);
    
      // Check if we have the translations cached
      if (translationsCache[detectedLocale]) {
        setTranslations(translationsCache[detectedLocale]);
        setIsLoading(false);
      } else {
        const loadTranslations = async () => {
          try {
            const loadedTranslations = await getTranslations(detectedLocale);
            translationsCache[detectedLocale] = loadedTranslations;
            setTranslations(loadedTranslations);
          } catch (error) {
            console.error(`Failed to load translations for ${detectedLocale}:`, error);
          } finally {
            setIsLoading(false);
          }
        };
        
        loadTranslations();
      }
    }
    
    mountedRef.current = true;
  }, [pathname, locale]);

  // Preload all locales in the background
  useEffect(() => {
    const preloadAllTranslations = async () => {
      // Skip the current locale as it's already loaded
      const localesToLoad = locales.filter(l => l !== locale && !translationsCache[l]);
      
      for (const localeToLoad of localesToLoad) {
        try {
          const loaded = await getTranslations(localeToLoad);
          translationsCache[localeToLoad] = loaded;
        } catch (error) {
          console.error(`Failed to preload translations for ${localeToLoad}:`, error);
        }
      }
    };
    
    const timer = setTimeout(preloadAllTranslations, 2000);
    
    return () => clearTimeout(timer);
  }, [locale]);

  const changeLocale = (newLocale) => {
    if (!locales.includes(newLocale) || newLocale === locale) return;
    
    // Replace the locale segment in the URL
    const segments = pathname.split('/');
    
    if (locales.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    router.push(segments.join('/'));
  };

  // Translation helper function with fallback to default locale
  const t = (key) => {
    if (isLoading) return key;
    
    const keys = key.split('.');
    let result = translations;
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        // Try to get from default locale if available in cache
        if (locale !== defaultLocale && translationsCache[defaultLocale]) {
          let defaultResult = translationsCache[defaultLocale];
          let found = true;
          
          for (const dk of keys) {
            if (defaultResult && defaultResult[dk]) {
              defaultResult = defaultResult[dk];
            } else {
              found = false;
              break;
            }
          }
          
          if (found) return defaultResult;
        }
        
        return key;
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

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};