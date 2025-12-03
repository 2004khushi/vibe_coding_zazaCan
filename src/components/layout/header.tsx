'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SectionRefs } from '@/app/page';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';


interface HeaderProps {
  activeSection: string;
  sectionRefs: SectionRefs;
}

const navItems = [
  { id: 'product', label: 'Product' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ activeSection, sectionRefs }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    sectionRefs[id]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setIsMobileMenuOpen(false);
  };

  const NavLinks = ({isMobile = false}: {isMobile?: boolean}) => (
    <nav className={cn(
      "flex items-center",
      isMobile ? "flex-col space-y-4 pt-8" : "space-x-8"
    )}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleScroll(item.id)}
          className={cn(
            'text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative',
            isMobile ? 'text-lg' : '',
            'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300',
            activeSection === item.id ? 'after:scale-x-100 text-primary' : 'after:scale-x-0'
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-primary-foreground bg-primary px-3 py-1 rounded-md">
            ZAZA
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
             <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <div className="text-left text-2xl font-bold tracking-tighter text-primary-foreground bg-primary px-3 py-1 rounded-md w-fit">
                    ZAZA
                  </div>
                </SheetHeader>
                <div className="mt-8">
                  <NavLinks isMobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
