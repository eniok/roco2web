/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

interface InstagramFeedProps {
  /** Array of raw Instagram embed HTML strings (full blockquote snippets) */
  embedHtmls: string[];
}

/**
 * A responsive Instagram feed component that uses CSS Grid for layout.
 * It dynamically loads the Instagram embed script and processes the posts.
 */
const InstagramFeed: React.FC<InstagramFeedProps> = ({ embedHtmls }) => {
  useEffect(() => {
    const processInstagramEmbeds = () => {
      if ((window as any).instgrm?.Embeds) {
        (window as any).instgrm.Embeds.process();
      }
    };

    // Check if the Instagram embed script already exists.
    if (!(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      // When the script is loaded, process the embeds.
      script.onload = processInstagramEmbeds;
      document.body.appendChild(script);
    } else {
      // If the script is already there, just process the embeds.
      processInstagramEmbeds();
    }
  }, [embedHtmls]); // Re-run if the list of embeds changes.

  return (
    <section id="instagram" className="container mx-auto px-4 py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">
        Featured <span className="text-red-600">On Instagram</span>
      </h2>

      {/* Use CSS Grid for a robust and responsive layout.
        - 1 column on mobile (default)
        - 2 columns on small screens and up (sm:grid-cols-2)
        - 3 columns on large screens and up (lg:grid-cols-3)
        - `gap-6` provides consistent spacing between items.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {embedHtmls.map((html, idx) => {
          // Extract the permalink from the full embed HTML.
          const match = html.match(/data-instgrm-permalink=["']([^"']+)["']/);
          if (!match) return null; // Skip if the permalink can't be found.

          const url = match[1];
          // Use a minimal blockquote. Instagram's script will replace this.
          // Removing `data-instgrm-captioned` provides a cleaner, more uniform look.
          const compactHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14"></blockquote>`;

          return (
            <div
              key={idx}
              // The `div` serves as a grid item. No inline styles are needed.
              // The Instagram script will handle the sizing within this container.
              dangerouslySetInnerHTML={{ __html: compactHTML }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default InstagramFeed;