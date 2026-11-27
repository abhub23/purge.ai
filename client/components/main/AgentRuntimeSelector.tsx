'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  Bot,
  Boxes,
  Clock3,
  Code2,
  Container,
  Cpu,
  Globe2,
  Layers,
  Monitor,
  Play,
  Sparkles,
  Terminal,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

type RuntimeOption = {
  label: string;
  icon: LucideIcon;
};

const runtimeTabs = [
  {
    id: 'harnesses',
    label: 'Agent harnesses',
    title: 'Choose your agent harness.',
    description:
      'Bring the tools and runtimes your team already uses. Each workspace stays isolated and ready for the task.',
    options: [
      { label: 'Hermes', icon: Bot },
      { label: 'OpenClaw', icon: Sparkles },
      { label: 'Claude Code', icon: Terminal },
      { label: 'Codex', icon: Code2 },
      { label: 'OpenCode', icon: Cpu },
      { label: 'Grok', icon: Workflow },
      { label: 'Pi', icon: Play },
      { label: 'Your harness', icon: Layers },
    ],
  },
  {
    id: 'jobs',
    label: 'Background jobs',
    title: 'Run work in the background.',
    description:
      'Schedule recurring tasks or trigger jobs from the events and workflows your team depends on.',
    options: [
      { label: 'Scheduled runs', icon: Clock3 },
      { label: 'GitHub Actions', icon: Workflow },
      { label: 'Webhooks', icon: Play },
      { label: 'Task queues', icon: Boxes },
      { label: 'Cron jobs', icon: Clock3 },
      { label: 'CI pipelines', icon: Workflow },
      { label: 'Retry workers', icon: Cpu },
      { label: 'Your workflow', icon: Layers },
    ],
  },
  {
    id: 'desktop',
    label: 'Desktop & browser',
    title: 'Give agents a real browser.',
    description:
      'Use isolated browser and desktop sessions to explore, test, and verify work in a familiar environment.',
    options: [
      { label: 'Chromium', icon: Globe2 },
      { label: 'Playwright', icon: Play },
      { label: 'Browser session', icon: Monitor },
      { label: 'Desktop VM', icon: Monitor },
      { label: 'Firefox', icon: Globe2 },
      { label: 'Screenshots', icon: Layers },
      { label: 'Computer use', icon: Cpu },
      { label: 'Your browser', icon: Bot },
    ],
  },
  {
    id: 'containers',
    label: 'Docker containers',
    title: 'Bring your own container.',
    description:
      'Run tasks in reproducible environments with the language, tools, and dependencies you need.',
    options: [
      { label: 'Node.js', icon: Code2 },
      { label: 'Python', icon: Terminal },
      { label: 'Bun', icon: Cpu },
      { label: 'Go', icon: Code2 },
      { label: 'Dockerfile', icon: Container },
      { label: 'Custom image', icon: Boxes },
      { label: 'Isolated task', icon: Layers },
      { label: 'Your image', icon: Container },
    ],
  },
] satisfies {
  id: string;
  label: string;
  title: string;
  description: string;
  options: RuntimeOption[];
}[];

export default function AgentRuntimeSelector() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currentTab = runtimeTabs[activeTab];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % runtimeTabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + runtimeTabs.length) % runtimeTabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = runtimeTabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      aria-label='Agent runtime options'
      className='relative z-10 mx-auto w-full max-w-280 px-4 sm:px-6 lg:px-6 xl:px-0'
    >
      <div className='overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm'>
        <div
          aria-label='Runtime categories'
          className='grid grid-cols-2 gap-1 border-b border-border/70 p-1 sm:grid-cols-4'
          role='tablist'
        >
          {runtimeTabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`runtime-tab-${tab.id}`}
              aria-controls={`runtime-panel-${tab.id}`}
              aria-selected={activeTab === index}
              className={`min-h-9 rounded-lg px-2 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors sm:min-h-10 sm:text-sm ${
                activeTab === index
                  ? 'bg-[#e9e7e1] text-foreground shadow-sm dark:bg-[#1d1d1c]'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              }`}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              role='tab'
              tabIndex={activeTab === index ? 0 : -1}
              type='button'
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          id={`runtime-panel-${currentTab.id}`}
          aria-labelledby={`runtime-tab-${currentTab.id}`}
          className='grid gap-5 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-8 lg:px-8'
          role='tabpanel'
          tabIndex={0}
        >
          <div>
            <h2 className='text-xl font-medium tracking-tight sm:text-2xl'>
              {currentTab.title}
            </h2>
            <p className='text-muted-foreground mt-2.5 max-w-md text-xs leading-relaxed sm:text-sm'>
              {currentTab.description}
            </p>
          </div>

          <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
            {currentTab.options.map((option) => {
              const Icon = option.icon;

              return (
                <div
                  key={option.label}
                  className='flex min-h-14 items-center justify-center gap-1.5 rounded-lg border border-border/70 bg-background/60 px-1.5 py-2 text-center transition-colors hover:bg-muted/50 sm:min-h-[72px] sm:flex-col sm:gap-1'
                >
                  <Icon aria-hidden='true' className='size-4 shrink-0 text-foreground/80' />
                  <span className='text-muted-foreground text-[10px] sm:text-[11px]'>
                    {option.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
