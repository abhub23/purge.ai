'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedText from '../micro-interactions/Animatedtext';
import { motion } from 'motion/react';
import Video from './Video';
import L2R_AnimatedSVG from '../micro-interactions/L2R_AnimatedSVG';
import R2L_AnimatedSVG from '../micro-interactions/R2L_AnimatedSVG';

export const Hero = () => {
  return (
    <section className='relative flex flex-col items-center justify-center space-y-4 py-24 lg:mt-18 lg:py-32'>
      <div className='absolute inset-0 hidden lg:block'>
        <div className='flex justify-between px-10'>
          <div className='flex flex-col gap-y-[400px] pt-10'>
            <L2R_AnimatedSVG duration={2.7} />
            <L2R_AnimatedSVG duration={3.2} />
          </div>

          <div className='flex flex-col items-end gap-y-[380px] pt-14'>
            <R2L_AnimatedSVG duration={2.8} />
            <R2L_AnimatedSVG duration={3.3} />
          </div>
        </div>
      </div>

      {/* Mobile viewport */}
      <div className='bg-gradient-radial absolute inset-0 block overflow-hidden sm:hidden'>
        <div className='flex flex-col gap-y-[287px] pt-7'>
          <L2R_AnimatedSVG duration={2.7} />
          <L2R_AnimatedSVG duration={3.2} />
        </div>
      </div>

      <div className='relative mx-auto flex max-w-[980px] flex-col items-center space-y-2 text-center'>
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
          className='bg-muted/90 inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium'
        >
          🎉 <span className='ml-2'>Introducing our new features</span>
        </motion.div>
        <AnimatedText
          text='The most Comprehensive AI Assistant to review your PR'
          classname='text-[26px] leading-tight font-bold tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]'
          blur='20px'
          stg={0.1}
        />
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
          className='text-muted-foreground max-w-[750px] text-lg sm:text-xl'
        >
          An AI Powered critique who does the heavy lifting for your github PRs
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(20px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
        className='relative mt-2 flex flex-col gap-4 lg:flex-row'
      >
        <Button
          size='lg'
          className='rounded-4xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90'
          asChild
        >
          <Link href='/chat'>Get Started</Link>
        </Button>
        <Button variant='outline' size='lg' className='cursor-pointer rounded-4xl'>
          <Link href='/chat'> Try Assistant </Link>
        </Button>
      </motion.div>
      <div className='relative mx-auto mt-18 max-w-[1200px] rounded-2xl lg:mt-36'>
        <Video />
      </div>
    </section>
  );
};
