// src/components/About.tsx
'use client';

import { motion } from 'framer-motion';
import { aboutCards } from '../constants';

const About = () => {
  return (
    <motion.section
      id="about"
      className="container mx-auto px-6 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="sticky top-24 z-10 mb-16">
        <motion.h2
          className="text-5xl font-bold text-center mb-6"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
        >
          Crafting Excellence, <span className="text-red-600">Elevating Spaces</span>
        </motion.h2>
      </div>

      <div className="flex overflow-x-auto pb-12 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
        {aboutCards.map((item, index) => (
          <div
            key={index}
            className="shrink-0 w-full md:w-2/3 lg:w-1/2 px-3 snap-center"
          >
            <motion.div
              className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
              whileHover="hover"
              variants={{ hover: { y: -1 } }}
            >
              
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 p-8 flex flex-col justify-end">
                <item.icon className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-lg">{item.text}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
