'use client';

import { motion } from 'motion/react';

const About = () => {
  const LeftAnimation = {
    initial: {
      opacity: 0,
      x: -60,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
    transition: {
      duration: 0.4,
      easing: 'ease-in-out',
    },
  };

  const RightAnimation = {
    initial: {
      opacity: 0,
      x: 60,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
    transition: {
      duration: 0.4,
      easing: 'ease-in-out',
    },
  };

  return (
    <motion.div className="flex flex-col items-center justify-center lg:p-10">
      <h1 className="text-2xl font-semibold lg:text-7xl">About Us</h1>
      <div>
        <motion.p {...LeftAnimation} className="p-2 text-3xl">
          This will come from left
        </motion.p>

        <motion.p {...RightAnimation} className="p-2 text-3xl">
          This will come from right
        </motion.p>
      </div>
    </motion.div>
  );
};

export default About;
