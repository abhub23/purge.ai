'use client' 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { features } from '@/constants/features';
import {motion} from 'motion/react'
import { Inview } from '@/animations/Animation';

export const Features = () => {
  return (
    <section className='mt-[-120px] py-24 md:py-32'>
      <motion.div {...Inview} className='mx-auto flex max-w-[980px] flex-col items-center space-y-4 text-center'>
        <Badge variant='secondary' className='border py-1'>
          Features
        </Badge>
        <motion.h2 className='mx-2 text-3xl leading-tight font-bold tracking-tighter lg:text-5xl'>
          Everything you need to know for building amazing SaaS products
        </motion.h2>
        <p className='text-muted-foreground lg:-w-[800px] mx-2 text-[15px] lg:text-lg'>
          Our platform provides all the tools and features you need to create exceptional Products
        </p>
      </motion.div>
      <div className='mx-2 mt-16 grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:mx-auto lg:grid-cols-3'>
        {features.map((feature, index) => (
          <motion.div {...Inview} key={index}>
          <Card className='relative overflow-hidden p-5 transition-all delay-50 hover:scale-101 hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center space-x-2'>
                <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-lg border'>
                  <feature.icon className='text-foreground h-5 w-5' />
                </div>
                <Badge variant='outline'>{feature.badge}</Badge>
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='w-full text-base'>{feature.desc}</CardDescription>
            </CardContent>
          </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
