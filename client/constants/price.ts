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
      'Free 10 credits',
      'Indepth Knowledge of PRs',
      'Automatic data enrichment',
      '10 monitors',
      'Up to 3 seats',
    ],
    cta: 'Get started',
  },
  {
    id: 'individuals',
    name: 'Individuals',
    price: {
      monthly: 8,
      yearly: 6,
    },
    description: 'Great for small Saas',
    features: [
      'Unlimited phone calls',
      '30 second checks',
      'Single-user account',
      '20 monitors',
      'Up to 6 seats',
    ],
    cta: 'Purchase Plan',
    popular: true,
  },
  {
    id: 'teams',
    name: 'Teams',
    price: {
      monthly: 12,
      yearly: 10,
    },
    description: 'Great for large businesses',
    features: [
      'Unlimited phone calls',
      '15 second checks',
      'Single-user account',
      '50 monitors',
      'Up to 10 seats',
    ],
    cta: 'Coming Soon',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'Great For multiple teams',
    features: [
      'Everything in Organizations',
      'Up to 5 team members',
      '100 monitors',
      '15 status pages',
      '200+ integrations',
    ],
    cta: 'Contact Us',
    highlighted: true,
  },
];
