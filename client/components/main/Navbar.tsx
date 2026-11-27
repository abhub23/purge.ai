'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Equal } from 'lucide-react';
import { ToggleTheme } from './ToggleTheme';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { useIsSignedin } from '@/store/AuthStates';
import api from '@/lib/axios';
import { GoogleSignOut } from '@/lib/client-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Navbar() {
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { setSignedin } = useIsSignedin();

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isSuccess } = useQuery({
    queryKey: ['checksignedin'],
    queryFn: async () => {
      const response = await api.get('/api/checkvalidsession');
      return response.data;
    },
    staleTime: 10000 * 60 * 10,
  });

  const isSignedIn = isSuccess && Boolean(data?.success);

  const displayName = (data?.name as string | undefined)?.trim();
  const firstName = displayName?.split(' ')[0];
  const avatarUrl = (data?.image as string | undefined) ?? null;
  const initial = firstName?.[0]?.toUpperCase() ?? '';

  const { mutate: handleSignOut } = useMutation({
    mutationFn: GoogleSignOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checksignedin'] });
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setSignedin(data.success as boolean);
    }
  }, [isSuccess, data]);

  return (
    <nav className='md:border-border/40 md:bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 container w-full border-b backdrop-blur'>
      <div className='relative container flex h-16 max-w-screen-2xl items-center'>
        <div className='ml-4 hidden md:flex xl:ml-50'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <Image src={'/purgeailogo.webp'} alt='aa' height={35} width={35} />
            <span className='hidden text-xl font-semibold sm:inline-block'>PurgeAI</span>
          </Link>
        </div>

        {/* Navigation Links laptop - left aligned after logo */}
        <nav className='ml-4 hidden items-center gap-2.5 text-base font-medium md:flex lg:ml-8'>
          <Link
            href='/about'
            className='hover:text-foreground hover:bg-accent/80 text-foreground/80 rounded-md p-1.5 px-2.5 transition-colors'
          >
            About
          </Link>
          <Link
            href='#features'
            onClick={(event) => {
              event.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className='hover:text-foreground hover:bg-accent/80 text-foreground/80 rounded-md p-1.5 px-2.5 transition-colors'
          >
            Features
          </Link>
          <Link
            href='/pricing'
            className='hover:text-foreground hover:bg-accent/80 text-foreground/80 rounded-md p-1.5 px-2.5 transition-colors'
          >
            Pricing
          </Link>
        </nav>

        {/* Mobile viewport */}
        <div className='flex flex-1 items-center justify-between space-x-2'>
          <div className='ml-4 w-full flex-1 md:w-auto md:flex-none'>
            <Link href='/' className='mr-6 flex items-center space-x-2 md:hidden'>
              <Image src={'/purgeailogo.webp'} alt='aa' height={30} width={30} />
              <span className='font-semibold'>PurgeAI</span>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className='mr-4 hidden items-center space-x-2 md:flex xl:mr-50'>
            {isSignedIn && displayName && (
              <div className='border-border/60 bg-accent/40 flex items-center gap-2 rounded-full border py-1 pr-3 pl-1'>
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    referrerPolicy='no-referrer'
                    className='size-7 shrink-0 rounded-full object-cover'
                  />
                ) : (
                  <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-semibold text-white'>
                    {initial}
                  </span>
                )}
                <span className='max-w-32 truncate text-sm font-medium' title={displayName}>
                  {firstName}
                </span>
              </div>
            )}

            <div className='items-center space-x-2 md:flex'>
              {isSignedIn ? (
                <Button
                  variant='ghost'
                  onClick={() => setIsSignOutOpen(true)}
                  className='bg-accent text-accent-foreground dark:hover:bg-accent cursor-pointer text-base'
                >
                  <span>Sign Out</span>
                </Button>
              ) : (
                <Button
                  variant='ghost'
                  asChild
                  className='bg-accent text-accent-foreground dark:hover:bg-accent cursor-pointer text-base'
                >
                  <Link href='/login'>Sign In</Link>
                </Button>
              )}

              <Button
                asChild
                className='bg-emerald-700 text-base text-white hover:bg-emerald-800 dark:hover:bg-emerald-800'
              >
                <Link href='/chat'>Get Started</Link>
              </Button>
            </div>
            {/* Theme toggle */}
            <ToggleTheme />
          </div>

          <div className='flex items-center gap-2 md:hidden'>
            {isSignedIn &&
              displayName &&
              (avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={displayName}
                  referrerPolicy='no-referrer'
                  className='size-7 shrink-0 rounded-full object-cover'
                />
              ) : (
                <span className='flex size-7 items-center justify-center rounded-full bg-emerald-700 text-[11px] font-semibold text-white'>
                  {initial}
                </span>
              ))}
            <div className='relative mr-5 size-7' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Equal
                strokeWidth={1.5}
                className={`absolute inset-0 h-7 w-7 [&>line]:origin-center [&>line]:transition-all [&>line]:duration-300 [&>line]:transform-fill ${isMenuOpen ? '[&>line:nth-child(1)]:translate-y-0.75 [&>line:nth-child(1)]:rotate-45 [&>line:nth-child(2)]:-translate-y-0.75 [&>line:nth-child(2)]:-rotate-45' : '[&>line:nth-child(1)]:translate-y-0 [&>line:nth-child(1)]:rotate-0 [&>line:nth-child(2)]:translate-y-0 [&>line:nth-child(2)]:rotate-0'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='bg-background border-border/40 absolute top-full right-0 left-0 border-b md:hidden'>
          <div className='container py-4'>
            <nav className='flex flex-col space-y-4 px-10 font-medium'>
              <Link
                href='/about'
                className='hover:text-foreground/80 text-foreground/60 transition-colors'
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href='/pricing'
                className='hover:text-foreground/80 text-foreground/60 transition-colors'
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>

              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground'>
                  {mounted ? (isDark ? 'Light' : 'Dark') : 'Theme'}
                </span>
                <Switch
                  checked={isDark}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  aria-label='Toggle theme'
                />
              </div>

              <div className='flex flex-col space-y-2 pt-2'>
                <div className='flex w-full flex-row justify-center pb-2'>
                  {isSignedIn ? (
                    <Button
                      variant='ghost'
                      size='lg'
                      className='w-full border-2 shadow-2xs'
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSignOutOpen(true);
                      }}
                    >
                      <span>Sign out</span>
                    </Button>
                  ) : (
                    <Button
                      variant='ghost'
                      size='lg'
                      asChild
                      className='w-full border-2 shadow-2xs'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href='/login'>Sign In</Link>
                    </Button>
                  )}
                </div>

                <Button
                  size='lg'
                  className='w-full bg-emerald-700 text-base text-white hover:bg-emerald-800'
                  asChild
                >
                  <Link href='/chat'>Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <Dialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
        <DialogContent className='bg-background max-w-88 backdrop-blur-none'>
          <DialogHeader>
            <DialogTitle className='text-lg font-normal'>
              Are you sure you want to sign out?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className='mt-2'>
            <DialogClose asChild>
              <Button variant='outline' className='cursor-pointer'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              className='cursor-pointer bg-red-600 text-white hover:bg-red-700'
              onClick={() => {
                setIsSignOutOpen(false);
                setIsMenuOpen(false);
                handleSignOut();
              }}
            >
              Sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
