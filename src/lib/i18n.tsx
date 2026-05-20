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

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
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
      const nav = window.navigator?.language?.slice(0, 2).toLowerCase();
      if (nav === 'en') setLangState('en');
    } catch {
      // localStorage can throw in private mode; fall back to default
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
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
