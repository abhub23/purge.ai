'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { LockKeyhole } from 'lucide-react';
import GoogleButton from '@/components/auth/Googlebutton';
import GithubButton from '@/components/auth/Githubbutton';
import { GoogleSignIn } from '@/lib/client-auth';
import { HostGrotesk } from '@/utils/fonts';
import { cn } from 'cn';
import { FadeIn } from '@/components/micro-interactions/FadeIn';

export default function LoginPage() {
  return (
    <main
      className={cn(
        'bg-background text-foreground relative flex min-h-screen flex-col overflow-x-hidden',
        HostGrotesk
      )}
    >
      {/* Auth card */}
      <div className='relative z-10 flex flex-1 items-center justify-center px-6 py-4 sm:py-6'>
        <FadeIn delay={0.1} className='w-full max-w-[400px]'>
          <div className='border-border/60 bg-background/80 relative overflow-hidden rounded-2xl border p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-10 dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]'>
            {/* Pro-tier gradient */}
            <span
              aria-hidden
              className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.06),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))]'
            />

            {/* Card chrome */}
            <span className='absolute inset-x-10 top-0 z-10 h-px bg-gradient-to-r from-transparent via-emerald-600/50 to-transparent' />
            <span className='border-foreground/20 absolute top-3 left-3 z-10 size-2.5 border-t border-l' />
            <span className='border-foreground/20 absolute top-3 right-3 z-10 size-2.5 border-t border-r' />
            <span className='border-foreground/20 absolute bottom-3 left-3 z-10 size-2.5 border-b border-l' />
            <span className='border-foreground/20 absolute right-3 bottom-3 z-10 size-2.5 border-r border-b' />

            <div className='relative z-10'>
              <div className='text-center'>
                <span className='border-border/60 bg-background/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase'>
                  <span className='relative flex size-1.5'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75' />
                    <span className='relative inline-flex size-1.5 rounded-full bg-emerald-500' />
                  </span>
                  Auth gateway
                </span>

                <h1 className='mt-6 text-[34px] leading-tight font-medium tracking-tight text-balance sm:text-4xl'>
                  Welcome back.
                </h1>
                <p className='text-muted-foreground mt-3 text-sm'>
                  Sign in to your Purge AI account.
                </p>
              </div>

              <div className='my-7 flex items-center gap-3'>
                <span className='bg-border h-px flex-1' />
                <span className='text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase'>
                  Continue with
                </span>
                <span className='bg-border h-px flex-1' />
              </div>

              <div className='flex flex-col gap-3'>
                <GoogleButton onClick={GoogleSignIn} />
                <GithubButton onClick={() => toast.error('Coming soon, stay tuned.')} />
              </div>

              <div className='text-muted-foreground mt-6 flex items-start justify-center gap-1.5 text-center text-[11px] leading-relaxed'>
                <LockKeyhole className='mt-0.5 size-3.5 shrink-0' strokeWidth={1.75} />
                <p>
                  OAuth 2.0 secured. We never see your password.
                  <br />
                  By continuing, you agree to our{' '}
                  <Link
                    href='/t&c'
                    className='text-foreground/80 decoration-border hover:text-foreground underline decoration-1 underline-offset-2 transition-colors'
                  >
                    Terms &amp; Conditions
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <p className='text-muted-foreground mt-5 text-center text-xs'>
            New here? Signing in creates your account automatically.
          </p>
        </FadeIn>
      </div>

      {/* Footer */}
      <footer className='text-muted-foreground relative z-10 flex items-center justify-between gap-4 px-6 py-4 font-mono text-[10px] tracking-[0.18em] uppercase sm:px-10'>
        <span>© 2026 PurgeAI</span>
        <span className='hidden sm:inline'>AI reviews for GitHub PRs</span>
        <Link
          href='mailto:abdullahmukri25@gmail.com?subject=PurgeAI%20Support'
          className='hover:text-foreground transition-colors'
        >
          Need help?
        </Link>
      </footer>
    </main>
  );
}
