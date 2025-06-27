// src/components/Hero.tsx
import { motion, MotionValue } from 'framer-motion';

interface HeroProps {
  heroHeight: MotionValue<string>;
}

const Hero = ({ heroHeight }: HeroProps) => {
  return (
    <motion.section id="hero" className="relative flex flex-col justify-center items-center text-center" style={{ height: heroHeight }}>
      <div className="absolute inset-0 overflow-hidden">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-95" poster="/images/cover.jpg">
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent" />
      </div>

      <motion.div className="relative z-10 max-w-4xl px-4 mx-auto" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 }}}}>
        <motion.h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}}>
          <span className="inline-block mr-4">Elevate Your</span>
          <motion.span className="text-red-600 inline-block" animate={{ textShadow: ['0 0 10px rgba(253,2,2,0.2)', '0 0 30px rgba(253,4,5,0.8)', '0 0 10px rgba(253,8,12,0.2)'] }} transition={{ duration: 4, repeat: Infinity }}>
            Space
          </motion.span>
        </motion.h2>
        <motion.p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
          Bespoke furniture solutions merging timeless craftsmanship with contemporary design
        </motion.p>
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 }}}>
          <a href="#instagram" className="inline-flex items-center bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-lg font-medium text-white transition-all group shadow-xl hover:shadow-2xl">
            Explore Collections
          </a>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-8" animate={{ y: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <a href="#about" className="block p-2">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;