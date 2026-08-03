import {
  Code,
  FileText,
  BarChart3,
  MessageSquare,
  List,
  GitPullRequestArrow,
  Lightbulb,
  Search,
} from 'lucide-react';

type InsightType = {
  value: string;
  label: string;
  icon: React.ElementType;
};

type ModeType = {
  value: string;
  label: string;
  icon: React.ElementType;
};

export const insights: InsightType[] = [
  { value: 'general', label: 'General', icon: MessageSquare },
  { value: 'code-review', label: 'Code Review', icon: Code },
  { value: 'documentation', label: 'Documentation', icon: FileText },
  { value: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export const mode: ModeType[] = [
  { value: 'summary', label: 'Summary', icon: List },
  { value: 'reviewer', label: 'Reviewer', icon: GitPullRequestArrow },
  { value: 'explainer', label: 'Explainer', icon: Lightbulb },
  { value: 'deepdive', label: 'Deep Dive', icon: Search },
];

export const Midfooter: Record<string, string>[] = [
  { name: 'Analyze PR', do: 'Analyze this PR: ' },
  { name: 'Code Review', do: 'Review code changes in: ' },
  { name: 'Documentation', do: 'Generate documentation for: ' },
];
