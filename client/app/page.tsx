import Navbar from '@/components/main/Navbar';
import Hero from '@/components/main/Hero';
import { Bento } from '@/components/main/Bento';
import Footer from '@/components/main/Footer';

export default function Home() {
  return (
    <div className='bg-background min-h-screen lg:min-w-4xl'>
      <Navbar />
      <Hero />
      <Bento />
      <Footer />
    </div>
  );
}
