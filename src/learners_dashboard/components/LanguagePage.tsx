'use client';
import React, { useEffect, useState } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';

const LANGUAGES = [
  { name: 'English',    code: 'en', flag: '🇬🇧' },
  { name: 'French',     code: 'fr', flag: '🇫🇷' },
  { name: 'Spanish',    code: 'es', flag: '🇪🇸' },
  { name: 'Arabic',     code: 'ar', flag: '🇸🇦' },
  { name: 'Portuguese', code: 'pt', flag: '🇧🇷' },
  { name: 'German',     code: 'de', flag: '🇩🇪' },
  { name: 'Chinese',    code: 'zh-CN', flag: '🇨🇳' },
  { name: 'Japanese',   code: 'ja', flag: '🇯🇵' },
  { name: 'Korean',     code: 'ko', flag: '🇰🇷' },
  { name: 'Russian',    code: 'ru', flag: '🇷🇺' },
  { name: 'Hindi',      code: 'hi', flag: '🇮🇳' },
  { name: 'Swahili',    code: 'sw', flag: '🇰🇪' },
  { name: 'Yoruba',     code: 'yo', flag: '🇳🇬' },
  { name: 'Hausa',      code: 'ha', flag: '🇳🇬' },
  { name: 'Igbo',       code: 'ig', flag: '🇳🇬' },
  { name: 'Turkish',    code: 'tr', flag: '🇹🇷' },
  { name: 'Italian',    code: 'it', flag: '🇮🇹' },
  { name: 'Dutch',      code: 'nl', flag: '🇳🇱' },
  { name: 'Bengali',    code: 'bn', flag: '🇧🇩' },
  { name: 'Amharic',    code: 'am', flag: '🇪🇹' },
  { name: 'Afrikaans',  code: 'af', flag: '🇿🇦' },
  { name: 'Albanian',   code: 'sq', flag: '🇦🇱' },
  { name: 'Armenian',   code: 'hy', flag: '🇦🇲' },
  { name: 'Azerbaijani',code: 'az', flag: '🇦🇿' },
  { name: 'Bosnian',    code: 'bs', flag: '🇧🇦' },
  { name: 'Burmese',    code: 'my', flag: '🇲🇲' },
  { name: 'Belarusian', code: 'be', flag: '🇧🇾' },
  { name: 'Basque',     code: 'eu', flag: '🏴' },
];

function clearGoogTransCookies() {
  const host = window.location.hostname;
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
  ['/', '/learner-dashboard', '/dashboard'].forEach((path) => {
    document.cookie = `googtrans=; ${expire}; path=${path};`;
    document.cookie = `googtrans=; ${expire}; path=${path}; domain=${host};`;
    document.cookie = `googtrans=; ${expire}; path=${path}; domain=.${host};`;
  });
}

function applyGoogleTranslate(langCode: string) {
  if (langCode === 'en') {
    clearGoogTransCookies();
    localStorage.setItem('ed3hub_lang', 'en');

    // Use Google Translate's own restore mechanism
    const w = window as any;
    if (typeof w.ed3hubRestoreEnglish === 'function') {
      w.ed3hubRestoreEnglish();
      setTimeout(() => { clearGoogTransCookies(); window.location.reload(); }, 500);
    } else if (typeof w.doGTranslate === 'function') {
      w.doGTranslate('en|en');
      setTimeout(() => { clearGoogTransCookies(); window.location.reload(); }, 500);
    } else {
      window.location.reload();
    }
    return;
  }

  const value = `/en/${langCode}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
  localStorage.setItem('ed3hub_lang', langCode);

  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  } else {
    window.location.reload();
  }
}

export default function LanguagePage() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(() =>
    typeof window !== 'undefined' ? (localStorage.getItem('ed3hub_lang') ?? 'en') : 'en'
  );

  // Sync active state from cookie/localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ed3hub_lang') ?? 'en';
    const cookieMatch = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (saved === 'en' && cookieMatch) {
      clearGoogTransCookies();
    } else if (cookieMatch) {
      setActive(cookieMatch[1]);
    }
  }, []);

  const handleSelect = (code: string) => {
    setActive(code);
    applyGoogleTranslate(code);
  };

  const filtered = LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Language</h1>
      <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
        Select the language you&apos;re most comfortable with. The entire site will be translated instantly.
      </p>

      <div className="relative mb-8 md:mb-10">
        <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search languages"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-600 text-sm md:text-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filtered.map((lang) => {
          const isActive = active === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex items-center gap-4 p-3 md:p-4 rounded-xl border transition-all text-left w-full ${
                isActive
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 text-xl flex-shrink-0">
                {lang.flag}
              </div>
              <span className={`font-medium text-sm md:text-base flex-1 truncate ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                {lang.name}
              </span>
              {isActive && <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-8 text-center">
        Translations powered by Google Translate
      </p>
    </div>
  );
}
