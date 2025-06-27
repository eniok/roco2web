import { useEffect, useState } from "react";

interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
}

export function useInstagramFeed(token: string) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${token}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Instagram posts");
        }
        const data = await response.json();
        setPosts(data.data); // Typically returned as { data: [...] }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      }
    }

    if (token) {
      fetchPosts();
    }
    const p1: InstagramPost = {
      id: "https://www.instagram.com/p/DLIeOEHN-yW/?hl=en&img_index=1",
      media_url: "https://www.instagram.com/p/DLIeOEHN-yW/?hl=en&img_index=1",
      permalink: "https://www.instagram.com/p/DLIeOEHN-yW/?hl=en&img_index=1"
    }
    setPosts([p1])
  }, [token]);

  return { posts, error };
}