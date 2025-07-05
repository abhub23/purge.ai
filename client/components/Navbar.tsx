'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ToggleTheme } from './ToggleTheme';
import Image from 'next/image';
import { useSignin } from '@/store/AuthStates';
import Signin from './auth/Signin';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, setOpen } = useSignin();

  return (
    <nav className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 container w-full border-b backdrop-blur">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="ml-14 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={'/purgeailogo.webp'} alt="aa" height={30} width={30} />
            <span className="hidden font-bold sm:inline-block">PurgeAI</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/about"
              className="hover:text-foreground/90 text-foreground/60 transition-colors"
            >
              About
            </Link>
            <Link
              href="/docs"
              className="hover:text-foreground/90 text-foreground/60 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="hover:text-foreground/90 text-foreground/60 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground/90 text-foreground/60 transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Mobile menu button */}

        {/* Mobile Logo */}
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="ml-2 w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <Image src={'/purgeailogo.webp'} alt="aa" height={30} width={30} />
              <span className="font-bold">PurgeAI</span>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="mr-14 hidden items-center space-x-2 md:flex">
            <div className="items-center space-x-2 md:flex">
              <Button
                variant="ghost"
                size="sm"
                asChild
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              >
                <span>Sign In</span>
              </Button>
              <Button size="sm" asChild>
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
            {/* Theme toggle */}
            <ToggleTheme />
            {isOpen && <Signin />}
          </div>

          <button
            className="focus-visible:ring-ring hover:text-accent-foreground mr-2 inline-flex h-9 items-center justify-end rounded-md px-0 py-2 text-base font-medium transition-colors hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:hidden"
            type="button"
          >
            {isMenuOpen ? (
              <>
                <ToggleTheme />
                <X className="mr-2 h-6 w-6" onClick={() => setIsMenuOpen(!isMenuOpen)} />
              </>
            ) : (
              <Menu className="mr-2 h-6 w-6" onClick={() => setIsMenuOpen(!isMenuOpen)} />
            )}
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-border/40 border-b md:hidden">
          <div className="container py-4">
            <nav className="flex flex-col space-y-3 px-10 font-semibold">
              <Link
                href="/about"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/docs"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/pricing"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <div className="flex flex-row justify-center pb-2">
                  <Button
                    variant="ghost"
                    size="lg"
                    asChild
                    className="border-2 px-29 shadow-2xs"
                    onClick={() => {
                      setOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <span>Sign In</span>
                  </Button>
                </div>

                <Button size="lg" asChild>
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};
