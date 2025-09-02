'use client';

import { Bricolage } from '@/utils/fonts';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Animation, Transition } from '@/animations/Animation';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <section
      className={cn('bg-background text-foreground flex h-[670px] grid-cols-1 flex-col items-center justify-center space-y-8 lg:min-h-screen lg:grid-cols-2 lg:flex-row', Bricolage)}
    >
      <motion.h1
        {...Animation}
        transition={Transition(0.15)}
        className='top-12 text-[24px] font-semibold underline lg:fixed lg:text-[44px]'
      >
        About Us
      </motion.h1>
      <div className='flex w-[300px] flex-col justify-center space-y-8 lg:mx-0 lg:mr-14 lg:w-[500px]'>
        <motion.div {...Animation} transition={Transition(0.15)} className='group'>
          <h2 className='mb-1 text-[18px] font-semibold transition-transform lg:mb-4 lg:text-3xl'>
            The Mission
          </h2>
          <p className='text-muted-foreground text-[14px] leading-relaxed lg:w-[500px] lg:text-lg'>
            Building software that just works. No bloat, no complexity just a clean solution that
            solve real problems.
          </p>
        </motion.div>

        <motion.div {...Animation} transition={Transition(0.25)} className='group'>
          <h2 className='mb-1 text-[18px] font-semibold transition-transform lg:mb-4 lg:text-3xl'>
            The Approach
          </h2>
          <p className='text-muted-foreground text-justify text-[14px] leading-relaxed lg:w-[500px] lg:text-lg'>
            Quality over quantity. Every feature is carefully crafted with attention to detail and
            user experience. the product still is in progress and with time it will make its place
            into the heart of devs across the world.
          </p>
        </motion.div>
      </div>

      <motion.div
        {...Animation}
        transition={Transition(0.35)}
        className='relative w-[300px] lg:w-[400px]'
      >
        <div className='bg-foreground absolute inset-0 w-[300px] rotate-3 transform rounded-lg opacity-10 lg:w-[400px]'></div>
        <div className='bg-card border-border shadow-elegant relative rounded-lg border p-3 lg:p-8'>
          <h3 className='mb-4 text-[20px] font-bold lg:text-2xl'>Core Values</h3>
          <div className='space-y-2 text-[14px] lg:space-y-4 lg:text-[16px]'>
            <div className='flex items-center space-x-3'>
              <div className='bg-foreground h-2 w-2 rounded-full'></div>
              <span className='text-muted-foreground'>Simplicity first</span>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='bg-foreground h-2 w-2 rounded-full'></div>
              <span className='text-muted-foreground'>Performance focused</span>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='bg-foreground h-2 w-2 rounded-full'></div>
              <span className='text-muted-foreground'>User-centric system</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className='fixed bottom-0 lg:w-full'>
        <p className='text-muted-foreground flex h-13 items-center justify-center border-t text-[12px] lg:h-16 lg:text-[14px]'>
          © 2025 PurgeAI. All rights reserved.
          <Link href={'/t&c'} className='hover:text-foreground/75 ml-2 underline transition-colors'>
            Terms & Conditions{' '}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default About;
