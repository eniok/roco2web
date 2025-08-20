'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { Inter_Tight, Manrope } from 'next/font/google'

import { BlogPost, Lang } from '@/constants/blogData'
import { getAllBlogPosts } from '@/lib/firebase/firestore'

const display = Inter_Tight({ subsets: ['latin'], variable: '--font-display' })
const text = Manrope({ subsets: ['latin'], variable: '--font-sans' })

interface BlogSectionProps {
  lang: Lang
}

const storage = getStorage()

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BlogSection({ lang }: BlogSectionProps) {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /** Get the two newest posts and make sure each has a public imageUrl */
    const load = async () => {
      try {
        const allPosts = await getAllBlogPosts()

        // newest → oldest for this language
        const sorted = [...allPosts].sort(
          (a, b) => new Date(b.dates[lang]).getTime() - new Date(a.dates[lang]).getTime(),
        )

        // Resolve Storage URLs in parallel
        const withUrls = await Promise.all(
          sorted.slice(0, 2).map(async post => {
            // If imageUrl is already a https link, keep it; otherwise fetch from Storage
            if (/^https?:\/\//i.test(post.imageUrl)) return post

            // Fallback key names - use whichever you saved in Firestore
            const path = post.imagePath || post.imageUrl
            const url = await getDownloadURL(ref(storage, path))
            return { ...post, imageUrl: url }
          }),
        )

        setRecentPosts(withUrls)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [lang])

  if (loading || recentPosts.length === 0) return null

  return (
    <motion.section
      id="blog"
      className={`${text.className} relative isolate bg-gradient-to-b from-white via-rose-50/40 to-white py-24`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Subtle background rose glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_50%_0%,rgba(244,63,94,0.08)_0%,transparent_60%)]" />

      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`${display.className} text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950`}> 
            {lang === 'en' ? 'From Our ' : 'Nga '}
            <span className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-400 bg-clip-text text-transparent align-baseline">
              {lang === 'en' ? 'Blog' : 'Blogu'}
            </span>
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent" />
          <p className="mt-6 text-lg md:text-xl text-gray-600">
            {lang === 'en'
              ? 'Insights on design, materials, and creating beautiful spaces.'
              : 'Njohuri mbi dizajnin, materialet dhe krijimin e hapësirave të bukura.'}
          </p>
        </div>

        {/* Two most-recent posts */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {recentPosts.map(post => {
            const { titles, authors, dates, excerpts, imageUrl, slug } = post
            return (
              <motion.article key={slug} variants={cardVariants}>
                <Link
                  href={`/blog/${slug}/${lang}`}
                  className="group block rounded-2xl ring-1 ring-rose-200/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 shadow-sm hover:shadow-rose-200/50 transition-shadow"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={imageUrl}
                      alt={titles[lang]}
                      loading="lazy"
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {/* soft top gradient for legibility */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-90" />
                  </div>

                  <div className="p-6">
                    <h3 className={`${display.className} text-2xl font-bold mb-2 text-gray-900 transition-colors group-hover:text-rose-600 line-clamp-1`}>
                      {titles[lang]}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {dates[lang]} &nbsp;•&nbsp; {authors[lang]}
                    </p>
                    <p className="text-gray-700 line-clamp-1">
                      {excerpts[lang]}
                    </p>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </motion.div>

        {/* View-all button */}
        <div className="text-center mt-8">
          <Link
            href={`/blog?lang=${lang}`}
            className="inline-flex items-center rounded-full bg-rose-600 px-8 py-3 text-lg font-semibold text-white shadow-xl ring-1 ring-rose-300/30 transition hover:bg-rose-500 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70"
          >
            {lang === 'en' ? 'View All Posts' : 'Shiko të Gjitha Postimet'}
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
