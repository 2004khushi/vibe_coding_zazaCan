import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes Zaza different from other sodas?",
    answer: "Zaza is made with real fruit juice, natural sweeteners, and beneficial botanicals. We avoid artificial ingredients, colors, and preservatives, offering a soda that's both delicious and better for you."
  },
  {
    question: "Is Zaza soda gluten-free and vegan?",
    answer: "Yes! All of our Zaza soda flavors are 100% gluten-free and vegan. We use only plant-based ingredients."
  },
  {
    question: "How much sugar is in a can of Zaza?",
    answer: "Our sodas are low in sugar, typically containing only 4-5 grams per can, derived from natural sources like fruit juice and plant-based sweeteners."
  },
  {
    question: "Where can I buy Zaza soda?",
    answer: "You can buy Zaza directly from our website. We are also expanding into retail stores across the country. Check our store locator for a location near you."
  }
]

export default function FaqSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
            FREQUENTLY ASKED
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-border/50">
                <AccordionTrigger className="text-left text-lg hover:no-underline text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
