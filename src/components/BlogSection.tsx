'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { BlogPost } from '@/constants/blogData';
import { getAllBlogPosts } from '@/lib/firebase/firestore';
import { useLang, type Dict } from '@/lib/i18n';

const storage = getStorage();

const copy = {
  eyebrow: { sq: 'Blog', en: 'Journal' },
  headingLead: { sq: 'Nga tavolina', en: 'From the' },
  headingAccent: { sq: 'jonë e projektimit.', en: 'drawing table.' },
  subhead: {
    sq: 'Shënime mbi materialet, dizajnin dhe hapësirat që ndërtojmë — ide që mund t\u2019ju ndihmojnë para se të filloni projektin tuaj.',
    en: 'Notes on materials, design and the spaces we build — ideas that might help you before starting your own project.',
  },
  viewAll: { sq: 'Shiko të gjitha shkrimet', en: 'See all posts' },
} satisfies Record<string, Dict<string>>;

export default function BlogSection() {
  const { lang } = useLang();
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const allPosts = await getAllBlogPosts();

        const sorted = [...allPosts].sort(
          (a, b) => new Date(b.dates[lang]).getTime() - new Date(a.dates[lang]).getTime(),
        );

        const withUrls = await Promise.all(
          sorted.slice(0, 2).map(async (post) => {
            if (/^https?:\/\//i.test(post.imageUrl)) return post;
            const path = post.imagePath || post.imageUrl;
            const url = await getDownloadURL(ref(storage, path));
            return { ...post, imageUrl: url };
          }),
        );

        setRecentPosts(withUrls);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [lang]);

  if (loading || recentPosts.length === 0) return null;

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative bg-[#FAF8F4] text-[#15130F]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-[0.7rem] uppercase tracking-[0.22em] text-[#8B4A2E] mb-5"
        >
          {copy.eyebrow[lang]}
        </motion.p>

        <motion.h2
          id="blog-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-balance font-serif font-normal leading-[1.05] tracking-tight"
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.6rem)',
          }}
        >
          {copy.headingLead[lang]}{' '}
          <span className="italic text-[#8B4A2E]">{copy.headingAccent[lang]}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-[#3A352C] sm:text-lg"
        >
          {copy.subhead[lang]}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 md:gap-10">
          {recentPosts.map((post, i) => {
            const { titles, authors, dates, excerpts, imageUrl, slug } = post;
            return (
              <motion.article
                key={slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/blog/${slug}/${lang}`}
                  className="group block focus:outline-none"
                >
                  <div className="relative overflow-hidden bg-[#E8E3DB]" style={{ aspectRatio: '4 / 3' }}>
                    <img
                      src={imageUrl}
                      alt={titles[lang]}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#15130F]/55">
                      {dates[lang]} · {authors[lang]}
                    </p>
                    <h3
                      className="mt-3 text-balance font-serif text-2xl font-normal leading-snug tracking-tight text-[#15130F] group-hover:text-[#8B4A2E] transition-colors sm:text-[1.75rem]"
                      style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                    >
                      {titles[lang]}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#3A352C] line-clamp-2">
                      {excerpts[lang]}
                    </p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <Link
            href={`/blog?lang=${lang}`}
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#15130F] underline-offset-[6px] hover:underline"
          >
            {copy.viewAll[lang]}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
