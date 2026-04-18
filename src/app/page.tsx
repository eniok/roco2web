// src/app/page.tsx
'use client';

import { useScroll, useTransform } from 'framer-motion';

import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import ProjectsGallery from '../components/ProjectsGallery';
import CategoriesStrip from '../components/CategoriesStrip';
import ShowroomCTA from '../components/ShowroomCTA';
import FAQ from '../components/FAQ';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import HomeSchema from '../components/HomeSchema';

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroHeight = useTransform(scrollY, [0, 500], ['100vh', '60vh']);

  return (
    <main>
      <HomeSchema />
      <Hero heroHeight={heroHeight} />
      <ProcessSection />
      <ProjectsGallery />
      <CategoriesStrip />
      <ShowroomCTA />
      <FAQ />
      <BlogSection />
      <Contact />
    </main>
  );
}
