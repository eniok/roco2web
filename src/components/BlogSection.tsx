'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { BlogPost } from '@/constants/blogData';
import { getAllBlogPosts } from '@/lib/firebase/firestore';
import { useLang, type Dict } from '@/lib/i18n';
import SectionHeading from './SectionHeading';
import { EASE } from './ui';

const storage = getStorage();

const copy = {
  eyebrow: { sq: 'Blog', en: 'Journal' },
  headingLead: { sq: 'Nga tavolina', en: 'From the' },
  headingAccent: { sq: 'jonë e projektimit.', en: 'drawing table.' },
  subhead: {
    sq: 'Shënime mbi materialet, dizajnin dhe hapësirat që ndërtojmë — ide që mund t\u2019ju ndihmojnë para se të filloni projektin tuaj.',
    en: 'Notes on materials, design and the spaces we build — ideas that might help you before starting your own project.',
  },
  viewAll: { sq: 'Shihni të gjitha shkrimet', en: 'See all posts' },
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
      className="relative bg-paper text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            id="blog-heading"
            index="06"
            eyebrow={copy.eyebrow}
            lead={copy.headingLead}
            accent={copy.headingAccent}
            sub={copy.subhead}
            className="max-w-3xl flex-1 basis-[32rem]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 pb-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-clay"
            >
              {copy.viewAll[lang]}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 sm:mt-20 md:grid-cols-2">
          {recentPosts.map((post, i) => {
            const { titles, authors, dates, excerpts, imageUrl, slug } = post;
            return (
              <motion.article
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
              >
                <Link
                  href={`/blog/${slug}/${lang}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50"
                >
                  <div className="overflow-hidden bg-ink/5 ring-1 ring-ink/10">
                    <img
                      src={imageUrl}
                      alt={titles[lang]}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <p className="mt-6 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-ink/55">
                    <span>{dates[lang]}</span>
                    <span aria-hidden="true" className="h-2 w-px bg-clay/50" />
                    <span>{authors[lang]}</span>
                  </p>
                  <h3 className="mt-3 text-balance font-serif text-2xl font-normal leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-clay sm:text-[1.75rem]">
                    {titles[lang]}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-body line-clamp-2">
                    {excerpts[lang]}
                  </p>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
