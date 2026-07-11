import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Open Graph - RO-AL Mobileri',
  description: 'This is a test page to verify Open Graph meta tags are working correctly for social media sharing.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Test Open Graph - RO-AL Mobileri',
    description: 'This is a test page to verify Open Graph meta tags are working correctly for social media sharing.',
    url: 'https://roal.design/test-og',
    type: 'website',
    siteName: 'RO-AL Mobileri',
    images: [
      {
        url: 'https://roal.design/images/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'RO-AL Mobileri Showroom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Open Graph - RO-AL Mobileri',
    description: 'This is a test page to verify Open Graph meta tags are working correctly for social media sharing.',
    images: [
      {
        url: 'https://roal.design/images/cover.jpg',
        alt: 'RO-AL Mobileri Showroom',
      },
    ],
  },
};

export default function TestOGPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Open Graph Test Page
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Testing Social Media Sharing
          </h2>
          
          <p className="text-gray-700 mb-6">
            This page is designed to test whether Open Graph meta tags are working correctly.
            When you share this URL on WhatsApp, Facebook, Twitter, or other social media platforms,
            you should see a preview with an image, title, and description.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Expected Preview:</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Title: &ldquo;Test Open Graph - RO-AL Mobileri&rdquo;</li>
              <li>• Description: &ldquo;This is a test page to verify Open Graph meta tags...&rdquo;</li>
              <li>• Image: RO-AL Mobileri showroom image</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Testing Instructions:</h3>
            <ol className="text-yellow-800 space-y-1">
              <li>1. Copy this URL: <code className="bg-yellow-100 px-2 py-1 rounded">https://roal.design/test-og</code></li>
              <li>2. Paste it in WhatsApp, Facebook, or Twitter</li>
              <li>3. Check if the preview shows the image and description</li>
              <li>4. If it doesn&apos;t work, try using Facebook&apos;s Sharing Debugger tool</li>
            </ol>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="https://developers.facebook.com/tools/debug/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Facebook Sharing Debugger
          </a>
        </div>
      </div>
    </div>
  );
}
