// src/components/BlogSection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts, Lang } from '@/constants/blogData'

interface BlogSectionProps {
  lang: Lang
}

const BlogSection = ({ lang }: BlogSectionProps) => {
  // Show the 2 most recent posts
  const recentPosts = blogPosts.slice(0, 2)

  return (
    <motion.section
      id="blog"
      className="bg-white py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">
          {lang === 'en'
            ? 'From Our '
            : 'Nga '}
          <span className="text-red-600">
            {lang === 'en' ? 'Blog' : 'Blogu'}
          </span>
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Insights on design, materials, and creating beautiful spaces.'
            : 'Njohuri mbi dizajnin, materialet dhe krijimin e hapësirave të bukura.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {recentPosts.map((post) => {
            const title   = post.titles[lang]
            const author  = post.authors[lang]
            const date    = post.dates[lang]
            const excerpt = post.excerpts[lang]

            return (
              <Link
                href={`/blog/${post.slug}/${lang}`}
                key={post.slug}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
              >
                <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={post.imageUrl}
                    alt={title}
                    loading='lazy'
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {date} &nbsp;•&nbsp; {author}
                    </p>
                    <p className="text-gray-700 flex-grow">{excerpt}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href={`/blog/${lang}`}
            className="inline-flex items-center bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-lg font-medium text-white transition-all shadow-lg hover:shadow-xl"
          >
            {lang === 'en' ? 'View All Posts' : 'Shiko të Gjitha Postimet'}
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

export default BlogSection
