"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData } from "../constants";
import { Inter_Tight, Manrope } from "next/font/google";
import { Check, ArrowRight } from "lucide-react";

const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display" });
const text = Manrope({ subsets: ["latin"], variable: "--font-sans" });

// Simple variants for staggered entrance
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { y: 12, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

type ServiceItem = {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
};

export default function Services() {
  return (
    <motion.section
      id="services"
      aria-label="Our services — concept, craft, installation"
      className={`${text.className} relative overflow-hidden bg-gradient-to-b from-red-50 via-white to-white py-24`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Ambient rose glow + hairline divider */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(40%_30%_at_50%_-10%,rgba(244,63,94,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16" variants={item}>
          <h2 className={`${display.className} text-4xl md:text-5xl font-extrabold tracking-tight mb-5`}>
            Comprehensive
            {" "}
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to installation, we handle every detail with precision and care
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
        >
          {(servicesData as ServiceItem[]).map((service, index) => (
            <motion.article
              key={index}
              variants={item}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-white ring-1 ring-black/5 shadow-lg transition-transform duration-300"
            >
              {/* Gradient ring on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:linear-gradient(180deg,transparent)]" />

              <div className="relative z-10 p-8">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-rose-500/10 ring-1 ring-rose-200">
                  <service.icon className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className={`${display.className} text-2xl font-bold mb-3`}>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <Check className="mt-1 mr-2 h-5 w-5 shrink-0 text-rose-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Section CTA */}
        <motion.div className="mt-14 flex justify-center" variants={item}>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-white font-semibold ring-1 ring-rose-300/30 shadow-xl transition-all hover:bg-rose-500 hover:shadow-2xl"
          >
            Book a Design Consult
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
