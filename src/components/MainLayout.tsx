// src/components/MainLayout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { MotionConfig, useScroll } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFAB from './WhatsAppFAB';
import { usePathname } from 'next/navigation';
import { LangProvider } from '@/lib/i18n';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Update navbar style on scroll (and always solid off-home)
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setNavScrolled(pathname !== '/' || latest > 50);
    });
  }, [scrollY, pathname]);

  useEffect(() => {
    if (pathname !== '/') setNavScrolled(true);
  }, [pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-screen w-full flex-col overflow-x-clip bg-paper font-sans text-ink antialiased">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
          >
            Kalo te përmbajtja
          </a>
          <Header navScrolled={navScrolled} />
          {children}
          <Footer />
          <WhatsAppFAB />
        </div>
      </MotionConfig>
    </LangProvider>
  );
};

export default MainLayout;
