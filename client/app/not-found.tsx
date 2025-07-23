'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="flex h-[100svh] flex-col items-center justify-center bg-white font-semibold lg:h-screen dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center"
      >
        <p className="p-2 text-[22px] text-black lg:text-[36px] dark:text-white">
          PAGE NOT FOUND - 404{' '}
        </p>
        <Button
          size="lg"
          className="rounded-4xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          asChild
        >
          <Link href="/">Go to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
