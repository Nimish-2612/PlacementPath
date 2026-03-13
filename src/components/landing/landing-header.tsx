'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export const LandingHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Animate the header in
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Compass className="h-7 w-7 text-primary" />
          <span>PlacementPath</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="#features">Features</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#testimonials">Testimonials</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
        <div className='md:hidden'>
            <Button asChild>
                <Link href="/login">Get Started</Link>
            </Button>
        </div>
      </div>
    </header>
  );
};
