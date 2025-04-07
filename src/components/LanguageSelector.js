// // src/components/LanguageSelector.js
// "use client";

// import { useTranslation } from '../i18n/I18nProvider';

// export const LanguageSelector = () => {
//   const { locale, changeLocale, availableLocales } = useTranslation();

//   const localeNames = {
//     en: 'English',
//     fr: 'Français',
//     es: 'Español'
//   };

//   return (
//     <div className="flex gap-2 justify-center mt-4">
//       {availableLocales.map((l) => (
//         <button
//           key={l}
//           onClick={() => changeLocale(l)}
//           className={`px-3 py-1 rounded text-sm ${
//             locale === l 
//               ? 'bg-blue-500 text-white' 
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           {localeNames[l]}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default LanguageSelector;


// ====================

// src/components/LanguageSelector.js
"use client";

import { useTranslation } from '../i18n/I18nProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const LanguageSelector = () => {
  const { locale, changeLocale, availableLocales } = useTranslation();
  const router = useRouter();
  const [isChanging, setIsChanging] = useState(false);

  const localeNames = {
    en: 'English',
    fr: 'Français',
    es: 'Español'
  };

  // Preload all translation files
  useEffect(() => {
    // Only preload if not already loaded
    const preloadTranslations = async () => {
      for (const lang of availableLocales) {
        if (lang !== locale) {
          // Create a hidden link preload for each locale's JSON
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'fetch';
          link.href = `/i18n/locales/${lang}.json`;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      }
    };
    
    preloadTranslations();
  }, [availableLocales, locale]);

  const handleLanguageChange = (newLocale) => {
    if (locale === newLocale || isChanging) return;
    
    setIsChanging(true);
    
    // Use a transition effect before changing the locale
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.1s ease';
    
    // Short timeout to allow for visual transition
    setTimeout(() => {
      changeLocale(newLocale);
      
      // Reset opacity after a short delay
      setTimeout(() => {
        document.body.style.opacity = '1';
        setIsChanging(false);
      }, 100);
    }, 100);
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      {availableLocales.map((l) => (
        <button
          key={l}
          onClick={() => handleLanguageChange(l)}
          disabled={isChanging}
          className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
            locale === l 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;