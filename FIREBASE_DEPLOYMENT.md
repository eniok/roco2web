# Firebase Deployment Guide

This guide will help you deploy your Next.js application to Firebase Hosting.

## 🚀 Prerequisites

1. **Firebase CLI**: Make sure you have the latest version installed
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase Project**: Ensure you have a Firebase project set up
   ```bash
   firebase login
   firebase init hosting
   ```

## 🔧 Configuration

### Current Firebase Configuration (`firebase.json`)
```json
{
  "hosting": {
    "source": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "frameworksBackend": {
      "region": "europe-west1"
    }
  }
}
```

### Next.js Configuration (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**',
      },
    ],
  },
};

export default nextConfig;
```

## 📦 Deployment Steps

### 1. **Build the Application**
```bash
npm run build
```

### 2. **Deploy to Firebase**
```bash
firebase deploy
```

### 3. **Alternative: Use the Deploy Script**
```bash
npm run deploy
```

## 🔍 Troubleshooting

### Issue: "Could not determine the web framework in use"

**Solution 1: Update Firebase CLI**
```bash
npm install -g firebase-tools@latest
```

**Solution 2: Clear Firebase Cache**
```bash
firebase logout
firebase login
firebase use --clear
firebase use your-project-id
```

**Solution 3: Reinitialize Firebase**
```bash
firebase init hosting
```
- Choose "Use an existing project"
- Select your project
- Choose "Yes" for "Configure as a single-page app"
- Choose "No" for "Set up automatic builds and deploys"

### Issue: Framework Detection Problems

**Check your project structure:**
- Ensure `package.json` is in the root directory
- Verify `next.config.ts` exists
- Make sure you're in the correct directory when running commands

**Verify Next.js installation:**
```bash
npm list next
```

## 🛠️ Alternative Deployment Methods

### Method 1: Static Export (if needed)
If you encounter issues with the frameworks backend, you can use static export:

1. **Update `next.config.ts`:**
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**',
      },
    ],
  },
};
```

2. **Update `firebase.json`:**
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "cleanUrls": true,
    "trailingSlash": false,
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

3. **Build and Deploy:**
```bash
npm run build
firebase deploy
```

### Method 2: Vercel Deployment (Recommended for Next.js)
If Firebase continues to have issues, consider using Vercel:

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

## 📊 Environment Variables

Make sure your environment variables are set in Firebase:

1. **Go to Firebase Console**
2. **Navigate to Hosting > Settings**
3. **Add environment variables under "Environment configuration"**

## 🔒 Security Rules

If you're using Firebase Firestore, ensure your security rules are properly configured:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📈 Monitoring

After deployment, monitor your application:

1. **Firebase Console**: Check hosting analytics
2. **Google Analytics**: Monitor user behavior
3. **Performance**: Use Lighthouse for performance audits

## 🚨 Common Issues

### Issue: Images not loading
- Check Firebase Storage CORS settings
- Verify image URLs are correct
- Ensure Firebase Storage rules allow public read access

### Issue: API routes not working
- API routes require server-side functionality
- Consider using Firebase Functions for API endpoints
- Or use static export if API routes aren't needed

### Issue: Build errors
- Check for TypeScript errors: `npm run lint`
- Verify all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next`

## 📞 Support

If you continue to have issues:

1. **Check Firebase Debug Log:**
```bash
firebase deploy --debug
```

2. **Review Firebase Documentation:**
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Next.js on Firebase](https://firebase.google.com/docs/hosting/frameworks/nextjs)

3. **Community Support:**
- [Firebase Community](https://firebase.google.com/community)
- [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

## 🎯 Best Practices

1. **Always test locally first:**
```bash
npm run dev
```

2. **Use staging environment:**
```bash
firebase use staging
firebase deploy
```

3. **Monitor performance:**
- Use Firebase Performance Monitoring
- Set up error tracking
- Monitor Core Web Vitals

4. **Keep dependencies updated:**
```bash
npm update
npm audit fix
```

This guide should help you successfully deploy your Next.js application to Firebase Hosting!

