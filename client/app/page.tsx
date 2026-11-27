import Navbar from '@/components/main/Navbar';
import Hero from '@/components/main/Hero';
import ReviewWorkflowShowcase from '@/components/main/ReviewWorkflowShowcase';
import { Bento } from '@/components/main/Bento';
import { Proof } from '@/components/main/Proof';
import Footer from '@/components/main/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purge AI - AI assistant for GitHub PRs',
};

export default function Home() {
  return (
    <div className='bg-background min-h-screen lg:min-w-4xl'>
      <Navbar />
      <Hero />
      <ReviewWorkflowShowcase />
      <Bento />
      <Proof />
      <Footer />
    </div>
  );
}
