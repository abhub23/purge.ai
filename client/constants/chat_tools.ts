import { Code, FileText, BarChart3, MessageSquare } from 'lucide-react';

type InsightType = {
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

export const mode: Record<string, string>[] = [
  { value: 'summary', label: 'Summary Mode' },
  { value: 'reviewer', label: 'Reviewer Mode' },
  { value: 'explainer', label: 'Explainer Mode' },
  { value: 'deepdive', label: 'Deep Dive Mode' },
];

export const getModeColor = (priority: string) => {
  switch (priority) {
    case 'summary':
      return 'bg-slate-100 text-slate-700';
    case 'reviewer':
      return 'bg-blue-100 text-blue-700';
    case 'explainer':
      return 'bg-orange-100 text-orange-700';
    case 'deepdive':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const Midfooter: Record<string, string>[] = [
  { name: 'Analyze PR', do: 'Analyze this PR: ' },
  { name: 'Code Review', do: 'Review code changes in: ' },
  { name: 'Documentation', do: 'Generate documentation for: ' },
];
