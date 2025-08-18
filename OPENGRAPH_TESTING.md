# Open Graph Meta Tags Testing Guide

This guide will help you test and debug Open Graph meta tags to ensure your blog posts show images when shared on WhatsApp, Facebook, and other social media platforms.

## What We've Implemented

1. **Enhanced Blog Post Meta Tags**: Updated the blog post page to include proper Open Graph meta tags
2. **Image URL Handling**: Added support for Firebase Storage URLs and relative paths
3. **Test Page**: Created a test page at `/test-og` to verify meta tags are working
4. **Debugging Script**: Created a Node.js script to test meta tags programmatically

## Testing Your Blog Posts

### Method 1: Manual Testing

1. **Deploy your changes** to your production environment
2. **Visit a blog post** (e.g., `https://roalmobileri.com/blog/your-post-slug/en`)
3. **Copy the URL** and paste it in:
   - WhatsApp
   - Facebook
   - Twitter
   - LinkedIn
4. **Check if the preview shows**:
   - Blog post title
   - Description
   - Featured image

### Method 2: Using Facebook's Sharing Debugger

1. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter your blog post URL
3. Click "Debug"
4. Check the preview and any warnings

### Method 3: Using Our Test Page

1. Visit `https://roalmobileri.com/test-og`
2. Copy the URL and test it on social media platforms
3. This page has hardcoded meta tags for testing

### Method 4: Using the Debug Script

```bash
# Make the script executable
chmod +x scripts/test-og.js

# Test a blog post URL
node scripts/test-og.js https://roalmobileri.com/blog/your-post-slug/en

# Test the test page
node scripts/test-og.js https://roalmobileri.com/test-og
```

## Expected Meta Tags

Your blog posts should now include these meta tags:

```html
<!-- Open Graph -->
<meta property="og:title" content="Your Blog Post Title" />
<meta property="og:description" content="Your blog post description..." />
<meta property="og:url" content="https://roalmobileri.com/blog/your-post-slug/en" />
<meta property="og:type" content="article" />
<meta property="og:image" content="https://roalmobileri.com/images/your-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
<meta property="og:site_name" content="RO-AL Mobileri" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Blog Post Title" />
<meta name="twitter:description" content="Your blog post description..." />
<meta name="twitter:image" content="https://roalmobileri.com/images/your-image.jpg" />
```

## Troubleshooting

### Images Not Showing

1. **Check image URL**: Ensure the image URL is absolute (starts with `https://`)
2. **Image accessibility**: Make sure the image is publicly accessible
3. **Image size**: Recommended size is 1200x630 pixels
4. **Image format**: Use JPG, PNG, or WebP formats

### Meta Tags Not Working

1. **Cache issues**: Social media platforms cache URLs. Use Facebook's Sharing Debugger to force a refresh
2. **Server-side rendering**: Ensure your Next.js app is properly generating meta tags on the server
3. **URL structure**: Make sure your blog post URLs are consistent

### Firebase Storage Images

If your images are stored in Firebase Storage:

1. **Public access**: Ensure the images are publicly accessible
2. **CORS settings**: Configure Firebase Storage CORS settings if needed
3. **URL format**: The script will automatically fetch download URLs for Firebase Storage paths

## Best Practices

1. **Image dimensions**: Use 1200x630 pixels for optimal display
2. **File size**: Keep images under 200KB for faster loading
3. **Alt text**: Always include descriptive alt text for images
4. **Testing**: Test on multiple platforms (WhatsApp, Facebook, Twitter, LinkedIn)
5. **Regular checks**: Periodically test your blog posts to ensure meta tags are working

## Common Issues and Solutions

### Issue: Images show on Facebook but not WhatsApp
**Solution**: WhatsApp is more strict about image accessibility. Ensure images are served over HTTPS and are publicly accessible.

### Issue: Meta tags work locally but not in production
**Solution**: Check your production environment's server-side rendering and ensure meta tags are generated correctly.

### Issue: Old preview still showing
**Solution**: Use Facebook's Sharing Debugger to force a cache refresh, or add a query parameter to the URL temporarily.

## Additional Resources

- [Facebook Open Graph Documentation](https://developers.facebook.com/docs/sharing/webmasters/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)

## Support

If you're still having issues after following this guide:

1. Check the browser's developer tools to see if meta tags are present
2. Use the debug script to verify meta tag content
3. Test with the `/test-og` page to isolate the issue
4. Check your Firebase Storage configuration if using Firebase images
