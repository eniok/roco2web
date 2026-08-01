'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/constants/blogData';
import { useLang, type Dict } from '@/lib/i18n';

const copy = {
  eyebrow: { sq: 'Blog', en: 'Journal' },
  headingLead: { sq: 'Shënime nga', en: 'Notes from' },
  headingAccent: { sq: 'studioja jonë.', en: 'the workshop.' },
  subhead: {
    sq: 'Mendime mbi materialet, dizajnin dhe hapësirat që ndërtojmë — ide që mund t\u2019ju ndihmojnë para se të filloni projektin tuaj.',
    en: 'Thoughts on materials, design and the spaces we build — ideas that might help you before starting your own project.',
  },
  empty: { sq: 'Asnjë postim për tani.', en: 'No posts yet.' },
  readMore: { sq: 'Lexoni më shumë', en: 'Read more' },
} satisfies Record<string, Dict<string>>;

// Month-name lookup for both languages. The dates are stored as localized
// display strings (e.g. "18 Mars 2025"), which `new Date()` cannot parse — it
// returns `Invalid Date`/NaN for Albanian month names, producing a NaN
// comparator whose sort order differs between the server and client V8 engines
// (the cause of the hydration mismatch). Parsing explicitly keeps sort order
// deterministic and correct.
const MONTHS: Record<string, number> = {
  // Albanian
  janar: 0, shkurt: 1, mars: 2, prill: 3, maj: 4, qershor: 5,
  korrik: 6, gusht: 7, shtator: 8, tetor: 9, nentor: 10, dhjetor: 11,
  // English
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

// Parse a localized "D Month YYYY" string into a sortable timestamp.
// Returns 0 (oldest) if the string can't be parsed, so unknown formats sink
// deterministically instead of poisoning the comparator with NaN.
function postTimestamp(date: string): number {
  const normalized = date
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, ''); // strip diacritics: "nëntor" -> "nentor"
  const day = normalized.match(/\d{1,2}/);
  const year = normalized.match(/\d{4}/);
  const monthKey = Object.keys(MONTHS).find((m) => normalized.includes(m));
  if (!day || !year || monthKey === undefined) return 0;
  return new Date(Number(year[0]), MONTHS[monthKey], Number(day[0])).getTime();
}

// Posts are fetched server-side in page.tsx and passed in, so the full list is
// present in the initial HTML for crawlers. `useLang` only swaps the display
// language client-side (default 'sq' during SSR/hydration — no mismatch).
export default function BlogListContent({ posts }: { posts: BlogPost[] }) {
  const { lang } = useLang();

  const sortedPosts = [...posts].sort(
    (a, b) => postTimestamp(b.dates[lang]) - postTimestamp(a.dates[lang]),
  );

  return (
    <main id="main-content" className="relative bg-[#FAF8F4] text-[#15130F] min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#8B4A2E] mb-5">
          {copy.eyebrow[lang]}
        </p>

        <h1
          className="max-w-3xl text-balance font-serif font-normal leading-[1.05] tracking-tight"
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
          }}
        >
          {copy.headingLead[lang]}{' '}
          <span className="italic text-[#8B4A2E]">{copy.headingAccent[lang]}</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#3A352C] sm:text-lg">
          {copy.subhead[lang]}
        </p>

        {sortedPosts.length === 0 ? (
          <p className="mt-16 text-sm text-[#15130F]/50">{copy.empty[lang]}</p>
        ) : (
          <ul
            role="list"
            className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16"
          >
            {sortedPosts.map((post, i) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  delay: (i % 6) * 0.05,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/blog/${post.slug}/${lang}`}
                  className="group block focus:outline-none"
                >
                  <div
                    className="relative overflow-hidden bg-[#E8E3DB]"
                    style={{ aspectRatio: '4 / 5' }}
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.titles[lang]}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#15130F]/55">
                      {post.dates[lang]} · {post.authors[lang]}
                    </p>
                    <h2
                      className="mt-3 text-balance font-serif text-xl font-normal leading-snug tracking-tight text-[#15130F] transition-colors group-hover:text-[#8B4A2E] sm:text-2xl"
                      style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                    >
                      {post.titles[lang]}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#3A352C] line-clamp-3">
                      {post.excerpts[lang]}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#15130F] underline-offset-[6px] group-hover:underline">
                      {copy.readMore[lang]}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
