#!/usr/bin/env node
/**
 * Submit the current sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep).
 * Run with `npm run indexnow` after a deploy or content change.
 *
 * Usage:
 *   node scripts/indexnow.js                    # submit everything in sitemap.xml
 *   node scripts/indexnow.js url1 url2 ...      # submit only the URLs you pass
 */

const https = require('https');

const HOST = 'roal.design';
const KEY = 'eac18a8553f745e6b56428926f0dbe7d';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const MAX_URLS_PER_BATCH = 10000;

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchText(res.headers.location));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`GET ${url} → ${res.statusCode}`));
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

function extractUrlsFromSitemap(xml) {
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    urls.push(m[1].trim());
  }
  return urls;
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const payload = Buffer.from(JSON.stringify(body), 'utf8');
    const u = new URL(url);
    const req = https.request(
      {
        method: 'POST',
        hostname: u.hostname,
        path: u.pathname + u.search,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': payload.length,
          Host: u.hostname,
        },
      },
      (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      },
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  const cliUrls = process.argv.slice(2).filter(Boolean);
  let urls;

  if (cliUrls.length > 0) {
    urls = cliUrls;
    console.log(`Using ${urls.length} URL(s) from CLI args.`);
  } else {
    console.log(`Fetching sitemap: ${SITEMAP_URL}`);
    const xml = await fetchText(SITEMAP_URL);
    urls = extractUrlsFromSitemap(xml).filter((u) => u.startsWith(`https://${HOST}`));
    console.log(`Found ${urls.length} URL(s) in sitemap.`);
  }

  if (urls.length === 0) {
    console.error('No URLs to submit.');
    process.exit(1);
  }

  const batches = chunk(urls, MAX_URLS_PER_BATCH);
  for (let i = 0; i < batches.length; i++) {
    const urlList = batches[i];
    const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
    const res = await postJson(ENDPOINT, body);
    const label = `Batch ${i + 1}/${batches.length} (${urlList.length} URLs)`;
    if (res.status === 200 || res.status === 202) {
      console.log(`${label} → ${res.status} OK`);
    } else {
      console.error(`${label} → ${res.status}`);
      if (res.body) console.error(res.body);
      process.exitCode = 1;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
