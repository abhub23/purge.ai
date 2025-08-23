'use client';

import { motion } from 'motion/react';
import { Animation, Transition } from '@/app/about/page';
import { FC } from 'react';

type LegalCardType = {
  name: string;
  values: string[];
};

const LegalCard: FC<LegalCardType> = ({ name, values }) => {
  return (
    <>
      <motion.div
        {...Animation}
        transition={{ duration: 0.3 }}
        className='mt-8 flex justify-center text-[18px] lg:mt-[20px] lg:text-[32px]'
      >
        {name}
      </motion.div>
      <ul className="mt-6 flex list-disc flex-col items-start justify-start gap-y-4 text-justify text-[9.5px] font-light lg:mx-auto lg:mt-[30px] lg:text-[16px]">
        {values.map((val, idx) => (
          <motion.li
            key={idx}
            {...Animation}
            transition={Transition(idx * 0.05)}
            className="pl-[1px] [-text-indent:1.25rem]"
          >
            {val}
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default LegalCard;
