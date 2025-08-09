import {
  Code,
  FileText,
  Database,
  Zap,
  Settings,
  Users,
  BarChart3,
  MessageSquare,
} from 'lucide-react';

type CategoryType = {
  value: string;
  label: string;
  icon: React.ElementType;
};

export const categories: CategoryType[] = [
  { value: 'code-review', label: 'Code Review', icon: Code },
  { value: 'documentation', label: 'Documentation', icon: FileText },
  { value: 'database', label: 'Database', icon: Database },
  { value: 'api', label: 'API Design', icon: Zap },
  { value: 'testing', label: 'Testing', icon: Settings },
  { value: 'deployment', label: 'Deployment', icon: Users },
  { value: 'analytics', label: 'Analytics', icon: BarChart3 },
  { value: 'general', label: 'General', icon: MessageSquare },
];

export const priorities: Record<string, string>[] = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'urgent', label: 'Urgent' },
];

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    case 'medium':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'high':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'urgent':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const Midfooter: Record<string, string>[] = [
  { name: 'Analyze PR', do: 'Analyze this PR: ' },
  { name: 'Code Review', do: 'Review code changes in: ' },
  { name: 'Documentation', do: 'Generate documentation for: ' },
];
