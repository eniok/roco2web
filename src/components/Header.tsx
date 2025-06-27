// src/components/Header.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { navLinks } from '../constants';

// Wrap Next’s Link to get framer-motion props
const MotionLink = motion(Link);

interface HeaderProps {
  navScrolled: boolean;
}

const Header = ({ navScrolled }: HeaderProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);

  const headerVariants = {
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: '#1a1a1a',
      boxShadow:
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    top: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: '#ffffff',
      boxShadow: 'none',
    },
  };

  const navItemVariants = {
    hover: { color: '#dc2626' },
  };

  const underlineVariants = {
    initial: { width: '0%' },
    hover: {
      width: '100%',
      backgroundColor: '#dc2626',
    },
  };

  return (
    <>
      <motion.header
        className="fixed w-full z-50 backdrop-blur-md font-sans"
        initial="top"
        animate={navScrolled || navOpen ? 'scrolled' : 'top'}
        variants={headerVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="flex items-center space-x-2 font-display text-2xl md:text-3xl font-bold tracking-tight">
            <img
              src={navScrolled ? '/logo-2.png' : "/logo.svg"}
              alt="Logo"
              className="h-8 w-auto mr-2"
            />
            <span className={`text-red-600 font-thin text-md ${navScrolled ? "text-xl": 'text-2xl'}`}>SH.P.K</span>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <MotionLink
                key={link.href}
                href={link.href}
                className="relative px-1 py-2 text-sm font-medium transition-colors"
                variants={navItemVariants}
                initial="initial"
                whileHover="hover"
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5"
                  variants={underlineVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </MotionLink>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden z-50"
            onClick={toggleNav}
            aria-label="Toggle navigation"
            aria-expanded={navOpen}
          >
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <motion.path
                initial={false}
                animate={navOpen ? 'open' : 'closed'}
                variants={{
                  open: { d: 'M 4 4 L 20 20 M 4 20 L 20 4' },
                  closed: {
                    d: 'M 4 6 L 20 6 M 4 12 L 20 12 M 4 18 L 20 18',
                  },
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {navOpen && (
          <motion.nav
            className="fixed inset-0 bg-white/95 backdrop-blur-md pt-24 font-sans z-20 md:hidden"
            initial={{ opacity: 0, y: '-5%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-5%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="flex flex-col items-center space-y-6 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href} className="w-full text-center">
                  <Link
                    href={link.href}
                    className="block w-full py-3 text-2xl font-medium text-slate-800 hover:text-red-600 transition-colors"
                    onClick={() => setNavOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
