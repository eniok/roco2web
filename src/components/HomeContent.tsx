import type { Lang } from '@/lib/i18n';
import HomeSchema from './HomeSchema';
import Hero from './Hero';
import RoalExperience from './RoalExperience';
import ProcessSection from './ProcessSection';
import ProjectsGallery from './ProjectsGallery';
import CatalogueGateway from './CatalogueGateway';
import CategoriesStrip from './CategoriesStrip';
import ShowroomCTA from './ShowroomCTA';
import FAQ from './FAQ';
import BlogSection from './BlogSection';
import Contact from './Contact';

export default function HomeContent({ lang }: { lang: Lang }) {
  return (
    <main id="main-content" lang={lang}>
      <HomeSchema lang={lang} />
      <Hero />
      <RoalExperience />
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
