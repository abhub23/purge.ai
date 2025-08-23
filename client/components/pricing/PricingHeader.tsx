import { Tab } from '@/components/ui/tab';
import { FC } from 'react';

type Headertype = {
  title: string;
  subtitle: string;
  frequencies: string[];
  selectedFrequency: string;
  onFrequencyChange: (frequency: string) => void;
};

export const PricingHeader: FC<Headertype> = ({
  title,
  subtitle,
  frequencies,
  selectedFrequency,
  onFrequencyChange,
}) => (
  <div className='space-y-7 text-center'>
    <div className='space-y-4'>
      <h1 className='text-4xl font-medium lg:text-5xl'>{title}</h1>
      <p className='mx-2'>{subtitle}</p>
    </div>
    <div className='mx-auto flex w-fit rounded-full bg-[#F3F4F6] p-1 dark:bg-[#222]'>
      {frequencies.map((freq) => (
        <Tab
          key={freq}
          text={freq}
          selected={selectedFrequency === freq}
          setSelected={onFrequencyChange}
          discount={freq === 'yearly'}
        />
      ))}
    </div>
  </div>
);
