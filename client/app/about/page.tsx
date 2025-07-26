'use client';

import { Bricolage } from '@/utils/fonts';
import { motion } from 'motion/react';

export const Animation = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
};

export const Transition = (x: number) => {
  return {
    duration: 0.3,
    easing: 'easeInOut',
    delay: x,
  };
};

const About = () => {
  return (
    <div className={`${Bricolage} min-h-screen bg-background text-foreground`}>
      <section className="py-40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <motion.div {...Animation} transition={Transition(0.1)} className="group">
                <h2 className="text-3xl font-bold mb-4 transition-transform">
                  The Mission
                </h2>
                <p className="text-muted-foreground lg:w-[500px] leading-relaxed text-lg">
                  Building software that just works. No bloat, no complexity just a
                  clean solution that solves real problems.
                </p>
              </motion.div>
              
              <motion.div {...Animation} transition={Transition(0.2)} className="group">
                <h2 className="text-3xl font-bold mb-4  transition-transform">
                  The Approach
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Quality over quantity. Every feature is carefully crafted with 
                  attention to detail and user experience.
                </p>
              </motion.div>
            </div>

            <motion.div {...Animation} transition={Transition(0.3)} className="relative">
              <div className="absolute inset-0 bg-foreground rounded-lg transform rotate-3 opacity-10"></div>
              <div className="relative bg-card border border-border rounded-lg p-8 shadow-elegant">
                <h3 className="text-2xl font-bold mb-6">Core Values</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span className="text-muted-foreground">Simplicity first</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span className="text-muted-foreground">Performance focused</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span className="text-muted-foreground">User-centric system</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
