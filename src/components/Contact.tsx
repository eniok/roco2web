// src/components/Contact.tsx
'use client';

import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="bg-gray-800 pt-20 pb-20"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 text-white">
        <h2 className="text-4xl font-bold text-center mb-6">
          Get in <span className="text-red-400">Touch</span>
        </h2>

        <p className="text-center text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          We’d love to hear from you. Fill out the form below or contact us directly at:
        </p>

        {/* Email */}
        <p className="text-center mb-2">
          <strong>Email:</strong>{' '}
          <a
            href="mailto:info@roalmobileri.com"
            className="text-red-400 hover:underline"
          >
            info@roalmobileri.com
          </a>
        </p>

        {/* Phone / WhatsApp */}
        <p className="text-center mb-8">
          <strong>Phone:</strong>{' '}
          <a
            href="tel:+355672029739"
            className="text-red-400 hover:underline"
          >
            +355&nbsp;67&nbsp;202&nbsp;9739
          </a>{' '}
          or{' '}
          <a
            href="https://wa.me/355672029739"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            WhatsApp
          </a>
        </p>

        {/* Location */}
        <p className="text-center">
          <strong>Address:</strong>{' '}
          <a
            href="https://maps.app.goo.gl/hup8LSzdGnRWKWUq9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:underline"
          >
            Km 8, Autostrada&nbsp;Tiranë-Durrës, Tiranë&nbsp;1000
          </a>
        </p>
      </div>
    </motion.section>
  );
};

export default Contact;
