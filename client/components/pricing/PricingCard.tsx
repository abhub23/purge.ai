'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import NumberFlow from '@number-flow/react';
import { BadgeCheck } from 'lucide-react';
import { PricingTier } from '@/constants/price';
import { useRouter } from 'next/navigation';
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
  const plan_id = tier.id;
  const isHighlighted = tier.highlighted as boolean;
  const isPopular = tier.popular;

  const { setOpen } = useSignBox();

  const router = useRouter();
  const { isSignedin } = useIsSignedin();

  type CreateOrderVariables = { plan_id: string; price: number };

  const { mutate } = useMutation<any, Error, CreateOrderVariables>({
    mutationFn: async ({ plan_id, price }) => {
      const response = await api.post('/api/orderpay', { plan_id, price });
      return response.data.order;
    },
    onSuccess: async (order) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'PurgeAI',
        description: 'PurgeAi Payment',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            await api.post('/api/verifypayment', {
              ...response,
              orderId: order.id,
            });
            alert('Payment successful!');
          } catch (err) {
            console.error('Verification failed', err);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    },
    onError: (err) => {
      console.error('Order creation failed', err);
      toast.error('Order creation failed');
    },
  });

  const handlePurchase = (plan_id: string, price: number | string) => {
    if (plan_id == 'trial') {
      isSignedin ? router.push('/chat') : router.push('/');
    } else if (plan_id == 'enterprise') {
      window.open(
        'https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com&su=Custom%20Purchase%20Subscription'
      );
    } else if (!isSignedin) {
      setOpen(true);
    } else {
      if (typeof price === 'number') {
        mutate({ plan_id, price });
      }
    }
  };

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
      <h2 className='flex items-center gap-3 text-[24px] font-medium'>
        {tier.name}
        {isPopular && (
          <Badge className='bg-fuchsia-800 px-[6px] py-[1px] text-white'>🔥Popular</Badge>
        )}
      </h2>

      {/* Price Section */}
      <div className='relative h-12'>
        {typeof price === 'number' ? (
          <>
            <NumberFlow
              format={{
                style: 'currency',
                currency: 'USD',
                trailingZeroDisplay: 'stripIfInteger',
              }}
              value={price}
              className='text-4xl font-medium'
            />
          </>
        ) : (
          <h1 className='text-4xl font-medium'>{price}</h1>
        )}
      </div>

      {/* Features */}
      <div className='flex-1 space-y-2'>
        <h3 className='text-sm font-medium'>{tier.description}</h3>
        <ul className='space-y-2'>
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
        variant='default'
        onClick={() => {
          if (tier.cta == 'Coming Soon') {
            toast.error('Coming Soon');
          } else {
            handlePurchase(plan_id, price);
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
  <div className='absolute inset-0 z-0 opacity-100 dark:opacity-30' />
);

// Popular Background Component
const PopularBackground = () => (
  <div className='absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]' />
);
