import Image from "next/image";
import NutritionCard from "@/components/zaza/nutrition-card";
import placeholderImages from "@/lib/placeholder-images.json";

export default function NutritionSection() {
  const { zaza_can } = placeholderImages;

  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
            NUTRITION FACTS
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Everything you need to know, nothing to hide. Clean, simple, and delicious.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex justify-center items-center">
             <Image
              src={zaza_can.src}
              alt={zaza_can.alt}
              width={zaza_can.width}
              height={zaza_can.height}
              className="object-contain max-w-[300px] md:max-w-[500px]"
              data-ai-hint={zaza_can.hint}
            />
          </div>
          <div className="flex justify-center items-center">
            <NutritionCard />
          </div>
        </div>
      </div>
    </section>
  );
}
