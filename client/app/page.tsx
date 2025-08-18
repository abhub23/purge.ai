import { Navbar } from '@/components/main/Navbar';
import { Hero } from '@/components/main/Hero';
import { Features } from '@/components/main/Features';
import { Footer } from '@/components/main/Footer';

export default function Home() {
  return (
    <div className="bg-background min-h-screen min-w-4xl">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
