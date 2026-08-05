import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background px-4'>
      <div className='text-center'>
        <h1 className='bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-8xl font-bold tracking-tighter text-transparent lg:text-9xl'>
          404
        </h1>
        <p className='mt-6 text-lg text-muted-foreground lg:text-xl'>
          The page you are looking for does not exist or has been moved.
        </p>
        <Button
          size='lg'
          className='mt-8 rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90'
          asChild
        >
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}