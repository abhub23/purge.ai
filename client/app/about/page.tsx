'use client';

import { HostGrotesk } from '@/utils/fonts';
import { motion } from 'motion/react';
import { Animation, Transition } from '@/animations/Animation';
import { cn } from '@/lib/utils';
import Footer from '@/components/main/Footer';

const stats = [
  { label: 'Automated PR Reviews', value: '10x Faster' },
  { label: 'Codebase Accuracy', value: '99.4%' },
  { label: 'Developer Hours Saved', value: '5+ hrs/wk' },
];

const values = [
  {
    title: 'Simplicity First',
    description: 'Zero bloat. Built to integrate seamlessly into existing GitHub workflows without setup friction.',
  },
  {
    title: 'Performance Focused',
    description: 'Instantaneous response times. Code reviews delivered directly to your PRs within seconds.',
  },
  {
    title: 'User-Centric System',
    description: 'Designed around real developer friction points to make review pipelines standard and effortless.',
  },
  {
    title: 'Quality over Quantity',
    description: 'Every line reviewed with extreme intentionality. Deep architectural context over generic linting.',
  },
];

export default function About() {
  return (
    <section className={cn('bg-background text-foreground', HostGrotesk)}>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 py-20 lg:py-28">
        
        {/* Badge & Hero */}
        <motion.div {...Animation} transition={Transition(0.15)} className="text-center">
          <span className="mb-6 inline-block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // About PurgeAI
          </span>

          <motion.h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Your PR queue. <br />
            <span className="text-muted-foreground">Handled by AI.</span>
          </motion.h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            PurgeAI reviews your code, runs checks, and ships merges line by line — so pull requests stop being a full-time job and start being a formality.
          </p>
        </motion.div>

        {/* Minimal Metrics Line */}
        <motion.div
          {...Animation}
          transition={Transition(0.22)}
          className="mt-16 grid w-full grid-cols-1 gap-8 border-y border-border/40 py-8 sm:grid-cols-3 text-center"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission & Approach */}
        <div className="mt-20 grid w-full gap-12 lg:grid-cols-2">
          <motion.div {...Animation} transition={Transition(0.28)}>
            <div className="font-mono text-xs text-muted-foreground">01 / MISSION</div>
            <h2 className="mt-2 text-xl font-bold tracking-tight lg:text-2xl">The Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
              Building software that just works. Every line is intentional, every feature earns its place by solving a real problem for real engineering teams.
            </p>
          </motion.div>

          <motion.div {...Animation} transition={Transition(0.32)}>
            <div className="font-mono text-xs text-muted-foreground">02 / VISION</div>
            <h2 className="mt-2 text-xl font-bold tracking-tight lg:text-2xl">The Approach</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
              Quality over quantity. Every capability is crafted with attention to developer ergonomics and UX. We build tools that integrate naturally into how engineers already work.
            </p>
          </motion.div>
        </div>

        {/* Core Values Clean Grid */}
        <motion.div {...Animation} transition={Transition(0.38)} className="mt-24 w-full">
          <div className="border-b border-border/40 pb-4">
            <h3 className="text-xl font-bold tracking-tight lg:text-2xl">Core Values</h3>
            <p className="mt-1 text-xs text-muted-foreground">The principles guiding PurgeAI.</p>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {values.map((item) => (
              <div key={item.title}>
                <h4 className="text-base font-medium text-foreground">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground lg:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <Footer />
    </section>
  );
}