import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 md:py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:mx-[100px]">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-foreground h-6 w-6 rounded-md" />
              <span className="text-lg font-bold">YourApp</span>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm">
              Building the future of web development with modern tools and beautiful design.
            </p>
            <div className="flex h-5 w-5 space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/abdullah_twt23"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/abdullah-mukri-84a56b220/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4 lg:ml-[110px]">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4 lg:ml-[110px]">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4 lg:ml-[110px]">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col items-center justify-between space-y-2 border-t pt-4 md:space-y-2 lg:mx-auto">
          <p className="text-muted-foreground text-sm">© 2025 YourApp. All rights reserved.</p>
          <div className="flex items-center gap-x-[10px] text-sm md:gap-6">
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
