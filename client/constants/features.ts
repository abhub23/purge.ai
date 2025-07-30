import { Zap, Shield, Terminal, Code, BotMessageSquare, Smartphone } from 'lucide-react';

type FeatureTypes = {
    icon: React.ElementType;
    title: string;
    desc: string;
    badge: string
}
export const features: FeatureTypes[] = [
    {
        icon: Zap,
        title: 'Blazingly Fast',
        desc: 'Built with performance in mind. Your users will love the speed.',
        badge: 'Performance',
    },
    {
        icon: Shield,
        title: 'Secure by Default',
        desc: 'Enterprise-grade security features built for each User and Prompts.',
        badge: 'Security',
    },
    {
        icon: Terminal,
        title: 'Customizable',
        desc: 'Easily customize colors, fonts, and layouts to match your brand.',
        badge: 'Prompt',
    },
    {
        icon: Code,
        title: 'Developer Friendly',
        desc: 'Clean Model output APIs and excellent support for better DX.',
        badge: 'Dev Ex',
    },
    {
        icon: BotMessageSquare,
        title: 'SEO Optimized',
        desc: 'Built-in SEO best practices to help your site rank better.',
        badge: 'SEO',
    },
    {
        icon: Smartphone,
        title: 'Mobile First',
        desc: 'Responsive design that works perfectly on all devices.',
        badge: 'Mobile',
    },
];