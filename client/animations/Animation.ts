export const Animation: any = {
  initial: { opacity: 0, y: 20, filter: 'blur(10px)'},
  animate: { opacity: 1, y: 0, filter: 'blur(0px)'}
};

export const Transition = (x: number) => {
  return {
    duration: 0.3,
    easing: 'easeInOut',
    delay: x,
  };
};

export const Inview = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { amount: 0.2, once: true } 
}