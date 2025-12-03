'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, Loader2, Twitter, Instagram, Facebook } from 'lucide-react';
import { useParallax } from '@/hooks/use-parallax';
import { DRINK_VARIANTS } from '@/lib/drink-variants';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onInitialLoadComplete: () => void;
}

export default function HeroSection({ onInitialLoadComplete }: HeroSectionProps) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const currentVariant = DRINK_VARIANTS[variantIndex];
  const { canvasRef, isLoaded } = useParallax({
    sequenceUrl: currentVariant.sequenceUrl,
    frameCount: currentVariant.frameCount,
  });

  useEffect(() => {
    if (isLoaded) {
      if (isFirstLoad) {
        onInitialLoadComplete();
        setIsFirstLoad(false);
      }
      setIsSwitching(false);
    }
  }, [isLoaded, isFirstLoad, onInitialLoadComplete]);

  const handleSwitch = useCallback((direction: 'next' | 'prev') => {
    if (isSwitching) return;
    setIsSwitching(true);
    
    setVariantIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % DRINK_VARIANTS.length;
      } else {
        return (prevIndex - 1 + DRINK_VARIANTS.length) % DRINK_VARIANTS.length;
      }
    });
  }, [isSwitching]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center">
          {/* Left Side Content */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={variantIndex}
                variants={textVariants}
                initial="hidden"
                animate={!isSwitching ? "visible" : "exit"}
                exit="exit"
              >
                <div className="mb-4">
                  <h1 className="text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-primary leading-none">
                    {currentVariant.name}
                  </h1>
                  <p className="text-4xl md:text-5xl font-thin uppercase tracking-widest text-primary">
                    {currentVariant.subtitle}
                  </p>
                </div>
                <p className="max-w-md text-base text-muted-foreground mb-8">
                  {currentVariant.description}
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="lg" className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    ADD TO
                  </Button>
                  <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                    CART
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side Variant Navigation */}
          <div className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 flex items-center space-x-4 md:space-x-8">
            <div className="relative flex items-center">
              <span className="text-7xl md:text-8xl lg:text-9xl font-black text-primary/50 tabular-nums">
                {String(variantIndex + 1).padStart(2, '0')}
              </span>
              {isSwitching && <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 animate-spin text-primary" />}
            </div>
            <div className="flex flex-col items-center space-y-4">
              <button onClick={() => handleSwitch('prev')} disabled={isSwitching} className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-50">
                <span className="text-xs uppercase">PREV</span>
                <ArrowUp className="h-5 w-5 mx-auto" />
              </button>
              <div className="h-16 w-px bg-border"></div>
              <button onClick={() => handleSwitch('next')} disabled={isSwitching} className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-50">
                <ArrowDown className="h-5 w-5 mx-auto" />
                <span className="text-xs uppercase">NEXT</span>
              </button>
            </div>
          </div>

          {/* Bottom Center Social Icons */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6">
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
