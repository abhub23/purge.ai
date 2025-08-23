'use client';

import { motion } from 'motion/react';
import { FC, useId } from 'react';

type AnimationType = {
  duration: number;
};

const L2R_AnimatedSVG: FC<AnimationType> = ({ duration }) => {
  const width = 236;
  const height = 68;
  const Path =
    'M235.5 0.5H147C145.343 0.5 144 1.84315 144 3.5V29C144 30.6569 142.657 32 141 32H87.5C85.8431 32 84.5 33.3431 84.5 35V64C84.5 65.6569 83.1569 67 81.5 67H0.5';
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
            x1: 36,
            x2: -164.5,
            y1: 0,
            y2: 50,
          }}
          animate={{
            x1: 336,
            x2: 336,
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
export default L2R_AnimatedSVG;
