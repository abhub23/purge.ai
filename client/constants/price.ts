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
    id: 'pro',
    name: 'Pro',
    price: {
      monthly: 8,
      yearly: 6,
    },
    description: 'Great for small Saas',
    features: [
      '1000 Prompt Credits',
      '30 second checks',
      'Single-user account',
      '20 monitors',
      'Up to 6 seats',
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
    description: 'Great For teams',
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
