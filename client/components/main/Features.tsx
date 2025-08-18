import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { features } from '@/constants/features';

export const Features = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[980px] flex-col items-center space-y-4 text-center">
        <Badge variant="secondary" className="border py-1">
          Features
        </Badge>
        <h2 className="text-3xl leading-tight font-bold tracking-tighter md:text-5xl">
          Everything you need to know for building amazing SaaS products
        </h2>
        <p className="text-muted-foreground lg:-w-[800px] text-lg sm:text-xl">
          Our platform provides all the tools and features you need to create exceptional Products
        </p>
      </div>
      <div className="mx-2 mt-16 grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:mx-auto lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="relative overflow-hidden p-5 transition-all delay-50 hover:shadow-lg hover:scale-101"
          >
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg border">
                  <feature.icon className="text-foreground h-5 w-5" />
                </div>
                <Badge variant="outline">{feature.badge}</Badge>
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="w-full text-base">{feature.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
