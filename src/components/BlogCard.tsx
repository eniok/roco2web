import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { BlogPost, Lang } from '@/constants/blogData'

interface BlogCardProps {
  post: BlogPost
  lang: Lang
}

const BlogCard = ({ post, lang }: BlogCardProps) => {
  const title   = post.titles[lang]
  const author  = post.authors[lang]
  const date    = post.dates[lang]
  const excerpt = post.excerpts[lang]

  return (
    <Link
      href={`/blog/${post.slug}/${lang}`}
      aria-label={`Read ${title}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
        <img
          src={post.imageUrl}
          alt={title}
          loading="lazy"
          className="h-48 w-full object-cover sm:h-56"
        />
        <div className="flex flex-1 flex-col p-6">
          <h2 className="mb-2 text-2xl font-semibold transition-colors duration-200 group-hover:text-red-600">
            {title}
          </h2>
          <p className="mb-4 text-sm text-neutral-500">
            {date} &nbsp;•&nbsp; {author}
          </p>
          <p className="mb-6 flex-1 text-neutral-700">{excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1 font-medium text-red-600">
            {lang === 'en' ? 'Read more' : 'Lexo më shumë'}{' '}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  )
}

export default BlogCard