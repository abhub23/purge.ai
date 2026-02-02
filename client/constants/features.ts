import { Zap, Shield, Terminal, Code, BotMessageSquare, Smartphone } from 'lucide-react';

type FeatureTypes = {
  icon: React.ElementType;
  title: string;
  desc: string;
  badge: string;
};
export const features: FeatureTypes[] = [
  {
    icon: Zap,
    title: 'Blazingly Fast',
    desc: 'Experience lightning-fast performance with optimized algorithms and instant response times for maximum productivity. Our platform delivers unparalleled speed.',
    badge: 'Performance',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    desc: 'Enterprise-grade security with end-to-end encryption and advanced threat protection for complete data safety. Your information remains protected.',
    badge: 'Security',
  },
  {
    icon: Terminal,
    title: 'Customizable',
    desc: 'Fully customizable interface with flexible modes and personalized insights tailored to your unique workflow needs.',
    badge: 'Prompt',
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    desc: 'Clean APIs, comprehensive documentation, and excellent developer experience for seamless integration.',
    badge: 'Dev Ex',
  },
  {
    icon: BotMessageSquare,
    title: 'Optimized Context',
    desc: 'Advanced context management for lengthy conversations and deep research with intelligent content optimization.',
    badge: 'SEO',
  },

];
