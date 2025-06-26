import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const CTA = () => {
  return (
    <section className="bg-muted/30 border-t">
      <div className="container py-24 md:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl leading-tight font-bold tracking-tighter md:text-5xl">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground max-w-[750px] text-lg sm:text-xl">
            Join thousands of developers who are already building amazing products with our
            platform.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              asChild
            >
              <Link href="/get-started">
                Start Building Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
