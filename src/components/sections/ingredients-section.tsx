import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Droplets, Sun, Sparkles } from 'lucide-react';

const ingredients = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Real Fruit Juice',
    description: 'We use juice from real, sun-ripened fruits for an authentic, vibrant taste in every can.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Crisp Carbonation',
    description: 'Perfectly balanced bubbles to tickle your taste buds and deliver ultimate refreshment.',
  },
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    title: 'Natural Sweeteners',
    description: 'Sweetened with plant-based ingredients like stevia and monk fruit, for a clean, guilt-free taste.',
  },
  {
    icon: <Sun className="h-8 w-8 text-primary" />,
    title: 'Functional Botanicals',
    description: 'Infused with beneficial botanicals to give you a little extra lift and support your well-being.',
  },
];

export default function IngredientsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
            WHAT'S INSIDE
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Only the good stuff. We're committed to using high-quality, natural ingredients you can feel good about.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((item, index) => (
            <Card key={index} className="bg-secondary border-border text-center pt-6 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-background rounded-full p-4 mb-4">
                  {item.icon}
                </div>
                <CardTitle className="text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
