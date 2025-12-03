import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";

const { avatar_1, avatar_2, avatar_3 } = placeholderImages;

const reviews = [
  {
    name: "Jessica L.",
    avatar: avatar_1.src,
    rating: 5,
    text: "The Cherry Soda is my absolute favorite! It's so refreshing and doesn't have that artificial aftertaste. Finally, a soda I can feel good about drinking.",
  },
  {
    name: "Mike R.",
    avatar: avatar_2.src,
    rating: 5,
    text: "I was skeptical about 'healthy' soda, but Zaza is a game-changer. The Lemon flavor is perfectly tart and crisp. It's my new afternoon pick-me-up.",
  },
  {
    name: "Chloe B.",
    avatar: avatar_3.src,
    rating: 5,
    text: "Apple Soda tastes like a crisp autumn day in a can. It's so delicious and I love that it's low in sugar. My whole family is obsessed!",
  },
];

const renderStars = (rating: number) => {
  return Array(5).fill(0).map((_, i) => (
    <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
  ));
};

export default function ReviewsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
            DON'T JUST TAKE OUR WORD
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            See what our amazing customers are saying about Zaza.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-secondary border-border shadow-lg flex flex-col">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-muted-foreground mb-4">"{review.text}"</p>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{review.name}</p>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
