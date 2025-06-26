import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative container flex flex-col items-center justify-center space-y-4 py-24 md:py-32 bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="relative mx-auto flex max-w-[980px] flex-col items-center space-y-2 text-center">
        <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium border">
          🎉 <span className="ml-2">Introducing our new features</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Build your next project with{" "}
          <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            confidence
          </span>
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Beautiful, fast and modern React components to build your next landing page or web application. Built with
          Tailwind CSS and TypeScript.
        </p>
      </div>
      <div className="relative flex flex-col gap-4 sm:flex-row">
        <Button
          size="lg"
          className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          asChild
        >
          <Link href="/get-started">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg">
          <Play className="mr-2 h-4 w-4" />
          Watch Demo
        </Button>
      </div>
      <div className="relative mx-auto mt-16 max-w-[1200px]">
        <div className="relative rounded-xl border bg-muted/50 p-2 backdrop-blur-sm">
          <div className="aspect-video rounded-lg bg-background shadow-2xl border">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4 border">
                  <Play className="h-8 w-8 text-foreground" />
                </div>
                <p className="text-muted-foreground">Your app preview goes here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
