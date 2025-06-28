// src/lib/firebase/firestore.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore, getDocs, collection, getDoc, doc } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

// mirror the same config as analytics.ts
const config = {
  apiKey:        process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:     process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  appId:         process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// initializeOrGet the app
const app = getApps().length ? getApp() : initializeApp(config);

// export your Firestore client
export const db: Firestore = getFirestore(app);
export const storage  = getStorage(app);

export const getAllBlogPosts = async () => {
  const snap = await getDocs(collection(db, 'blogPosts'))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return snap.docs.map(d => ({ slug: d.id, ...(d.data() as any) }))
}

export const getBlogPost = async (slug: string) => {
  const snap = await getDoc(doc(db, 'blogPosts', slug))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return snap.exists() ? { slug, ...(snap.data() as any) } : null
}