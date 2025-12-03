'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import LoadingScreen from '@/components/zaza/loading-screen';
import ProductSection from '@/components/sections/product-section';
import IngredientsSection from '@/components/sections/ingredients-section';
import NutritionSection from '@/components/sections/nutrition-section';
import ReviewsSection from '@/components/sections/reviews-section';
import FaqSection from '@/components/sections/faq-section';
import FinalCtaSection from '@/components/sections/final-cta-section';

export type SectionRef = React.RefObject<HTMLDivElement>;
export type SectionRefs = {
  [key: string]: SectionRef;
};

export default function Home() {
  const [initialLoad, setInitialLoad] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const heroRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const nutritionRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs: SectionRefs = {
    hero: heroRef,
    product: productRef,
    ingredients: ingredientsRef,
    nutrition: nutritionRef,
    reviews: reviewsRef,
    faq: faqRef,
    contact: contactRef,
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionName in sectionRefs) {
        const ref = sectionRefs[sectionName];
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionName);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  return (
    <>
      <AnimatePresence>
        {!initialLoad && <LoadingScreen />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: initialLoad ? 1 : 0 }}
        transition={{ duration: 1.0 }}
        className="relative"
      >
        <Header activeSection={activeSection} sectionRefs={sectionRefs} />
        <main className="relative z-10">
          <div ref={heroRef} id="hero" className="h-screen sticky top-0 -z-10">
            <HeroSection onInitialLoadComplete={() => setInitialLoad(true)} />
          </div>
          <div className="relative bg-background">
            <div ref={productRef} id="product">
              <ProductSection />
            </div>
            <div ref={ingredientsRef} id="ingredients">
              <IngredientsSection />
            </div>
            <div ref={nutritionRef} id="nutrition">
              <NutritionSection />
            </div>
            <div ref={reviewsRef} id="reviews">
              <ReviewsSection />
            </div>
            <div ref={faqRef} id="faq">
              <FaqSection />
            </div>
            <div ref={contactRef} id="contact">
              <FinalCtaSection />
            </div>
            <Footer />
          </div>
        </main>
      </motion.div>
    </>
  );
}
