'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import { BlogPost, Lang } from '@/constants/blogData'
import { getAllBlogPosts } from '@/lib/firebase/firestore'

interface BlogSectionProps {
  lang: Lang
}

const storage = getStorage() // uses the same Firebase app you initialised

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
          (a, b) =>
            new Date(b.dates[lang]).getTime() - new Date(a.dates[lang]).getTime(),
        )

        // Resolve Storage URLs in parallel
        const withUrls = await Promise.all(
          sorted.slice(0, 2).map(async post => {
            // If imageUrl is already a https link, keep it; otherwise fetch from Storage
            if (/^https?:\/\//i.test(post.imageUrl)) return post

            // Fallback key names - use whichever you saved in Firestore
            const path = post.imagePath || post.imageUrl
            const url  = await getDownloadURL(ref(storage, path))
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
      className="bg-white py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-6">
          {lang === 'en' ? 'From Our ' : 'Nga '}
          <span className="text-red-600">
            {lang === 'en' ? 'Blog' : 'Blogu'}
          </span>
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Insights on design, materials, and creating beautiful spaces.'
            : 'Njohuri mbi dizajnin, materialet dhe krijimin e hapësirave të bukura.'}
        </p>

        {/* Two most-recent posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {recentPosts.map(post => {
            const { titles, authors, dates, excerpts, imageUrl, slug } = post
            return (
              <Link
                href={`/blog/${slug}/${lang}`}
                key={slug}
                className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <div className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-2xl">
                  <img
                    src={imageUrl}
                    alt={titles[lang]}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-2 transition-colors group-hover:text-red-600">
                      {titles[lang]}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {dates[lang]} &nbsp;•&nbsp; {authors[lang]}
                    </p>
                    <p className="text-gray-700 flex-grow">{excerpts[lang]}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View-all button */}
        <div className="text-center">
          <Link
            href={`/blog?lang=${lang}`}
            className="inline-flex items-center rounded-full bg-red-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition hover:bg-red-700 hover:shadow-xl"
          >
            {lang === 'en' ? 'View All Posts' : 'Shiko të Gjitha Postimet'}
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
