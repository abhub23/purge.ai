import {
  GitMerge,
  BotMessageSquare,
  TerminalSquare,
  Shield,
} from 'lucide-react';

type FeatureTypes = {
  icon: React.ElementType;
  title: string;
  desc: string;
  badge: string;
};

export const features: FeatureTypes[] = [
  {
    icon: GitMerge,
    title: 'Approves & Flags',
    desc: 'PurgeAI doesn’t just review it handles the merge. Approves passing checks, flags failing ones, and lands your PR the moment everything turns green.',
    badge: 'Zero Effort',
  },
  {
    icon: BotMessageSquare,
    title: 'Reads the diff, not the title',
    desc: 'It actually reasons over every changed file spotting logic errors, edge cases, and conflicts reviewers scroll past.',
    badge: 'Deep Review',
  },
  {
    icon: TerminalSquare,
    title: 'Inline comments make sense',
    desc: 'Actionable, right on the exact line, in an agenda so you can act and merge instead of playing 20 questions.',
    badge: 'Actionable',
  },
  {
    icon: Shield,
    title: 'Ships without the drama',
    desc: 'Pinpoint review summaries mean PRs stop being a bottleneck. Your team moves, main stays clean, and no one burns a day arguing over a semicolon.',
    badge: 'Zero Drama',
  },
];
