import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <div className="text-3xl font-bold tracking-tighter text-primary-foreground bg-primary px-4 py-2 rounded-lg inline-block mb-6">ZAZA</div>
        <div className="flex justify-center space-x-6 md:space-x-8 mb-8 text-sm">
          <Link href="#" className="transition-colors hover:text-primary">About</Link>
          <Link href="#" className="transition-colors hover:text-primary">Contact</Link>
          <Link href="#" className="transition-colors hover:text-primary">Privacy Policy</Link>
          <Link href="#" className="transition-colors hover:text-primary">Terms of Service</Link>
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-6 w-6 transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-6 w-6 transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-6 w-6 transition-colors hover:text-primary" />
          </Link>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Zaza. All rights reserved.</p>
      </div>
    </footer>
  );
}
