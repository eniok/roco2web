// src/components/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone } from 'lucide-react';
import { navLinks } from '../constants';
import LangToggle from './LangToggle';
import { useLang } from '@/lib/i18n';
import { STORE } from '@/lib/store';
import { EASE } from './ui';

interface HeaderProps {
  navScrolled: boolean;
}

const Header = ({ navScrolled }: HeaderProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const { lang } = useLang();
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  // Dark chrome (paper text, transparent) over the hero and while the mobile
  // menu is open; light chrome (ink text, paper bar) once scrolled.
  const dark = navOpen || !navScrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,box-shadow] duration-300 ${
          dark
            ? 'text-paper'
            : 'border-b border-ink/10 bg-paper/90 text-ink backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="/"
            aria-label="ROAL Mobileri — kreu"
            className="relative z-50 flex items-center"
            onClick={() => setNavOpen(false)}
          >
            {/* Light wordmark over dark backgrounds, dark wordmark on the scrolled bar */}
            <img
              src={dark ? '/logo.svg' : '/logo-2.png'}
              alt="ROAL Mobileri"
              className="h-8 w-auto"
              decoding="async"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label={lang === 'sq' ? 'Navigimi kryesor' : 'Main navigation'}
            className="hidden items-center gap-8 md:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                  dark ? 'hover:text-sand' : 'hover:text-clay'
                }`}
              >
                {link.label[lang]}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    dark ? 'bg-sand' : 'bg-clay'
                  }`}
                />
              </Link>
            ))}
            <LangToggle className="ml-2" />
          </nav>

          {/* Mobile: lang toggle + menu button */}
          <div className="relative z-50 flex items-center gap-5 md:hidden">
            <LangToggle />
            <button
              type="button"
              onClick={() => setNavOpen((o) => !o)}
              aria-label={
                navOpen
                  ? lang === 'sq' ? 'Mbyllni menynë' : 'Close menu'
                  : lang === 'sq' ? 'Hapni menynë' : 'Open menu'
              }
              aria-expanded={navOpen}
              className="flex h-10 w-10 items-center justify-center"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="square"
              >
                <motion.path
                  initial={false}
                  animate={navOpen ? 'open' : 'closed'}
                  variants={{
                    open: { d: 'M 5 5 L 19 19 M 5 19 L 19 5' },
                    closed: { d: 'M 3 8 L 21 8 M 3 16 L 15 16' },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation — full-screen ink overlay with oversized serif links */}
      <AnimatePresence>
        {navOpen && (
          <motion.nav
            aria-label={lang === 'sq' ? 'Menyja e navigimit' : 'Navigation menu'}
            className="fixed inset-0 z-40 flex flex-col bg-ink text-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex flex-1 flex-col justify-center px-8 pt-20">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setNavOpen(false)}
                      className="group flex items-baseline gap-4 py-4"
                    >
                      <span
                        aria-hidden="true"
                        className="font-serif text-sm italic text-clay"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-3xl tracking-tight transition-colors group-hover:text-sand">
                        {link.label[lang]}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="space-y-2 px-8 pb-10 text-sm text-paper/60"
            >
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {STORE.addressLine}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`tel:${STORE.phone}`} className="hover:text-sand">
                  {STORE.phonePretty}
                </a>
              </p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
