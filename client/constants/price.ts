export const PAYMENT_FREQUENCIES = ['monthly', 'yearly'];

export interface PricingTier {
  name: string;
  id: string;
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free Tier',
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: 'For your hobby projects',
    features: [
      'Free 20 Prompt Credits',
      'Indepth Knowledge of PRs',
      'Limited access to Insights',
      'Limited access to Modes',
      'Basic Models results and review',
    ],
    cta: 'Get started',
  },

  {
    id: 'pro',
    name: 'Pro Tier',
    price: {
      monthly: 8,
      yearly: 6,
    },
    description: 'Great for small Saas',
    features: [
      '1000 Prompt Credits',
      'Indepth Knowledge of PRs',
      'Full access to all Insights',
      'Full access to all Modes ',
      'Pro Models results and review',
    ],
    cta: 'Purchase Plan',
    popular: true,
  },
];
