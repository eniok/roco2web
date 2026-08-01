'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Lang = 'sq' | 'en';

const DEFAULT_LANG: Lang = 'sq';
const STORAGE_KEY = 'roal-lang';

// Time zones covering the Albanian-speaking region. Kosovo has no IANA zone of
// its own — devices there report Europe/Belgrade, with Europe/Pristina as an
// alias on some platforms. Used as a stand-in for "is physically here": a
// visitor in Albania on an English-set phone should still land on Albanian.
const ALBANIAN_TIMEZONES = new Set([
  'Europe/Tirane',
  'Europe/Pristina',
  'Europe/Belgrade',
  'Europe/Skopje',
  'Europe/Podgorica',
]);

function detectLang(): Lang {
  const preferred =
    window.navigator?.languages?.length
      ? window.navigator.languages
      : [window.navigator?.language];
  const codes = preferred
    .filter(Boolean)
    .map((l) => l.slice(0, 2).toLowerCase());

  // Albanian anywhere in the accept-language list wins outright.
  if (codes.includes('sq')) return 'sq';

  let tz: string | undefined;
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    // Intl can be unavailable in exotic environments
  }
  if (tz && ALBANIAN_TIMEZONES.has(tz)) return 'sq';

  return codes[0] === 'en' ? 'en' : DEFAULT_LANG;
}

type LangContextValue = {
  lang: Lang;
  /** Set the display language. Pass `persist: false` for a transient sync
   *  (e.g. matching the chrome to a language-keyed URL) that must NOT overwrite
   *  the visitor's explicitly-chosen preference in localStorage. */
  setLang: (next: Lang, persist?: boolean) => void;
};

const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'sq' || stored === 'en') {
        setLangState(stored);
        return;
      }
      setLangState(detectLang());
    } catch {
      // localStorage can throw in private mode; fall back to default
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (next: Lang, persist = true) => {
    setLangState(next);
    if (!persist) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export type Dict<T> = Record<Lang, T>;

export function pick<T>(d: Dict<T>, lang: Lang): T {
  return d[lang];
}
