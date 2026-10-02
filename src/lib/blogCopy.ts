import type { BlogPost } from '@/constants/blogData';

/** Apply the brand's Albanian wording to older CMS articles and SEO fields. */
function publicCopy(text: string): string {
  return text
    .replace(/\b(mobiljeve)\s+me\s+porosi\b/gi, '$1 të personalizuara')
    .replace(/\b(mobiljet)\s+me\s+porosi\b/gi, '$1 e personalizuara')
    .replace(/\b(mobilja)\s+me\s+porosi\b/gi, '$1 e personalizuar')
    .replace(/\b(për një mobilje)\s+me\s+porosi\b/gi, '$1 të personalizuar')
    .replace(/\b(mobilje)\s+me\s+porosi\b/gi, '$1 të personalizuara')
    .replace(/\b(garderoba)\s+me\s+porosi\b/gi, '$1 të integruara')
    .replace(/\b(dizajn)\s+me\s+porosi\b/gi, '$1 të personalizuar')
    .replace(/\b(organizimi)\s+me\s+porosi\b/gi, '$1 i personalizuar')
    // This phrasing also works with singular nouns and verb phrases, without
    // guessing their grammatical case or changing the service being described.
    .replace(/\bme(?:\s|&nbsp;|&#160;|&#x0*a0;)+porosi\b/gi, 'me projekt individual');
}

export function normalizeBlogCopy<T extends BlogPost>(post: T): T {
  const translateCopy = (copy: Record<'sq' | 'en', string>) => ({
    sq: publicCopy(copy.sq),
    en: publicCopy(copy.en),
  });

  return {
    ...post,
    titles: translateCopy(post.titles),
    excerpts: translateCopy(post.excerpts),
    content: translateCopy(post.content),
    ...(post.seo && {
      seo: {
        ...post.seo,
        ...Object.fromEntries(
          ['metaTitle', 'metaDescription', 'keywords', 'ogTitle', 'ogDescription']
            .filter((key) => typeof post.seo?.[key as keyof typeof post.seo] === 'string')
            .map((key) => [key, publicCopy(post.seo![key as keyof typeof post.seo])]),
        ),
      },
    }),
  };
}
