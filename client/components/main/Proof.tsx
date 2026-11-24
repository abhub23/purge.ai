'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  {
    value: 38,
    suffix: 's',
    label: 'median first review',
    detail: 'from PR open to first comment',
  },
  {
    value: 12,
    suffix: '',
    label: 'files read per PR',
    detail: 'every changed file, in context',
  },
  {
    value: 3,
    suffix: '',
    label: 'findings caught',
    detail: 'before a human ever opens it',
  },
  {
    value: 94,
    suffix: '%',
    label: 'fewer round-trips',
    detail: 'less back and forth in review',
  },
];

const comparison = [
  {
    label: 'First review',
    old: 'Hours — if it happens at all',
    now: '38 seconds, every time',
  },
  {
    label: 'Context',
    old: 'The PR title and a scroll',
    now: 'Every changed file, and the code around it',
  },
  {
    label: 'Feedback',
    old: 'A comment and a guess',
    now: 'The exact patch, applied in one click',
  },
  {
    label: 'Merge',
    old: 'Blocked on whoever reviews next',
    now: 'Approved automatically once checks are green',
  },
];

const cardClass =
  'relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 lg:p-8';

const RowLabel = ({ children }: { children: string }) => (
  <div className='text-muted-foreground/70 font-mono text-[10px] tracking-[0.18em] uppercase'>
    {children}
  </div>
);

/** Counts up to `value` once the element scrolls into view. */
const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22, mass: 0.7 });
  const text = useTransform(spring, (latest) => `${Math.round(latest)}`);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return (
    <motion.span ref={ref} aria-hidden className='font-display tabular-nums'>
      {text}
    </motion.span>
  );
};

export const Proof = () => {
  return (
    <section
      id='proof'
      aria-labelledby='proof-heading'
      className='relative overflow-hidden scroll-mt-24 py-20 md:py-24'
    >
      {/* ambient accents */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-1/4 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-foreground/[0.045] blur-[120px]'
      />

      <MotionConfig reducedMotion='user'>
        <div className='relative mx-auto max-w-300 px-4 sm:px-6 lg:px-6 xl:px-0'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className='text-muted-foreground font-mono text-[10px] tracking-[0.22em] uppercase'>
              <span className='text-foreground/30'>//</span> The difference
            </p>
            <h2
              id='proof-heading'
              className='mt-5 text-3xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl'
            >
              The wait is the bug.
            </h2>
          </motion.div>

          {/* Stats band */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.06 }}
            className='border-border/60 bg-border/60 mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border lg:mt-14 lg:grid-cols-4'
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className='bg-card hover:bg-muted/40 relative flex flex-col p-6 transition-colors duration-300 lg:p-8'
              >
                <span
                  aria-hidden='true'
                  className='text-muted-foreground/40 absolute top-5 right-5 font-mono text-[10px] tracking-[0.08em]'
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className='flex items-baseline gap-0.5 text-4xl leading-none font-semibold tracking-tight lg:text-5xl'>
                  <span className='sr-only'>
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <Counter value={stat.value} />
                  {stat.suffix && (
                    <span
                      aria-hidden='true'
                      className='text-muted-foreground text-xl font-medium lg:text-2xl'
                    >
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className='mt-3 text-[15px] font-medium'>{stat.label}</div>
                <p className='text-muted-foreground mt-1 text-xs'>{stat.detail}</p>
              </div>
            ))}
          </motion.div>

          {/* Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
            className='relative mt-5 grid items-stretch gap-5 lg:grid-cols-2'
          >
            <span
              aria-hidden='true'
              className='border-border/80 bg-background text-muted-foreground absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] uppercase shadow-xs lg:block'
            >
              vs
            </span>

            <div className={`${cardClass} border-border/60 bg-muted/20`}>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent'
              />
              <div className='flex items-center gap-2.5'>
                <span className='bg-muted text-muted-foreground flex size-6 items-center justify-center rounded-full'>
                  <Minus className='size-3.5' />
                </span>
                <span className='text-muted-foreground font-mono text-[10px] tracking-[0.22em] uppercase'>
                  The old way
                </span>
              </div>
              <ul className='mt-6 flex flex-1 flex-col lg:grid lg:grid-rows-4'>
                {comparison.map((row) => (
                  <li
                    key={row.label}
                    className='border-border/50 flex flex-col justify-center border-b pb-5 last:border-0 last:pb-0 lg:pb-0'
                  >
                    <RowLabel>{row.label}</RowLabel>
                    <div className='text-muted-foreground mt-1.5 text-[15px]'>{row.old}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${cardClass} border-emerald-500/20 bg-card dark:border-emerald-400/20`}>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent'
              />
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent'
              />
              <div className='relative flex items-center gap-2.5'>
                <span className='flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                  <Check className='size-3.5' />
                </span>
                <span className='text-foreground/80 font-mono text-[10px] tracking-[0.22em] uppercase'>
                  With PurgeAI
                </span>
              </div>
              <ul className='relative mt-6 flex flex-1 flex-col lg:grid lg:grid-rows-4'>
                {comparison.map((row) => (
                  <li
                    key={row.label}
                    className='border-border/50 flex flex-col justify-center border-b pb-5 last:border-0 last:pb-0 lg:pb-0'
                  >
                    <RowLabel>{row.label}</RowLabel>
                    <div className='mt-1.5 text-[15px] font-medium'>{row.now}</div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* CTA band */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.18 }}
            className='border-border/60 bg-card relative mt-5 overflow-hidden rounded-2xl border p-8 lg:p-12'
          >
            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent'
            />
            <div
              aria-hidden='true'
              className='pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-foreground/[0.07] blur-[100px]'
            />
            <div className='relative flex flex-col items-center gap-6 text-center'>
              <h3 className='text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl'>
                Stop reading diffs. Start shipping them.
              </h3>
              <p className='text-muted-foreground max-w-xl text-sm leading-relaxed sm:text-base'>
                Point PurgeAI at a pull request and watch the review, the fixes, and the merge
                happen without you.
              </p>
              <div className='flex flex-wrap items-center justify-center gap-3'>
                <Button
                  size='lg'
                  asChild
                  className='group/cta rounded-4xl bg-emerald-700 text-white hover:bg-emerald-800 dark:hover:bg-emerald-800 has-[>svg]:px-6'
                >
                  <Link href='/chat' className='inline-flex items-center gap-2'>
                    Try on your next PR
                    <ArrowRight className='size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5' />
                  </Link>
                </Button>
                <Button size='lg' variant='outline' asChild className='rounded-4xl'>
                  <Link href='/pricing'>View pricing</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </MotionConfig>
    </section>
  );
};
