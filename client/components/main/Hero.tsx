'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Video from './Video';
import L2R_AnimatedSVG from '../micro-interactions/L2R_AnimatedSVG';
import R2L_AnimatedSVG from '../micro-interactions/R2L_AnimatedSVG';

export default function Hero() {
  return (
    <section className='relative flex flex-col items-center justify-center space-y-4 py-24 lg:py-32'>
      <div className='absolute inset-0 hidden lg:block'>
        <div className='flex justify-between px-10'>
          <div className='flex flex-col gap-y-100 pt-10'>
            <L2R_AnimatedSVG duration={2.7} />
            <L2R_AnimatedSVG duration={3.2} />
          </div>

          <div className='flex flex-col items-end gap-y-95 pt-14'>
            <R2L_AnimatedSVG duration={2.8} />
            <R2L_AnimatedSVG duration={3.3} />
          </div>
        </div>
      </div>

      {/* Mobile viewport */}
      <div className='bg-gradient-radial absolute inset-0 block overflow-hidden sm:hidden'>
        <div className='flex flex-col gap-y-60 pt-7'>
          <L2R_AnimatedSVG duration={2.7} />
          <L2R_AnimatedSVG duration={3.2} />
        </div>
      </div>

      <div className='relative mx-auto flex max-w-245 flex-col items-center space-y-2 text-center'>
        <div className='animate-fade-up text-center motion-reduce:animate-none'>
          <span className='text-muted-foreground inline-block font-mono text-[10px] tracking-widest uppercase lg:text-xs'>
            // Rethinking the Pull Request Workflow
          </span>
        </div>
        <h1 className='animate-fade-up w-full text-balance text-[40px] leading-[1.15] font-semibold tracking-tight [animation-delay:120ms] motion-reduce:animate-none md:text-5xl md:leading-tight lg:text-6xl lg:leading-[1.1]'>
          The AI Agent
          <br className='sm:hidden' />{' '}
          for every
          <br className='sm:hidden' />{' '}
          code review
        </h1>
        <p className='animate-fade-up text-muted-foreground mx-10 max-w-187.5 text-[15px] [animation-delay:240ms] motion-reduce:animate-none lg:mx-0 lg:text-xl'>
          An AI Powered critique who does the heavy lifting for your github PRs
        </p>
      </div>
      <div className='animate-fade-up relative mt-2 flex flex-row gap-4 [animation-delay:360ms] motion-reduce:animate-none'>
        <Button
          size='lg'
          className='rounded-4xl bg-black text-white hover:bg-black/90 lg:h-12 lg:px-6 lg:text-lg dark:bg-white dark:text-black dark:hover:bg-white/90'
          asChild
        >
          <Link href='/chat'>Get Started</Link>
        </Button>
        <Button
          variant='outline'
          size='lg'
          className='cursor-pointer rounded-4xl lg:h-12 lg:px-6 lg:text-lg'
        >
          <Link href='/chat'> Try Assistant </Link>
        </Button>
      </div>
      <div className='relative mx-auto mt-28 max-w-300 rounded-2xl lg:mt-36'>
        <Video />
      </div>
    </section>
  );
}
