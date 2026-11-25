'use client';

import { PricingCard } from '@/components/pricing/PricingCard';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PAYMENT_FREQUENCIES, TIERS } from '@/constants/price';
import { useState } from 'react';

export const Pricing = () => {
  const [selectedPaymentFreq, setSelectedPaymentFreq] = useState(PAYMENT_FREQUENCIES[0]);

  return (
    <section className='flex flex-col items-center gap-10 pt-10 pb-20'>
      {/* Section Header */}
      <div>
        <PricingHeader
          title='Plans and Pricing'
          subtitle='Receive unlimited credits when you pay yearly, and save on your plan.'
          frequencies={PAYMENT_FREQUENCIES}
          selectedFrequency={selectedPaymentFreq}
          onFrequencyChange={setSelectedPaymentFreq}
        />
      </div>

      {/* Pricing Cards */}
      <div className='grid w-full max-w-4xl gap-6 sm:grid-cols-2'>
        {TIERS.map((tier, idx) => (
          <PricingCard key={idx} tier={tier} paymentFrequency={selectedPaymentFreq} />
        ))}
      </div>
    </section>
  );
};
