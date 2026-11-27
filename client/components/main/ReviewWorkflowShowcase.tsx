'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
} from 'motion/react';
import {
  Bot,
  Check,
  CircleDot,
  Code2,
  FileCode2,
  GitMerge,
  GitPullRequest,
  Layers,
  Shield,
  Sparkles,
  Terminal,
  TriangleAlert,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

type ReviewTile = {
  label: string;
  icon: LucideIcon;
};

type ReviewStage = {
  id: string;
  label: string;
  title: string;
  description: string;
  tiles: ReviewTile[];
};

const reviewStages: ReviewStage[] = [
  {
    id: 'review',
    label: 'PR review',
    title: 'Every pull request gets a thoughtful first review.',
    description:
      'PurgeAI reads the full diff in context and surfaces actionable bugs, security gaps, and risky edge cases.',
    tiles: [
      { label: 'Security issues', icon: Shield },
      { label: 'Bug detection', icon: TriangleAlert },
      { label: 'Code quality', icon: Code2 },
      { label: 'Risky changes', icon: CircleDot },
      { label: 'Inline comments', icon: GitPullRequest },
      { label: 'Severity ranking', icon: Sparkles },
      { label: 'PR summary', icon: FileCode2 },
      { label: 'Review history', icon: Bot },
    ],
  },
  {
    id: 'context',
    label: 'Code context',
    title: 'A review that sees beyond the diff.',
    description:
      'Related files, existing patterns, and repository history help every finding make sense in your codebase.',
    tiles: [
      { label: 'Changed files', icon: FileCode2 },
      { label: 'Related code', icon: Code2 },
      { label: 'Call paths', icon: Workflow },
      { label: 'Ownership', icon: Bot },
      { label: 'Test coverage', icon: Check },
      { label: 'Dependencies', icon: Layers },
      { label: 'Git history', icon: Terminal },
      { label: 'Repository map', icon: CircleDot },
    ],
  },
  {
    id: 'fixes',
    label: 'Suggested fixes',
    title: 'Go from finding to fix, faster.',
    description:
      'Get clear feedback with a concrete next step, including suggested changes right where the issue appears.',
    tiles: [
      { label: 'Suggested patches', icon: Sparkles },
      { label: 'Inline diffs', icon: FileCode2 },
      { label: 'Safe refactors', icon: Code2 },
      { label: 'Test updates', icon: Check },
      { label: 'One-click apply', icon: GitPullRequest },
      { label: 'Code suggestions', icon: Terminal },
      { label: 'Fix validation', icon: CircleDot },
      { label: 'Review threads', icon: Bot },
    ],
  },
  {
    id: 'merge',
    label: 'Merge readiness',
    title: 'Know when a pull request is ready.',
    description:
      'Bring review feedback and check results together so your team can move forward with confidence.',
    tiles: [
      { label: 'Unit tests', icon: Check },
      { label: 'Type checks', icon: Code2 },
      { label: 'Security scan', icon: Shield },
      { label: 'Build status', icon: Workflow },
      { label: 'Review complete', icon: GitPullRequest },
      { label: 'No blockers', icon: CircleDot },
      { label: 'Auto approval', icon: Bot },
      { label: 'Ready to merge', icon: GitMerge },
    ],
  },
];

export default function ReviewWorkflowShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currentStage = reviewStages[activeTab];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % reviewStages.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + reviewStages.length) % reviewStages.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = reviewStages.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <MotionConfig reducedMotion='user'>
      <motion.section
        aria-label='PurgeAI review workflow'
        className='relative mx-auto w-full max-w-280 px-4 py-10 sm:px-6 lg:-mt-24 lg:pt-4 lg:pb-12'
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
          <div
            aria-label='PurgeAI workflow'
            className='grid grid-cols-2 gap-1 border-b border-border/70 p-1.5 sm:grid-cols-4'
            role='tablist'
          >
            {reviewStages.map((stage, index) => {
              const isActive = activeTab === index;

              return (
                <button
                  key={stage.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`review-tab-${stage.id}`}
                  aria-controls={`review-panel-${stage.id}`}
                  aria-selected={isActive}
                  className={`relative flex min-h-9 cursor-pointer items-center justify-center rounded-lg px-2 py-1.5 text-[10px] font-medium tracking-wide uppercase transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:min-h-10 sm:text-xs ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:bg-[#f4f3ef] hover:text-foreground dark:hover:bg-[#222221]'
                  }`}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  role='tab'
                  tabIndex={isActive ? 0 : -1}
                  type='button'
                >
                  {isActive && (
                    <motion.span
                      aria-hidden='true'
                      className='bg-[#e9e7e1] absolute inset-0 rounded-lg shadow-sm dark:bg-[#1d1d1c]'
                      layoutId='review-tab-highlight'
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className='relative inline-flex p-1'>{stage.label}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`review-panel-${currentStage.id}`}
            aria-labelledby={`review-tab-${currentStage.id}`}
            className='px-4 py-5 sm:px-6 sm:py-6 lg:px-8'
            role='tabpanel'
            tabIndex={0}
          >
            <AnimatePresence mode='wait' initial={false}>
              <motion.div
                key={currentStage.id}
                className='grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-8'
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div>
                  <h2 className='max-w-sm text-xl leading-snug font-medium tracking-tight sm:text-2xl'>
                    {currentStage.title}
                  </h2>
                  <p className='text-muted-foreground mt-2.5 max-w-md text-xs leading-relaxed sm:text-sm'>
                    {currentStage.description}
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                  {currentStage.tiles.map((tile, index) => {
                    const Icon = tile.icon;

                    return (
                      <motion.div
                        key={tile.label}
                        className='border-border/70 bg-background/60 flex min-h-14 items-center justify-center gap-1.5 rounded-lg border px-1.5 py-2 text-center transition-colors hover:bg-muted/50 sm:min-h-[72px] sm:flex-col sm:gap-1'
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.025, duration: 0.18 }}
                      >
                        <Icon aria-hidden='true' className='text-foreground/80 size-4 shrink-0' />
                        <span className='text-muted-foreground text-[10px] sm:text-[11px]'>
                          {tile.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}
