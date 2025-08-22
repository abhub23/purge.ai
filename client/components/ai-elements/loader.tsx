import { Brain } from 'lucide-react';
import { TextShimmer } from '../ui/text-shimmer';

export const Loader = () => {
  return (
    <div className="flex items-center">
      <Brain className="size-6 px-[4px]" />
      <TextShimmer>Thinking</TextShimmer>
    </div>
  );
};
