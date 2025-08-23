'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ToggleTheme } from './ToggleTheme';
import Image from 'next/image';
import { useSignBox, useIsSignedin } from '@/store/AuthStates';
import Signin from '../auth/Signin';
import api from '@/lib/axios';
import { GoogleSignOut } from '@/lib/client-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const Navbar = () => {
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, setOpen } = useSignBox();
  const { setSignedin } = useIsSignedin();

  const { data, isError, isLoading, isSuccess, error } = useQuery({
    queryKey: ['checksignedin'],
    queryFn: async () => {
      const response = await api.get('/api/checkvalidsession');
      return response.data;
    },
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
    <nav className='md:border-border/40 md:bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 container w-full border-b backdrop-blur lg:fixed lg:top-5 lg:left-1/2 lg:w-[1000px] lg:-translate-x-1/2 lg:rounded-2xl lg:border-1 lg:border-neutral-200 lg:bg-transparent lg:dark:border-neutral-800'>
      <div className='container flex h-16 max-w-screen-2xl items-center'>
        <div className='ml-14 hidden md:flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <Image src={'/purgeailogo.webp'} alt='aa' height={30} width={30} />
            <span className='hidden font-bold sm:inline-block'>PurgeAI</span>
          </Link>

          {/* Navigation Links */}
          <nav className='flex items-center gap-[2px] text-sm'>
            <Link
              href='/about'
              className='hover:text-foreground/80 hover:bg-accent/80 text-foreground/60 rounded-md p-1.5 px-2.5 transition-colors hover:scale-101'
            >
              About
            </Link>
            <div
              onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
              className='hover:text-foreground/80 hover:bg-accent/80 text-foreground/60 cursor-pointer rounded-md p-1.5 px-2.5 transition-colors hover:scale-101'
            >
              Features
            </div>
            <Link
              href='/pricing'
              className='hover:text-foreground/80 hover:bg-accent/80 text-foreground/60 rounded-md p-1.5 px-2.5 transition-colors hover:scale-101'
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Mobile viewport */}
        <div className='flex flex-1 items-center justify-between space-x-2'>
          <div className='ml-2 w-full flex-1 md:w-auto md:flex-none'>
            <Link href='/' className='mr-6 flex items-center space-x-2 md:hidden'>
              <Image src={'/purgeailogo.webp'} alt='aa' height={30} width={30} />
              <span className='font-bold'>PurgeAI</span>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className='mr-14 hidden items-center space-x-2 md:flex'>
            <div className='items-center space-x-2 md:flex'>
              {isLoading || isError ? (
                <></>
              ) : data?.success ? (
                <>
                  <span className='p-2 text-[15px]'>Hey,&nbsp; {data?.name}</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    asChild
                    onClick={() => handleSignOut()}
                    className='cursor-pointer'
                  >
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <Button
                  variant='ghost'
                  size='sm'
                  asChild
                  onClick={() => setOpen(true)}
                  className='cursor-pointer'
                >
                  <span>Sign In</span>
                </Button>
              )}

              <Button size='sm' asChild>
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
            {data?.success ? (
              <span className='p-3 text-[15px]'>Hey,&nbsp; {data?.name}</span>
            ) : (
              <></>
            )}
            {isMenuOpen ? (
              <>
                <ToggleTheme />
                <X className='mr-2 h-6 w-6' onClick={() => setIsMenuOpen(!isMenuOpen)} />
              </>
            ) : (
              <Menu className='mr-2 h-6 w-6' onClick={() => setIsMenuOpen(!isMenuOpen)} />
            )}
            <span className='sr-only'>Toggle Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='border-border/40 border-b md:hidden'>
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
                <div className='flex flex-row justify-center pb-2'>
                  {isLoading || isError ? (
                    <></>
                  ) : data?.success ? (
                    <Button
                      variant='ghost'
                      size='lg'
                      asChild
                      className='border-2 px-29 shadow-2xs'
                      onClick={() => handleSignOut()}
                    >
                      <span>Sign out</span>
                    </Button>
                  ) : (
                    <Button
                      variant='ghost'
                      size='lg'
                      asChild
                      className='border-2 px-29 shadow-2xs'
                      onClick={() => {
                        setOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <span>Sign In</span>
                    </Button>
                  )}
                </div>

                <Button size='lg' asChild>
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
