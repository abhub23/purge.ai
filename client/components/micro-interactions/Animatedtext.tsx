'use client';
import { stagger } from 'motion';
import { motion, useAnimate } from 'motion/react';
import { FC, useEffect } from 'react';

type AnimateType = {
  text: string;
  classname: string;
  blur: string;
  stg: number;
};
const AnimatedText: FC<AnimateType> = ({ text, classname, blur, stg }) => {
  const [scope, animate] = useAnimate();

  const Animatetext = () => {
    animate(
      'span',
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
      },
      {
        duration: 0.5,
        delay: stagger(stg, { startDelay: 0.8 }),
        ease: 'easeInOut',
      }
    );
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      Animatetext();
    });
  }, []);

  return (
    <h1 ref={scope}>
      {text.split(' ').map((word, idx) => (
        <motion.span
          initial={{ opacity: 0, y: -100, filter: `blur(${blur})` }}
          key={idx}
          className={classname}
        >
          {word + ' '}
        </motion.span>
      ))}
    </h1>
  );
};

export default AnimatedText;
