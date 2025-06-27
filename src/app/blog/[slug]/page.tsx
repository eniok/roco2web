// src/app/blog/[slug]/page.tsx
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function SlugPage({
  params,
}: {
  params: { slug: string }
}) {
  // 1. await the headers() promise
  const hdrs = await headers()
  // 2. safely grab the Accept-Language (might be undefined)
  const acceptLang = hdrs.get('accept-language') ?? ''

  // 3. derive primary subtag (e.g. "sq" from "sq-AL,en;q=0.9")
  const primary = acceptLang.split(',')[0].split('-')[0].toLowerCase()
  const lang = primary === 'sq' ? 'sq' : 'en'

  // 4. redirect to the localized URL
  redirect(`/blog/${params.slug}/${lang}`)
}
