// src/app/blog/[slug]/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type RouteParams = { slug: string };

export default async function SlugPage(
  { params }: { params: Promise<RouteParams> }   // 👈 promise
) {
  // 1. Resolve both promises up-front
  const [{ slug }, hdrs] = await Promise.all([params, headers()]);

  // 2. Pick the preferred language
  const acceptLang = hdrs.get('accept-language') ?? '';
  const primary    = acceptLang.split(',')[0].split('-')[0].toLowerCase();
  const lang       = primary === 'sq' ? 'sq' : 'en';

  // 3. Redirect to the localized URL
  redirect(`/blog/${slug}/${lang}`);
}