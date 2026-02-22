'use client' 

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { features } from '@/constants/features';
import { motion } from 'motion/react';
import { Inview } from '@/animations/Animation';

export const Features = () => {
  // Define grid layout: first 2 cards span 3 columns, next 3 cards span 2 columns each
  const getCardClasses = (index: number) => {
    const baseClasses = 'relative h-full overflow-hidden transition-all delay-50 hover:scale-101 hover:shadow-lg flex flex-col';
    const gridClasses = index < 2 
      ? 'md:col-span-1 lg:col-span-3' 
      : 'md:col-span-1 lg:col-span-2';
    
    return { baseClasses, gridClasses };
  };

  const getTextSizes = (index: number) => {
    return index < 2 
      ? {
          badge: 'text-xs md:text-sm',
          title: 'text-lg md:text-xl lg:text-2xl',
          desc: 'w-full text-sm md:text-base lg:text-lg',
          padding: 'p-6'
        }
      : {
          badge: 'text-xs md:text-sm',
          title: 'text-lg md:text-lg lg:text-xl',
          desc: 'w-full text-sm md:text-base',
          padding: 'p-5'
        };
  };
  
  return (
    <section className='mt-[-120px] py-24 md:py-32'>
      <motion.div {...Inview} className='mx-auto flex max-w-[980px] flex-col items-center space-y-4 text-center'>
        <Badge variant='secondary' className='border py-1'>
          Features
        </Badge>
        <motion.h2 className='mx-2 text-3xl leading-tight font-bold tracking-tighter lg:text-5xl'>
          Everything you need to know for building amazing SaaS products
        </motion.h2>
        <p className='text-muted-foreground lg:max-w-[800px] mx-2 text-[15px] lg:text-lg'>
          Our platform provides all the tools and features you need to create exceptional Products
        </p>
      </motion.div>
      
      <div className='mx-2 mt-16 max-w-[1200px] lg:mx-auto'>
        <div className='grid auto-rows-[18rem] gap-6 md:grid-cols-2 lg:grid-cols-6'>
          {features.map((feature, index) => {
            const { baseClasses, gridClasses } = getCardClasses(index);
            const sizes = getTextSizes(index);
            
            return (
              <motion.div key={index} {...Inview} className={gridClasses}>
                <Card className={`${baseClasses} ${sizes.padding}`}>
                  <CardHeader className='pb-2'>
                    <div className='flex items-center space-x-2'>
                      <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-lg border'>
                        {React.createElement(feature.icon, { className: 'text-foreground h-5 w-5' })}
                      </div>
                      <Badge variant='outline' className={sizes.badge}>
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className={sizes.title}>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='mt-auto pt-0'>
                    <CardDescription className={sizes.desc}>
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};