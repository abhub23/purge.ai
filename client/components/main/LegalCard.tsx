'use client'

import {motion} from 'motion/react'
import { Animation, Transition } from '@/app/about/page'
import { FC } from 'react';
import { Bricolage } from '@/utils/fonts';

type LegalCardType = {
    name: string;
    values: string[]
}

const LegalCard: FC<LegalCardType> = ({name, values}) => {
    return(
    <>
    <motion.div {...Animation} transition={{duration: 0.3}} className={`${Bricolage} flex justify-center lg:text-[32px] lg:mt-[20px]`}>
        {name}
    </motion.div>
    
    </>
    )
}

export default LegalCard