// src/app/page.tsx
import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import ProjectsGallery from '../components/ProjectsGallery';
import CatalogueGateway from '../components/CatalogueGateway';
import CategoriesStrip from '../components/CategoriesStrip';
import ShowroomCTA from '../components/ShowroomCTA';
import FAQ from '../components/FAQ';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import HomeSchema from '../components/HomeSchema';

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeSchema />
      <Hero />
      <ProcessSection />
      <ProjectsGallery />
      <CatalogueGateway />
      <CategoriesStrip />
      <ShowroomCTA />
      <FAQ />
      <BlogSection />
      <Contact />
    </main>
  );
}
