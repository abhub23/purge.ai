'use client';
import { stagger } from 'motion';
import { easeInOut, motion, useAnimate } from 'motion/react';
import { FC, useEffect } from 'react';

type AnimateType = {
  text: string;
};
const AnimatedText: FC<AnimateType> = ({ text }) => {
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
        delay: stagger(0.1),
        ease: easeInOut,
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
          initial={{ opacity: 0, y: 10, filter: 'blur(30px)' }}
          key={idx}
          className="text-[26px] leading-tight font-bold tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
        >
          {word + ' '}
        </motion.span>
      ))}
    </h1>
  );
};

export default AnimatedText;
