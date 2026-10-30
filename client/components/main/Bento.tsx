'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleSlash2,
  FileCode2,
  GitMerge,
  GitPullRequest,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { motion, MotionConfig } from 'motion/react';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from 'cn';

const findings = [
  {
    severity: 'high',
    label: 'High',
    title: 'Ownership check missing before delete',
    file: 'src/api/workspace.ts:121',
  },
  {
    severity: 'medium',
    label: 'Med',
    title: 'Only the active session is revoked',
    file: 'src/lib/auth/session.ts:42',
  },
  {
    severity: 'low',
    label: 'Low',
    title: 'Retry loop can hammer the avatar CDN',
    file: 'src/ui/avatar.tsx:27',
  },
] as const;

const severityStyles = {
  high: { dot: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
  medium: { dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  low: { dot: 'bg-sky-500', text: 'text-sky-600 dark:text-sky-400' },
} as const;

const checks = [
  { label: 'Unit tests', time: '1m 42s' },
  { label: 'Type check', time: '28s' },
  { label: 'Security scan', time: '31s' },
  { label: 'Preview build', time: '44s' },
];

const panelClass =
  'overflow-hidden rounded-xl border border-border/80 bg-muted/25 shadow-xs dark:bg-background/55';
const panelBarClass =
  'flex items-center gap-2 border-b border-border/70 bg-muted/40 px-3 py-2 dark:bg-foreground/[0.04]';

type BentoCardProps = {
  index: number;
  className?: string;
  children: ReactNode;
};

const BentoCard = ({ index, className, children }: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = cardRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.21), ease: 'easeOut' }}
      className={className}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className='group border-border/80 bg-card hover:border-foreground/20 relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 shadow-xs transition-colors duration-300 sm:p-6'
      >
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
          style={{
            background:
              'radial-gradient(480px circle at var(--spotlight-x, 50%) var(--spotlight-y, 0%), color-mix(in oklab, var(--foreground) 6%, transparent), transparent 45%)',
          }}
        />
        <div
          aria-hidden='true'
          className='via-foreground/15 pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent'
        />
        <div className='relative flex min-h-0 flex-1 flex-col'>{children}</div>
      </div>
    </motion.div>
  );
};

const StepLabel = ({ step, label }: { step: string; label: string }) => (
  <div className='flex items-center gap-2.5 font-mono text-[9px] font-medium uppercase'>
    <span className='border-border/80 bg-muted/30 text-foreground/60 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[5px] border px-1 text-[9px] leading-none tracking-[0.08em]'>
      {step}
    </span>
    <span className='text-muted-foreground tracking-[0.2em]'>{label}</span>
  </div>
);

const CodeLine = ({
  number,
  tone = 'context',
  children,
}: {
  number: number;
  tone?: 'context' | 'add' | 'remove' | 'flag';
  children: ReactNode;
}) => (
  <div
    className={cn(
      'relative flex items-start gap-2 px-2.5 font-mono text-[9px] leading-[1.5] sm:text-[10px]',
      tone === 'add' && 'bg-emerald-500/[0.07]',
      tone === 'remove' && 'bg-rose-500/[0.06]',
      tone === 'flag' &&
        'bg-amber-500/[0.09] before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-amber-500'
    )}
  >
    <span className='text-muted-foreground/40 w-4 shrink-0 text-right tabular-nums select-none'>
      {number}
    </span>
    <span
      className={cn(
        'w-2.5 shrink-0 text-center select-none',
        tone === 'add' && 'text-emerald-600 dark:text-emerald-400',
        tone === 'remove' && 'text-rose-600 dark:text-rose-400',
        tone === 'flag' && 'text-amber-600 dark:text-amber-400',
        tone === 'context' && 'text-transparent'
      )}
    >
      {tone === 'add' ? '+' : tone === 'remove' ? '−' : '·'}
    </span>
    <code
      className={cn(
        'min-w-0 flex-1 truncate',
        tone === 'context' ? 'text-muted-foreground' : 'text-foreground/80'
      )}
    >
      {children}
    </code>
  </div>
);

const ReviewPanel = () => (
  <div aria-hidden='true' className={cn(panelClass, 'flex min-h-0 flex-1 flex-col')}>
    {/* Pull request header */}
    <div className={cn(panelBarClass, 'justify-between py-2.5')}>
      <div className='flex min-w-0 items-center gap-2'>
        <GitPullRequest className='text-muted-foreground size-3.5 shrink-0' />
        <span className='truncate text-[11px] font-medium'>feat: workspace permissions</span>
        <span className='text-muted-foreground shrink-0 font-mono text-[9px]'>#482</span>
      </div>
      <span className='border-border/70 bg-background/60 text-muted-foreground shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[8px]'>
        +248 −36
      </span>
    </div>

    {/* Tabs */}
    <div className='border-border/60 text-muted-foreground/70 flex items-center gap-3 overflow-hidden border-b px-3.5 font-mono text-[8px] tracking-[0.1em] uppercase'>
      <span className='border-foreground text-foreground -mb-px border-b py-2'>Conversation</span>
      <span className='shrink-0'>
        Commits <span className='text-foreground/50'>4</span>
      </span>
      <span className='shrink-0'>
        Checks <span className='text-foreground/50'>4</span>
      </span>
      <span className='shrink-0'>
        Files <span className='text-foreground/50'>12</span>
      </span>
    </div>

    {/* Review */}
    <div className='flex min-h-0 flex-1 flex-col justify-between p-3.5'>
      <div>
        <div className='flex items-center gap-2'>
          <Image
            src='/purgeailogo.webp'
            alt=''
            width={16}
            height={16}
            className='ring-border/80 size-4 rounded-full ring-1'
          />
          <span className='text-[10px] font-medium'>PurgeAI</span>
          <span className='text-muted-foreground font-mono text-[8px]'>reviewed 12 files</span>
          <span className='text-muted-foreground/60 ml-auto font-mono text-[8px]'>2m ago</span>
        </div>

        <div className='border-border/60 bg-background/50 dark:bg-foreground/[0.02] mt-2.5 rounded-lg border px-2.5 py-2'>
          <div className='flex items-center gap-1.5'>
            <Sparkles className='text-muted-foreground/50 size-2.5' />
            <span className='text-muted-foreground/60 font-mono text-[7px] tracking-[0.14em] uppercase'>
              Review summary
            </span>
          </div>
          <p className='text-muted-foreground mt-1 text-[10px] leading-relaxed'>
            The role model is sound, but the delete path still trusts the client. I left three
            comments.
          </p>
        </div>

        <div className='mt-3 flex items-center justify-between gap-3'>
          <span className='text-[10px] font-medium'>3 findings before merge</span>
          <span className='shrink-0 rounded-full bg-rose-500/10 px-1.5 py-0.5 font-mono text-[7px] tracking-[0.1em] text-rose-600 uppercase dark:text-rose-400'>
            Changes requested
          </span>
        </div>

        <div className='mt-2 space-y-1.5'>
          {findings.map((finding) => {
            const style = severityStyles[finding.severity];

            return (
              <div
                key={finding.title}
                className='border-border/50 bg-background/40 dark:bg-foreground/[0.02] flex items-center gap-2.5 rounded-lg border px-2.5 py-2'
              >
                <span className={cn('size-1.5 shrink-0 rounded-full', style.dot)} />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-[10.5px] font-medium'>{finding.title}</p>
                  <p className='text-muted-foreground mt-0.5 truncate font-mono text-[8px]'>
                    {finding.file}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 font-mono text-[7px] tracking-[0.12em] uppercase',
                    style.text
                  )}
                >
                  {finding.label}
                </span>
                <ChevronRight className='text-muted-foreground/30 size-3 shrink-0' />
              </div>
            );
          })}
        </div>
      </div>

      <div className='border-border/50 bg-background/40 dark:bg-foreground/[0.02] mt-3 rounded-lg border px-2.5 py-2'>
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground/60 font-mono text-[7px] tracking-[0.14em] uppercase'>
            Files reviewed
          </span>
          <span className='text-muted-foreground/60 font-mono text-[8px]'>12</span>
        </div>
        <div className='mt-1.5 flex flex-wrap items-center gap-1'>
          {['workspace.ts', 'session.ts', 'avatar.tsx'].map((file) => (
            <span
              key={file}
              className='border-border/60 bg-muted/40 text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-[8px]'
            >
              {file}
            </span>
          ))}
          <span className='text-muted-foreground/50 px-0.5 font-mono text-[8px]'>+9 more</span>
        </div>
        <div className='border-border/50 text-muted-foreground/60 mt-2 flex items-center justify-between border-t pt-1.5 font-mono text-[7.5px]'>
          <span>4 commits</span>
          <span>3 findings</span>
          <span>38s</span>
        </div>
      </div>
    </div>

    {/* Checks */}
    <div className='border-border/60 text-muted-foreground flex items-center gap-3 overflow-hidden border-t px-3.5 py-2 font-mono text-[8px]'>
      {['tests', 'types', 'security', 'preview'].map((check) => (
        <span key={check} className='inline-flex shrink-0 items-center gap-1'>
          <Check className='size-2.5 text-emerald-500' />
          {check}
        </span>
      ))}
      <span className='text-muted-foreground/60 ml-auto shrink-0'>4/4</span>
    </div>

    {/* Merge state */}
    <div className='border-border/60 bg-muted/20 flex items-center justify-between gap-2 border-t px-3.5 py-2.5'>
      <span className='text-muted-foreground flex items-center gap-1.5 font-mono text-[8px]'>
        <CircleSlash2 className='size-3 text-rose-500' />
        merge blocked · 1 high finding
      </span>
      <span className='flex shrink-0 items-center gap-1 text-[9px] font-medium'>
        View review <ArrowUpRight className='size-3' />
      </span>
    </div>
  </div>
);

const DiffPreview = () => (
  <div aria-hidden='true'>
    <div className={panelClass}>
      <div className={cn(panelBarClass, 'py-2')}>
        <FileCode2 className='text-muted-foreground size-3 shrink-0' />
        <span className='text-muted-foreground truncate font-mono text-[8.5px]'>
          src/api/workspace.ts
        </span>
        <span className='ml-auto shrink-0 font-mono text-[8px] text-emerald-600 dark:text-emerald-400'>
          +18
        </span>
        <span className='shrink-0 font-mono text-[8px] text-rose-500'>−6</span>
      </div>
      <div className='py-1.5'>
        <CodeLine number={117} tone='remove'>
          export async function remove(id: string) {'{'}
        </CodeLine>
        <CodeLine number={117} tone='add'>
          export async function remove(id, userId: string) {'{'}
        </CodeLine>
        <CodeLine number={118} tone='add'>
          const ws = await db.workspace.findUnique({'{'} where: {'{'} id {'}'} {'}'});
        </CodeLine>
        <CodeLine number={121} tone='flag'>
          await db.workspace.delete({'{'} where: {'{'} id {'}'} {'}'});
        </CodeLine>
      </div>
    </div>

    <div className='mt-2 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-2.5 py-2'>
      <TriangleAlert className='mt-0.5 size-3 shrink-0 text-amber-600 dark:text-amber-400' />
      <div className='min-w-0'>
        <p className='text-foreground/90 text-[9.5px] leading-snug'>
          <span className='font-mono text-amber-700 dark:text-amber-400'>ws</span> is fetched, but
          never checked against <span className='font-mono'>userId</span>.
        </p>
        <p className='text-muted-foreground mt-0.5 font-mono text-[8px]'>
          src/api/workspace.ts:121 · high confidence
        </p>
      </div>
    </div>
  </div>
);

const CommentPreview = () => (
  <div aria-hidden='true' className={panelClass}>
    <div className={cn(panelBarClass, 'justify-between py-2')}>
      <div className='flex min-w-0 items-center gap-2'>
        <FileCode2 className='text-muted-foreground size-3 shrink-0' />
        <span className='text-muted-foreground truncate font-mono text-[8.5px]'>
          src/lib/auth/session.ts
        </span>
      </div>
      <span className='text-muted-foreground shrink-0 font-mono text-[8px]'>line 42</span>
    </div>

    <div className='py-1.5'>
      <CodeLine number={41}>const session = await getSession(req);</CodeLine>
      <CodeLine number={42} tone='flag'>
        await db.session.delete({'{'} where: {'{'} id: session.id {'}'} {'}'});
      </CodeLine>
    </div>

    <div className='border-border/60 bg-background/40 dark:bg-foreground/[0.02] border-t p-2.5'>
      <div className='flex items-center gap-1.5'>
        <Image
          src='/purgeailogo.webp'
          alt=''
          width={15}
          height={15}
          className='ring-border/80 size-[15px] rounded-full ring-1'
        />
        <span className='text-[9.5px] font-medium'>PurgeAI</span>
        <span className='text-muted-foreground font-mono text-[8px]'>on line 42</span>
        <span className='ml-auto shrink-0 font-mono text-[7px] tracking-[0.1em] text-rose-600 uppercase dark:text-rose-400'>
          High
        </span>
      </div>
      <p className='text-muted-foreground mt-1.5 text-[9.5px] leading-relaxed'>
        This signs out this device only. Other sessions stay valid — revoke them or rotate the
        token.
      </p>
      <div className='mt-1.5 flex items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/[0.06] px-1.5 py-1 font-mono text-[8px]'>
        <span className='shrink-0 text-emerald-600 dark:text-emerald-400'>+</span>
        <span className='text-foreground/80 truncate'>
          await db.session.deleteMany({'{'} where: {'{'} userId: session.userId {'}'} {'}'})
        </span>
      </div>
      <div className='mt-2 flex items-center gap-1.5'>
        <span className='bg-foreground text-background inline-flex h-6 items-center rounded-md px-2 text-[8px] font-medium'>
          Apply suggestion
        </span>
        <span className='border-border/70 text-muted-foreground inline-flex h-6 items-center rounded-md border px-2 text-[8px]'>
          Reply
        </span>
      </div>
    </div>
  </div>
);

const MergePanel = () => (
  <div aria-hidden='true' className={panelClass}>
    <div className={cn(panelBarClass, 'flex-wrap justify-between py-2 lg:px-5 lg:py-3')}>
      <div className='flex min-w-0 items-center gap-1.5 lg:gap-2.5'>
        <GitMerge className='text-muted-foreground size-3 shrink-0 lg:size-4' />
        <span className='text-muted-foreground truncate font-mono text-[8.5px] lg:text-[11px]'>
          feat/rbac-permissions
        </span>
        <ArrowRight className='text-muted-foreground/40 size-2.5 shrink-0 lg:size-3.5' />
        <span className='text-foreground shrink-0 font-mono text-[8.5px] lg:text-[11px]'>main</span>
      </div>
      <span className='inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[7.5px] tracking-[0.1em] text-emerald-700 uppercase lg:px-2.5 lg:py-1 lg:text-[9px] dark:text-emerald-300'>
        <Check className='size-2 lg:size-3' />
        Merged
      </span>
    </div>

    <div className='grid grid-cols-2 gap-x-5 gap-y-2 px-3 py-2.5 lg:gap-x-8 lg:gap-y-4 lg:px-5 lg:py-5'>
      {checks.map((check) => (
        <div key={check.label} className='flex items-center gap-1.5 text-[9px] lg:text-[11.5px]'>
          <Check className='size-2.5 shrink-0 text-emerald-500 lg:size-3.5' />
          <span className='text-muted-foreground truncate'>{check.label}</span>
          <span className='text-muted-foreground/50 ml-auto shrink-0 font-mono text-[8px] lg:text-[9.5px]'>
            {check.time}
          </span>
        </div>
      ))}
    </div>

    <div className='border-border/60 flex items-center justify-between gap-2 border-t bg-emerald-500/[0.04] px-3 py-2 lg:px-5 lg:py-3.5'>
      <div className='flex min-w-0 items-center gap-1.5 lg:gap-2.5'>
        <Image
          src='/purgeailogo.webp'
          alt=''
          width={15}
          height={15}
          className='ring-border/80 size-[15px] rounded-full ring-1 lg:size-5'
        />
        <span className='text-muted-foreground truncate text-[9px] lg:text-[11.5px]'>
          Approved by <span className='text-foreground'>PurgeAI</span>
        </span>
      </div>
      <span className='text-muted-foreground shrink-0 font-mono text-[8px] lg:text-[9.5px]'>
        4/4 · just now
      </span>
    </div>
  </div>
);

export const Bento = () => {
  return (
    <section
      id='features'
      aria-labelledby='features-heading'
      className='relative -mt-30 scroll-mt-24 py-20 md:py-24'
    >
      <MotionConfig reducedMotion='user'>
        <div className='mx-auto max-w-300 px-4 sm:px-6 lg:px-6 xl:px-0'>
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-end lg:gap-12'
          >
            <div>
              <p className='text-muted-foreground font-mono text-[10px] tracking-[0.22em] uppercase'>
                <span className='text-foreground/30'>//</span> The review pipeline
              </p>
              <h2
                id='features-heading'
                className='mt-5 text-3xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl'
              >
                From diff to <span className='text-muted-foreground'>done.</span>
              </h2>
            </div>
            <div className='lg:pb-1'>
              <p className='text-muted-foreground max-w-md text-sm leading-relaxed sm:text-base'>
                PurgeAI reads the change, writes the review, and lands the merge. Your team only
                shows up when it matters.
              </p>
              <Link
                href='/chat'
                className='group/link border-border/80 bg-background/60 hover:bg-accent mt-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors'
              >
                Try it on your next PR
                <ArrowUpRight className='size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
              </Link>
            </div>
          </motion.div>

          <div className='mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:grid-rows-[21.5rem_21.5rem_18rem] lg:gap-5'>
            <BentoCard index={0} className='md:col-span-2 lg:col-span-7 lg:row-span-2'>
              <StepLabel step='01' label='Review' />
              <h3 className='mt-4 text-2xl leading-tight font-semibold tracking-tight lg:text-3xl'>
                Not a summary. A review.
              </h3>
              <p className='text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed lg:text-[15px]'>
                It reads every changed file in context, then flags what would actually block the
                merge.
              </p>
              <div className='mt-6 flex min-h-0 flex-1 flex-col'>
                <ReviewPanel />
              </div>
            </BentoCard>

            <BentoCard index={1} className='lg:col-span-5'>
              <StepLabel step='02' label='Understand' />
              <h3 className='mt-4 text-xl leading-tight font-semibold tracking-tight lg:text-2xl'>
                The diff doesn&apos;t lie.
              </h3>
              <p className='text-muted-foreground mt-2 max-w-md text-sm leading-relaxed'>
                PurgeAI reasons over every changed line — and the code around it — not just the PR
                title.
              </p>
              <div className='mt-auto pt-4'>
                <DiffPreview />
              </div>
            </BentoCard>

            <BentoCard index={2} className='lg:col-span-5'>
              <StepLabel step='03' label='Comment' />
              <h3 className='mt-4 text-xl leading-tight font-semibold tracking-tight lg:text-2xl'>
                Comments that end the thread.
              </h3>
              <p className='text-muted-foreground mt-2 max-w-md text-sm leading-relaxed'>
                Feedback lands on the line — fix included.
              </p>
              <div className='mt-auto pt-4'>
                <CommentPreview />
              </div>
            </BentoCard>

            <BentoCard index={3} className='md:col-span-2 lg:col-span-12'>
              <div className='grid h-full lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:items-center lg:gap-10'>
                <div>
                  <StepLabel step='04' label='Merge' />
                  <h3 className='mt-3 text-2xl leading-tight font-semibold tracking-tight lg:text-[28px]'>
                    Green means merged.
                  </h3>
                  <p className='text-muted-foreground mt-2 max-w-md text-sm leading-relaxed'>
                    Passing checks get approved and landed automatically. Failing ones come back
                    with exactly what to fix.
                  </p>
                </div>
                <div className='mt-5 lg:mt-0'>
                  <MergePanel />
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
};
