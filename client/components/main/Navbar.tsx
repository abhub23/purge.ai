'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TextAlignStart, X } from 'lucide-react';
import { ToggleTheme } from './ToggleTheme';
import Image from 'next/image';
import { useSignBox, useIsSignedin } from '@/store/AuthStates';
import Signin from '../auth/Signin';
import api from '@/lib/axios';
import { GoogleSignOut } from '@/lib/client-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Navbar() {
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, setOpen } = useSignBox();
  const { setSignedin } = useIsSignedin();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['checksignedin'],
    queryFn: async () => {
      const response = await api.get('/api/checkvalidsession');
      return response.data;
    },
    staleTime: 10000 * 60 * 10,
  });

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
      <div className='container relative flex h-16 max-w-screen-2xl items-center'>
        <div className='ml-26 hidden md:flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <Image src={'/purgeailogo.webp'} alt='aa' height={35} width={35} />
            <span className='hidden text-xl font-bold sm:inline-block'>PurgeAI</span>
          </Link>
        </div>

        {/* Navigation Links laptop - centered */}
        <nav className='hidden items-center gap-2.5 text-base font-medium md:flex absolute left-1/2 -translate-x-1/2'>
          <Link
            href='/about'
            className='hover:text-foreground hover:bg-accent/80 text-foreground/80 rounded-md p-1.5 px-2.5 transition-colors'
          >
            About
          </Link>
          <div
            onClick={() => window.scrollTo({ top: 1300, behavior: 'smooth' })}
            className='hover:text-foreground hover:bg-accent/80 text-foreground/80 cursor-pointer rounded-md p-1.5 px-2.5 transition-colors'
          >
            Features
          </div>
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
              <span className='font-bold'>PurgeAI</span>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className='mr-26 hidden items-center space-x-2 md:flex'>
            {isSuccess && data?.success && (
              <span className='font-medium p-2 text-base'>Hey,&nbsp; {data?.name}</span>
            )}

            <div className='items-center space-x-2 md:flex'>
              {isLoading || isError ? (
                <></>
              ) : data?.success ? (
                <>
                  <Button
                    variant='ghost'
                    asChild
                    onClick={() => handleSignOut()}
                    className='cursor-pointer text-base bg-accent text-accent-foreground dark:hover:bg-accent'
                  >
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <Button
                  variant='ghost'
                  asChild
                  onClick={() => setOpen(true)}
                  className='cursor-pointer text-base bg-accent text-accent-foreground dark:hover:bg-accent'
                >
                  <span>Sign In</span>
                </Button>
              )}

              <Button asChild className='text-base'>
                <Link href='/chat'>Get Started</Link>
              </Button>
            </div>
            {/* Theme toggle */}
            <ToggleTheme />
            {isOpen && <Signin />}
          </div>

          <button
            className='focus-visible:ring-ring hover:text-accent-foreground mr-2 inline-flex h-9 items-center justify-end rounded-md px-0 py-2 text-base font-medium transition-colors hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:hidden'
            type='button'
          >
            {data?.success && (
              <span className='p-3 text-[15px]'>Hey,&nbsp; {data?.name}</span>
            )}
            <span className='sr-only'>Toggle Menu</span>
          </button>
          <div className='flex items-center gap-2 md:hidden'>
            <ToggleTheme />
            <div className='relative mr-5 size-6'>
              <TextAlignStart
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <X
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='absolute top-full left-4 right-6 bg-background border-b border-border/40 md:hidden'>
          <div className='container py-4'>
            <nav className='flex flex-col space-y-3 px-10 font-semibold'>
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
              <div className='flex flex-col space-y-2 pt-2'>
                <div className='flex w-full flex-row justify-center pb-2'>
                  {isLoading || isError ? (
                    <></>
                  ) : data?.success ? (
                    <Button
                      variant='ghost'
                      size='lg'
                      asChild
                      className='w-full border-2 shadow-2xs'
                      onClick={() => handleSignOut()}
                    >
                      <span>Sign out</span>
                    </Button>
                  ) : (
                    <Button
                      variant='ghost'
                      size='lg'
                      asChild
                      className='w-full border-2 shadow-2xs'
                      onClick={() => {
                        setOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <span>Sign In</span>
                    </Button>
                  )}
                </div>

                <Button size='lg' className='w-full' asChild>
                  <Link href='/chat'>Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};