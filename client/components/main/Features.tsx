'use client' 

import React from 'react';
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
      
      <div className='mx-2 mt-16 max-w-[1200px] lg:mx-auto'>
        <div className='grid auto-rows-[18rem] gap-6 md:grid-cols-2 lg:grid-cols-6'>
          {/* Top row - 2 cards side by side (spans 3 columns each) */}
          <motion.div {...Inview} className='md:col-span-1 lg:col-span-3'>
            <Card className='relative h-full overflow-hidden p-6 transition-all delay-50 hover:scale-101 hover:shadow-lg flex flex-col'>
              <CardHeader className='pb-2'>
                <div className='flex items-center space-x-2'>
                  <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-lg border'>
                    {React.createElement(features[0].icon, { className: 'text-foreground h-5 w-5' })}
                  </div>
                  <Badge variant='outline' className='text-xs md:text-sm'>{features[0].badge}</Badge>
                </div>
                <CardTitle className='text-base md:text-xl lg:text-2xl'>{features[0].title}</CardTitle>
              </CardHeader>
              <CardContent className='mt-auto pt-0'>
                <CardDescription className='w-full text-sm md:text-base lg:text-lg'>{features[0].desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...Inview} className='md:col-span-1 lg:col-span-3'>
            <Card className='relative h-full overflow-hidden p-6 transition-all delay-50 hover:scale-101 hover:shadow-lg flex flex-col'>
              <CardHeader className='pb-2'>
                <div className='flex items-center space-x-2'>
                  <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-lg border'>
                    {React.createElement(features[1].icon, { className: 'text-foreground h-5 w-5' })}
                  </div>
                  <Badge variant='outline' className='text-xs md:text-sm'>{features[1].badge}</Badge>
                </div>
                <CardTitle className='text-base md:text-xl lg:text-2xl'>{features[1].title}</CardTitle>
              </CardHeader>
              <CardContent className='mt-auto pt-0'>
                <CardDescription className='w-full text-sm md:text-base lg:text-lg'>{features[1].desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom row - 3 cards side by side (spans 2 columns each) */}
          <motion.div {...Inview} className='md:col-span-1 lg:col-span-2'>
            <Card className='relative h-full overflow-hidden p-5 transition-all delay-50 hover:scale-101 hover:shadow-lg flex flex-col'>
              <CardHeader className='pb-2'>
                <div className='flex items-center space-x-2'>
                  <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-lg border'>
                    {React.createElement(features[2].icon, { className: 'text-foreground h-5 w-5' })}
                  </div>
                  <Badge variant='outline' className='text-xs md:text-sm'>{features[2].badge}</Badge>
                </div>
                <CardTitle className='text-base md:text-lg lg:text-xl'>{features[2].title}</CardTitle>
              </CardHeader>
              <CardContent className='mt-auto pt-0'>
                <CardDescription className='w-full text-sm md:text-base'>{features[2].desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...Inview} className='md:col-span-1 lg:col-span-2'>
            <Card className='relative h-full overflow-hidden p-5 transition-all delay-50 hover:scale-101 hover:shadow-lg flex flex-col'>
              <CardHeader className='pb-2'>
                <div className='flex items-center space-x-2'>
                  <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-lg border'>
                    {React.createElement(features[3].icon, { className: 'text-foreground h-5 w-5' })}
                  </div>
                  <Badge variant='outline' className='text-xs md:text-sm'>{features[3].badge}</Badge>
                </div>
                <CardTitle className='text-base md:text-lg lg:text-xl'>{features[3].title}</CardTitle>
              </CardHeader>
              <CardContent className='mt-auto pt-0'>
                <CardDescription className='w-full text-sm md:text-base'>{features[3].desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...Inview} className='md:col-span-1 lg:col-span-2'>
            <Card className='relative h-full overflow-hidden p-5 transition-all delay-50 hover:scale-101 hover:shadow-lg flex flex-col'>
              <CardHeader className='pb-2'>
                <div className='flex items-center space-x-2'>
                  <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-lg border'>
                    {React.createElement(features[4].icon, { className: 'text-foreground h-5 w-5' })}
                  </div>
                  <Badge variant='outline' className='text-xs md:text-sm'>{features[4].badge}</Badge>
                </div>
                <CardTitle className='text-base md:text-lg lg:text-xl'>{features[4].title}</CardTitle>
              </CardHeader>
              <CardContent className='mt-auto pt-0'>
                <CardDescription className='w-full text-sm md:text-base'>{features[4].desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};