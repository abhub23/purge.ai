"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ToggleTheme } from "./ToggleTheme"
import Image from "next/image"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="container sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={'/gradient.webp'} alt="aa" height={30} width={30} />
            <span className="hidden font-bold sm:inline-block">YourApp</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/about" className="transition-colors  hover:text-foreground/90 text-foreground/60">
              About
            </Link>
            <Link href="/docs" className="transition-colors hover:text-foreground/90 text-foreground/60">
              Docs
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/90 text-foreground/60">
              Pricing
            </Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/90 text-foreground/60">
              Blog
            </Link>
          </nav>
        </div>

        {/* Mobile menu button */}

        {/* Mobile Logo */}
        <div className="flex flex-1 items-center justify-between space-x-2 ">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <div className="h-6 w-6 rounded-md bg-primary" />
              <span className="font-bold">YourApp</span>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <div className=" md:flex items-center space-x-2">
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
            className="inline-flex items-center justify-end rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-b border-border/40 md:hidden">
          <div className="container py-4">
            <nav className="flex flex-col space-y-3 px-10 font-semibold">
              <Link
                href="/about"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/docs"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/pricing"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <div className="flex flex-row justify-center gap-x-4 pb-2">
                  <Button variant="ghost" size="sm" asChild className="px-10 border-1 shadow">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="px-10 border-1 shadow">
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
  )
}
