import Image from 'next/image';
import placeholderImages from "@/lib/placeholder-images.json";

export default function ProductSection() {
  const { zaza_lifestyle } = placeholderImages;

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
              A NEW KIND OF SODA
            </h2>
            <p className="text-lg text-muted-foreground">
              Zaza is a modern functional soda brand inspired by classic flavors but made with better ingredients. We ditched the artificial stuff and packed our drinks with natural flavors and goodness. It's the soda you love, reimagined for today.
            </p>
            <p className="text-muted-foreground">
              Our mission is simple: create delicious, refreshing drinks that make you feel good. Each can is a celebration of flavor, crafted with care and a passion for quality.
            </p>
          </div>
          <div className="relative h-80 md:h-full min-h-[400px]">
            <Image
              src={zaza_lifestyle.src}
              alt={zaza_lifestyle.alt}
              fill
              className="object-cover rounded-lg shadow-2xl"
              data-ai-hint={zaza_lifestyle.hint}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
