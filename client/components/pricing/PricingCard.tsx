'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import NumberFlow from '@number-flow/react';
import { BadgeCheck } from 'lucide-react';
import { PricingTier } from '@/constants/price';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useIsSignedin, useSignBox } from '@/store/AuthStates';
import api from '@/lib/axios';
import { toast } from 'sonner';

type PricingCardtype = {
  tier: PricingTier;
  paymentFrequency: string;
};

export const PricingCard: FC<PricingCardtype> = ({ tier, paymentFrequency }) => {
  const price = tier.price[paymentFrequency];
  const isHighlighted = tier.highlighted as boolean;
  const isPopular = tier.popular;

  const { setOpen } = useSignBox();
  const [id, setId] = useState<any>();

  const router = useRouter();
  const { isSignedin } = useIsSignedin();

  const mut = useMutation({
    mutationFn: async (amount: number) => {
      const response = await api.post('/api/orderpay', { amount });
      return response.data;
    },
    onSuccess: (data) => setId(data),
    onError(error) {
      console.log('error is', error);
    },
  });

  const handlePurchase = (amount: number | string) => {
    if (price == 'Free') {
      isSignedin ? router.push('/chat') : router.push('/');
    } else if (price == 'Custom') {
      window.open(
        'https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com&su=Custom%20Purchase%20Subscription'
      );
    } else if (!isSignedin) {
      setOpen(true);
    } else {
      mut.mutate(amount as number);
    }
  };

  useEffect(() => {
    if (id) {
      console.log('is is', id);
    }
  }, [id]);

  return (
    <div
      className={cn(
        'relative mx-6 flex flex-col gap-7 overflow-hidden rounded-2xl border p-6 shadow lg:mx-0',
        isHighlighted ? 'bg-foreground text-background' : 'bg-background text-foreground',
        isPopular && 'outline outline-[rgba(120,119,198)]'
      )}
    >
      {/* Background Decoration */}
      {isHighlighted && <HighlightedBackground />}
      {isPopular && <PopularBackground />}

      {/* Card Header */}
      <h2 className="flex items-center gap-3 text-[24px] font-medium">
        {tier.name}
        {isPopular && (
          <Badge className="bg-fuchsia-800 px-[6px] py-[1px] text-white">🔥Popular</Badge>
        )}
      </h2>

      {/* Price Section */}
      <div className="relative h-12">
        {typeof price === 'number' ? (
          <>
            <NumberFlow
              format={{
                style: 'currency',
                currency: 'USD',
                trailingZeroDisplay: 'stripIfInteger',
              }}
              value={price}
              className="text-4xl font-medium"
            />
            <p className="-mt-2 text-xs font-medium">Per month/user</p>
          </>
        ) : (
          <h1 className="text-4xl font-medium">{price}</h1>
        )}
      </div>

      {/* Features */}
      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-medium">{tier.description}</h3>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                isHighlighted ? 'text-background' : 'text-foreground/60'
              )}
            >
              <BadgeCheck strokeWidth={1} size={16} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Call to Action Button */}
      <Button
        variant="default"
        onClick={() => {
          if (tier.cta == 'Coming Soon') {
            toast.error('Coming Soon');
          } else {
            handlePurchase(price);
          }
        }}
        className={cn(
          'relative z-10 h-fit w-full cursor-pointer rounded-lg',
          isHighlighted && 'bg-accent text-foreground hover:bg-accent/95 cursor-pointer'
        )}
      >
        {tier.cta}
      </Button>
    </div>
  );
};

// Highlighted Background Component
const HighlightedBackground = () => (
  <div className="absolute inset-0 z-0 opacity-100 dark:opacity-30" />
);

// Popular Background Component
const PopularBackground = () => (
  <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
);
