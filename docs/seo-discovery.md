# Search and AI discovery

The home and six service pages have separate Albanian and English URLs. `/` and the existing service paths are Albanian; `/en` and `/en/<service>` are English. These pages render their language in the initial HTML, with self-canonicals, reciprocal hreflang links, social metadata and language-matched structured data. The URL takes priority over saved browser preferences. Catalogues and the blog index retain their in-page toggle; individual blog posts retain their existing language URLs.

The positioning is collaborative, quality-conscious and approachable: discuss the client's ideas and budget, compare materials, review a detailed quote, and approve the design before production. It uses the business promises already present in this repository: free consultation, measurement and 3D design; team-managed installation; and a 2-year warranty. No fabricated ratings, market ranking or fixed prices have been added. The previous unexplained `$$$` label has been removed from the business schema.

## Brand language

Avoid “me porosi” in public Albanian copy, metadata and structured data. Describe the service through design, fit and personal attention: “interierë të personalizuar”, “mobilje të personalizuara” and “të projektuara për hapësirën tuaj”. This is a wording preference; furniture is still designed and built for each client. Legacy CMS copy is normalized when read so article text and search snippets follow the same guidance.

## Verification

Run a production build and start it, then check the actual HTTP responses:

```sh
npm run build
npm run start -- --port 3100
```

In another terminal:

```sh
python3 scripts/check-seo.py http://localhost:3100
```

The check covers all 14 localized home/service pages, visible FAQ/schema agreement, metadata, canonical URLs, hreflang, sitemap entries, search crawler access and unknown-service 404s. It does not require JavaScript, credentials or third-party packages. Opening a local page in a browser may expose existing Firebase Storage CORS errors for remote blog imagery; check those images on the deployed origin as well.

The repository's existing lint setup is incompatible with its installed ESLint 10 / React plugin combination (`next lint` is also no longer the lint entry point in Next 16). Production compilation and TypeScript validation run independently. This SEO change does not upgrade the lint toolchain.

## After publishing

1. Verify `/en`, each English service URL, `/robots.txt` and `/sitemap.xml` on the live origin. Hosting or firewall rules must allow search crawlers in addition to robots.txt.
2. Submit the sitemap in Google Search Console and Bing Webmaster Tools, and inspect the home, kitchen and wardrobe URLs in both languages. The existing `npm run indexnow` command submits the **live** sitemap; use it only after these pages are deployed.
3. Keep the real Google Business Profile consistent with the site: ROAL Mobileri, address, phone, hours, services and photos. Continue collecting authentic customer reviews.
4. Add documented completed projects over time: real photos, room dimensions, materials, the customer's brief, constraints, and how the finished design solved them. Add actual price ranges only when the business can keep them accurate. This gives prospective clients useful evidence of quality and value.
5. Measure relevant search impressions, enquiries and identifiable AI referrals, including ChatGPT-tagged visits. Compare qualified enquiries over time; a single sample prompt is not a ranking measurement.

These changes improve accessibility to search systems and give them clearer evidence about the business. They cannot guarantee first position or inclusion in any answer. `llms.txt` is an optional factual summary, not a ranking mechanism. FAQ markup describes the on-page answers; it is not a promise of a Google FAQ rich result.

## Official guidance

- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): OAI-SearchBot controls automated ChatGPT search crawling. GPTBot is a separate training control, and ChatGPT-User handles user-triggered visits. Existing permissions for all three remain unchanged.
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): crawlability, helpful textual content, internal links, page experience and structured data matching visible content remain the foundations. Inclusion is not guaranteed.
