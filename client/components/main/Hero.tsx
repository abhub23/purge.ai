'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import VideoDialog from './VideoDialog';

export default function Hero() {
  return (
    <section className='relative flex flex-col items-center justify-center space-y-4 pt-20 pb-24 lg:pt-28 lg:pb-32'>
      <div className='relative mx-auto flex max-w-245 flex-col items-center space-y-2 text-center'>
        <div className='animate-fade-up text-center motion-reduce:animate-none'>
          <span className='text-muted-foreground inline-block font-mono text-[10px] tracking-widest uppercase lg:text-xs'>
            // Rethinking the Pull Request Workflow
          </span>
        </div>
        <h1 className='animate-fade-up w-full text-balance text-[40px] leading-[1.15] font-medium tracking-tight [animation-delay:120ms] motion-reduce:animate-none md:text-5xl md:leading-tight lg:text-6xl lg:leading-[1.1]'>
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
      <div className='animate-fade-up relative mt-2 flex w-full max-w-75 flex-col items-center gap-4 [animation-delay:360ms] motion-reduce:animate-none sm:w-auto sm:max-w-none sm:flex-row'>
        <Button
          size='lg'
          className='group/cta h-12 w-full bg-emerald-700 px-8 text-base text-white hover:bg-emerald-800 sm:h-10 sm:w-auto sm:px-6 sm:text-sm lg:h-12 lg:px-6 lg:text-lg dark:bg-emerald-700 dark:text-white dark:hover:bg-emerald-800'
          asChild
        >
          <Link href='/chat' className='inline-flex items-center gap-2'>
            Start Free
            <ArrowRight className='size-5 transition-transform duration-300 group-hover/cta:translate-x-0.5 sm:size-4 lg:size-5' />
          </Link>
        </Button>
        <VideoDialog />
      </div>
    </section>
  );
}
