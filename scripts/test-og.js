#!/usr/bin/env node

const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractMetaTags(html) {
  const metaTags = {};
  const ogTags = {};
  const twitterTags = {};
  
  // Extract all meta tags
  const metaRegex = /<meta[^>]+>/g;
  const matches = html.match(metaRegex) || [];
  
  matches.forEach(tag => {
    // Extract property/name and content
    const propertyMatch = tag.match(/property=["']([^"']+)["']/);
    const nameMatch = tag.match(/name=["']([^"']+)["']/);
    const contentMatch = tag.match(/content=["']([^"']+)["']/);
    
    const property = propertyMatch ? propertyMatch[1] : null;
    const name = nameMatch ? nameMatch[1] : null;
    const content = contentMatch ? contentMatch[1] : null;
    
    if (property && content) {
      if (property.startsWith('og:')) {
        ogTags[property] = content;
      } else if (property.startsWith('twitter:')) {
        twitterTags[property] = content;
      }
      metaTags[property] = content;
    } else if (name && content) {
      metaTags[name] = content;
    }
  });
  
  return { metaTags, ogTags, twitterTags };
}

async function testOpenGraph(url) {
  try {
    console.log(`Testing Open Graph meta tags for: ${url}\n`);
    
    const html = await fetchUrl(url);
    const { metaTags, ogTags, twitterTags } = extractMetaTags(html);
    
    console.log('=== Open Graph Tags ===');
    if (Object.keys(ogTags).length === 0) {
      console.log('❌ No Open Graph tags found');
    } else {
      Object.entries(ogTags).forEach(([key, value]) => {
        console.log(`✅ ${key}: ${value}`);
      });
    }
    
    console.log('\n=== Twitter Card Tags ===');
    if (Object.keys(twitterTags).length === 0) {
      console.log('❌ No Twitter Card tags found');
    } else {
      Object.entries(twitterTags).forEach(([key, value]) => {
        console.log(`✅ ${key}: ${value}`);
      });
    }
    
    console.log('\n=== Other Important Meta Tags ===');
    const importantTags = ['title', 'description', 'keywords', 'robots'];
    importantTags.forEach(tag => {
      if (metaTags[tag]) {
        console.log(`✅ ${tag}: ${metaTags[tag]}`);
      } else {
        console.log(`❌ ${tag}: Not found`);
      }
    });
    
    // Check for image URLs
    const imageUrl = ogTags['og:image'] || twitterTags['twitter:image'];
    if (imageUrl) {
      console.log(`\n=== Image URL ===`);
      console.log(`✅ Image: ${imageUrl}`);
      
      // Test if image is accessible
      try {
        await fetchUrl(imageUrl);
        console.log('✅ Image is accessible');
      } catch (error) {
        console.log('❌ Image is not accessible:', error.message);
      }
    } else {
      console.log('\n❌ No image URL found in meta tags');
    }
    
  } catch (error) {
    console.error('Error testing URL:', error.message);
  }
}

// Get URL from command line arguments
const url = process.argv[2];

if (!url) {
  console.log('Usage: node test-og.js <url>');
  console.log('Example: node test-og.js https://roalmobileri.com/test-og');
  process.exit(1);
}

testOpenGraph(url);
