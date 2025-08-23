'use client';

import { motion } from 'motion/react';
import { FC, useId } from 'react';

type AnimationType = {
  duration: number;
};

const R2L_AnimatedSVG: FC<AnimationType> = ({ duration }) => {
  const width = 238;
  const height = 70;
  const Path =
    'M0.5 0.5H89C90.6569 0.5 92 1.84315 92 3.5V29C92 30.6569 93.3431 32 95 32H148.5C150.157 32 151.5 33.3431 151.5 35V64C151.5 65.6569 152.843 67 154.5 67H235.5';
  const gradientId = useId(); // Unique per instance
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='https://www.w3.org/2000/svg'
    >
      <motion.path d={Path} stroke={`url(#${gradientId})`} />

      <defs>
        <motion.linearGradient
          initial={{
            opacity: 0,
            x1: 200,
            x2: 400.5,
            y1: 0,
            y2: 50,
          }}
          animate={{
            opacity: 1,
            x1: -100,
            x2: -100,
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: duration,
            ease: 'linear',
            repeat: Infinity,
          }}
          id={gradientId}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2EB9DF' stopOpacity={0} />
          <stop stopColor='#2EB9DF' />
          <stop stopColor='#9E00FF' stopOpacity={0} offset={1} />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
export default R2L_AnimatedSVG;
