'use client';

import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const VideoDialog = () => {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='lg'
          className='h-12 w-full cursor-pointer px-8 text-base sm:h-10 sm:w-auto sm:max-w-none sm:px-6 sm:text-sm lg:h-12 lg:px-6 lg:text-lg'
        >
          <Play className='size-5 fill-current sm:size-4' />
          Watch Demo
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className='border-0 bg-transparent p-0 shadow-none backdrop-blur-none sm:max-w-5xl'
      >
        <DialogTitle className='sr-only'>Purge AI demo</DialogTitle>
        <DialogDescription className='sr-only'>
          A short walkthrough of how Purge AI reviews pull requests.
        </DialogDescription>

        <div className='relative overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl'>
          <video
            ref={videoRef}
            src='/PurgeAI.mp4'
            className='h-auto max-h-[80vh] w-full object-contain'
            autoPlay
            muted
            loop
            playsInline
            controls
          />

          <DialogClose asChild>
            <button
              type='button'
              aria-label='Close demo'
              className='absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none'
            >
              <X className='size-4' />
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
