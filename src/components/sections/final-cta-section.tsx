import { Button } from "@/components/ui/button";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

export default function FinalCtaSection() {
  const { cta_bg, zaza_group } = placeholderImages;

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-lg bg-secondary overflow-hidden p-8 md:p-16">
          <div className="absolute inset-0">
             <Image
              src={cta_bg.src}
              alt={cta_bg.alt}
              fill
              className="object-cover opacity-10"
              data-ai-hint={cta_bg.hint}
            />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
                READY TO TASTE THE DIFFERENCE?
              </h2>
              <p className="text-lg text-muted-foreground">
                Your new favorite soda is just a click away. Join the Zaza family and experience a refreshing twist on classic flavors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 px-8 py-6 text-lg">
                  Shop All Flavors
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <Image
                src={zaza_group.src}
                alt={zaza_group.alt}
                width={zaza_group.width}
                height={zaza_group.height}
                className="object-contain"
                data-ai-hint={zaza_group.hint}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
