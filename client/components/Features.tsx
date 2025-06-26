import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Palette, Code, Globe, Smartphone } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with performance in mind. Your users will love the speed.",
    badge: "Performance",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security features built into every component.",
    badge: "Security",
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Easily customize colors, fonts, and layouts to match your brand.",
    badge: "Design",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Clean APIs and excellent TypeScript support for better DX.",
    badge: "DX",
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "Built-in SEO best practices to help your site rank better.",
    badge: "SEO",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design that works perfectly on all devices.",
    badge: "Mobile",
  },
]

export function Features() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto flex max-w-[980px] flex-col items-center space-y-4 text-center">
        <Badge variant="secondary" className="border">
          Features
        </Badge>
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
          Everything you need to build amazing products
        </h2>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Our platform provides all the tools and features you need to create exceptional user experiences.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted border">
                  <feature.icon className="h-5 w-5 text-foreground" />
                </div>
                <Badge variant="outline">{feature.badge}</Badge>
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
