'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import NumberFlow from '@number-flow/react';
import { BadgeCheck } from 'lucide-react';
import { PricingTier } from '@/constants/price';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useIsSignedin } from '@/store/AuthStates';
import api from '@/lib/axios';
import { toast } from 'sonner';

type PricingCardtype = {
  tier: PricingTier;
  paymentFrequency: string;
};

export const PricingCard: FC<PricingCardtype> = ({ tier, paymentFrequency }) => {
  const price = tier.price[paymentFrequency];
  const plan_id = tier.id;
  const isPopular = tier.popular;

  const router = useRouter();
  const { isSignedin } = useIsSignedin();

  type CreateOrderVariables = { plan_id: string; price: number };

  const loadRazorpay = () =>
    new Promise<void>((resolve, reject) => {
      if ((window as any).Razorpay) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay'));
      document.body.appendChild(script);
    });

  const { mutate } = useMutation<any, Error, CreateOrderVariables>({
    mutationFn: async ({ plan_id, price }) => {
      const response = await api.post('/api/orderpay', { plan_id, price });
      return response.data.order;
    },
    onSuccess: async (order) => {
      try {
        await loadRazorpay();
      } catch (err) {
        console.error('Razorpay could not be loaded', err);
        toast.error('Unable to load payment gateway. Please try again.');
        return;
      }
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
    switch (plan_id) {
      case 'free':
        router.push(isSignedin ? '/chat' : '/');
        break;
      default:
        if (!isSignedin) {
          router.push('/login');
        } else if (typeof price === 'number') {
          mutate({ plan_id, price });
        }
        break;
    }
  };

  return (
    <div
      className='bg-background text-foreground relative mx-6 flex flex-col gap-7 overflow-hidden rounded-2xl border px-6 py-10 shadow lg:mx-0'
    >
      {/* Background Decoration */}
      {isPopular && <PopularBackground />}

      {/* Card Header */}
      <h2 className='flex items-center gap-3 text-[26px] font-medium'>{tier.name}</h2>

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
            <span className='text-foreground/60 text-sm'>/month</span>
          </>
        ) : (
          <h1 className='text-4xl font-medium'>{price}</h1>
        )}
      </div>

      {/* Features */}
      <div className='flex-1 space-y-2'>
        <h3 className='text-sm font-medium'>{tier.description}</h3>
        <ul className='space-y-3'>
          {tier.features.map((feature, index) => (
            <li
              key={index}
              className='text-foreground/60 flex items-center gap-2 text-sm font-medium'
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
        className='relative z-10 h-fit w-full cursor-pointer rounded-lg'
      >
        {tier.cta}
      </Button>
    </div>
  );
};

// Popular Background Component
const PopularBackground = () => (
  <div className='absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.06),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))]' />
);
