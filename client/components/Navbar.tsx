'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ToggleTheme } from './ToggleTheme';
import Image from 'next/image';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 container w-full border-b backdrop-blur">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={'/gradient.webp'} alt="aa" height={30} width={30} />
            <span className="hidden font-bold sm:inline-block">YourApp</span>
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
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <div className="bg-primary h-6 w-6 rounded-md" />
              <span className="font-bold">YourApp</span>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden items-center space-x-2 md:flex">
            <div className="items-center space-x-2 md:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>

            {/* Theme toggle */}
            <ToggleTheme />
          </div>

          <button
            className="focus-visible:ring-ring hover:text-accent-foreground mr-2 inline-flex h-9 items-center justify-end rounded-md px-0 py-2 text-base font-medium transition-colors hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:hidden"
            type="button"
          >
            {isMenuOpen ? <> <ToggleTheme/> <X className="h-6 w-6" onClick={() => setIsMenuOpen(!isMenuOpen)}/></> : <Menu className="h-6 w-6 mr-1" onClick={() => setIsMenuOpen(!isMenuOpen)}/>}
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
                <div className="flex flex-row justify-center gap-x-4 pb-2">
                  <Button variant="ghost" size="sm" asChild className="border-1 px-10 shadow">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="border-1 px-10 shadow">
                    <Link href="/sign-up">Sign Up</Link>
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
