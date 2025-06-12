import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section with Carousel */}
      <section>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            <CarouselItem className="pl-1">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6 bg-secondary h-[400px]">
                    <span className="text-2xl font-semibold">Slide 1</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="pl-1">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6 bg-secondary h-[400px]">
                    <span className="text-2xl font-semibold">Slide 2</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="pl-1">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6 bg-secondary h-[400px]">
                    <span className="text-2xl font-semibold">Slide 3</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Three Feature Boxes */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Free Shipping", "Secure Payments", "24/7 Support"].map(
            (feature, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{`Feature ${i + 1}`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm">
                    Learn more
                  </Button>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Newest Products Section */}
      <section>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              Newest Products
            </h2>
            <Button variant="outline">View all</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((product) => (
              <Card key={product} className="overflow-hidden">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Product Image</span>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Product {product}</CardTitle>
                  <CardDescription>$99.99</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
