import { AnimatePresence } from 'framer-motion';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoPlant",
  description: "반려식물 큐레이팅",
  openGraph: {
    title: 'CoPlant',
    description: '반려식물 큐레이팅',
  }
};

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <main className='bg-pink-200'></main>
    </AnimatePresence>
  );
}