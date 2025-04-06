// src/components/LanguageSelector.js
"use client";

import { useTranslation } from '../i18n/I18nProvider';

export const LanguageSelector = () => {
  const { locale, changeLocale, availableLocales } = useTranslation();

  const localeNames = {
    en: 'English',
    fr: 'Français',
    es: 'Español'
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      {availableLocales.map((l) => (
        <button
          key={l}
          onClick={() => changeLocale(l)}
          className={`px-3 py-1 rounded text-sm ${
            locale === l 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;