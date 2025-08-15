import { Brain } from 'lucide-react';
import { motion } from 'motion/react';

export const Loader = () => (
  <motion.div
    className="inline-block text-neutral-900 select-none dark:text-neutral-100"
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
  >
    <div className="flex items-center">
      <Brain className="size-6 px-[4px]" />
      Thinking<span className="px-1">...</span>
    </div>
  </motion.div>
);
