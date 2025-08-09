'use client';

import { motion } from 'motion/react';
import { Animation, Transition } from '@/app/about/page';
import { FC } from 'react';
import { Bricolage } from '@/utils/fonts';

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
        className={`${Bricolage} mt-8 flex justify-center text-[18px] lg:mt-[20px] lg:text-[32px]`}
      >
        {name}
      </motion.div>
      <ul className="mt-6 flex w-[340px] list-disc flex-col items-start justify-start gap-y-4 pl-6 text-justify text-[9px] font-light lg:mx-auto lg:mt-[30px] lg:h-[550px] lg:w-[950px] lg:text-[16px]">
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
