'use client';

import { PricingCard } from '@/components/pricing/PricingCard';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PAYMENT_FREQUENCIES, TIERS } from '@/constants/price';
import { motion } from 'motion/react';
import { useState } from 'react';
import Signin from '../auth/Signin';
import { useSignBox } from '@/store/AuthStates';

export const Pricing = () => {
  const [selectedPaymentFreq, setSelectedPaymentFreq] = useState(PAYMENT_FREQUENCIES[0]);
  const { isOpen } = useSignBox();

  return (
    <section className='flex flex-col items-center gap-10 py-10'>
      {isOpen && <Signin />}
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <PricingHeader
          title='Plans and Pricing'
          subtitle='Receive unlimited credits when you pay yearly, and save on your plan.'
          frequencies={PAYMENT_FREQUENCIES}
          selectedFrequency={selectedPaymentFreq}
          onFrequencyChange={setSelectedPaymentFreq}
        />
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className='grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-3'
      >
        {TIERS.map((tier, idx) => (
          <PricingCard key={idx} tier={tier} paymentFrequency={selectedPaymentFreq} />
        ))}
      </motion.div>
    </section>
  );
};
