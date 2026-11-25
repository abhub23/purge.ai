'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import GoogleButton from '@/components/auth/Googlebutton';
import GithubButton from '@/components/auth/Githubbutton';
import { GoogleSignIn } from '@/lib/client-auth';
import { HostGrotesk } from '@/utils/fonts';
import { cn } from 'cn';

export default function LoginPage() {
  return (
    <main
      className={cn(
        'bg-background text-foreground flex min-h-screen items-center justify-center px-6',
        HostGrotesk
      )}
    >
      <div className='w-full max-w-sm'>
        <div className='mb-10 text-center'>
          <h1 className='text-3xl font-bold tracking-tight'>Welcome back</h1>
          <p className='text-muted-foreground mt-2 text-sm'>Sign in to your Purge AI account.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <GoogleButton onClick={GoogleSignIn} />
          <GithubButton onClick={() => toast.error('Coming soon, stay tuned.')} />
        </div>
      </div>
    </main>
  );
}
