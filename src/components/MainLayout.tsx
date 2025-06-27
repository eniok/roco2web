// src/components/MainLayout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

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
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden w-screen">
      <Header navScrolled={navScrolled} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
