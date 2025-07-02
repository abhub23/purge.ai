'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import AnimatedText from './Animatedtext';
import { easeInOut, motion } from 'motion/react';

export const Hero = () => {
  return (
    <section className="bg-grid-pattern relative container flex flex-col items-center justify-center space-y-4 py-24 md:py-32">
      <div className="bg-gradient-radial absolute inset-0" />
      <div className="relative mx-auto flex max-w-[980px] flex-col items-center space-y-2 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(30px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="bg-muted inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium"
        >
          🎉 <span className="ml-2">Introducing our new features</span>
        </motion.div>
        <AnimatedText text="The most Comprehensive AI Assistant to review your PR" />
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(30px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="text-muted-foreground max-w-[750px] text-lg sm:text-xl"
        >
          An AI Powered critique who does the heavy lifting for your github PRs
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(30px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: easeInOut }}
        className="relative flex flex-col gap-4 lg:flex-row"
      >
        <Button
          size="lg"
          className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          asChild
        >
          <Link href="/get-started">
            Get Started
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg">
          <Play className="mr-1 h-4 w-4" />
          Try Assistant
        </Button>
      </motion.div>
      <div className="relative mx-auto mt-16 max-w-[1200px]">
        <div className="bg-muted/50 relative rounded-xl border p-2 backdrop-blur-sm">
          <div className="bg-background aspect-video rounded-lg border shadow-2xl">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="bg-muted mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border">
                  <Play className="text-foreground h-8 w-8" />
                </div>
                <p className="text-muted-foreground">Your app preview goes here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
