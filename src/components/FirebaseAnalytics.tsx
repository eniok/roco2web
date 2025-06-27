'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/firebase/analytics';
import { logEvent } from 'firebase/analytics';

export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    analytics.then(a => {
      if (!a) return;
      logEvent(a, 'page_view', { page_location: pathname });
    });
  }, [pathname]);

  return null;
}
