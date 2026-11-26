import { Pricing } from '@/components/pricing/Pricing';
import Footer from '@/components/main/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Purge AI',
};

const PricingPage = () => {
  return (
    <>
      <Pricing />
      <Footer />
    </>
  );
};

export default PricingPage;
