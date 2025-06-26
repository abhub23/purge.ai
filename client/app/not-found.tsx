'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

const ErrorPage = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="flex h-[100svh] flex-col items-center justify-center bg-white font-semibold lg:h-screen dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center"
      >
        <p className="mb-1.5 p-2 text-[22px] text-black lg:text-[36px] dark:text-white">
          PAGE NOT FOUND - 404{' '}
        </p>
        <button
          className="h-[28px] w-[100px] cursor-pointer rounded-md bg-black p-2 px-3 py-2 text-[10px] text-white lg:h-[36px] lg:w-[120px] lg:text-[14px] dark:bg-white dark:text-black"
          onClick={handleHome}
        >
          Go to Home
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
