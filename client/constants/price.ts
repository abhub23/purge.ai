export const PAYMENT_FREQUENCIES = ['monthly', 'yearly'];

export interface PricingTier {
  name: string;
  id: string;
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  popular?: boolean;
}

export const TIERS: PricingTier[] = [
  {
    id: 'trial',
    name: 'Trial Tier',
    price: {
      monthly: 'Free',
      yearly: 'Free',
    },
    description: 'For your hobby projects',
    features: [
      'Free 20 Prompt Credits',
      'Indepth Knowledge of PRs',
      'Limited access to Insights',
      'Limited access to Modes',
      'Basic Models results and review'
    ],
    cta: 'Get started',
  },

  {
    id: 'pro',
    name: 'Pro',
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

  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'Great For Enterprise product',
    features: [
      'Unlimited Prompt Credits',
      'Indepth Knowledge of PRs',
      'Unlimited access to all Insights',
      'Unlimited access to all Modes ',
      'Premium Models results and review',
    ],
    cta: 'Contact Us',
    highlighted: true,
  },
];
