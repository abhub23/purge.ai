'use client';

import { Bricolage } from '@/utils/fonts';
import { motion } from 'motion/react';
import { Animation, Transition } from '@/animations/Animation';
import { cn } from '@/lib/utils';
import Footer from '@/components/main/Footer';

const values = [
  'Simplicity first',
  'Performance focused',
  'User-centric system',
  'Quality over quantity',
];

export default function About(){
  return (
    <section className={cn('bg-background text-foreground', Bricolage)}>
      <div className='mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-20'>
        <motion.div {...Animation} transition={Transition(0.15)} className='text-center'>
          <motion.h1 className='text-foreground text-[32px] font-bold tracking-tight lg:text-6xl'>
            Your PR queue.
            <br />
            Handled by AI.
          </motion.h1>
          <p className='text-muted-foreground mt-6 text-[15px] leading-relaxed lg:text-lg'>
            PurgeAI reviews your code, runs the checks, and ships the merge line by line — so pull
            requests stop being a full-time job and start being a formality.
          </p>
        </motion.div>

        {/* Mission & Approach */}
        <div className='mt-16 grid w-full gap-6 lg:grid-cols-2'>
          <motion.div
            {...Animation}
            transition={Transition(0.2)}
            className='bg-card shadow-elegant rounded-lg border p-6 lg:p-8'
          >
            <h2 className='text-[18px] font-semibold lg:text-2xl'>The Mission</h2>
            <p className='text-muted-foreground mt-3 text-sm leading-relaxed lg:text-lg'>
              Building software that just works. Every line is intentional, every feature earns its
              place by solving a real problem for real developers.
            </p>
          </motion.div>

          <motion.div
            {...Animation}
            transition={Transition(0.28)}
            className='bg-card shadow-elegant rounded-lg border p-6 lg:p-8'
          >
            <h2 className='text-[18px] font-semibold lg:text-2xl'>The Approach</h2>
            <p className='text-muted-foreground mt-3 text-sm leading-relaxed lg:text-lg'>
              Quality over quantity. Every feature is carefully crafted with attention to detail and
              user experience. The product is still in progress, and with time it will find its way
              into the hearts of developers across the world.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          {...Animation}
          transition={Transition(0.35)}
          className='relative mt-10 w-full'
        >
          <div className='bg-foreground absolute inset-0 rotate-1 rounded-lg opacity-10'></div>
          <div className='bg-card shadow-elegant relative rounded-lg border p-6 lg:p-8'>
            <h3 className='mb-4 text-[20px] font-bold lg:text-2xl'>Core Values</h3>
            <div className='grid gap-4 sm:grid-cols-2'>
              {values.map((value) => (
                <div key={value} className='flex items-center space-x-3'>
                  <div className='bg-foreground h-2 w-2 rounded-full'></div>
                  <span className='text-muted-foreground text-sm lg:text-base'>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </section>
  );
};