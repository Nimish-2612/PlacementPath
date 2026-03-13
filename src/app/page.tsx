'use client';
import { LandingHeader } from '@/components/landing/landing-header';
import { LandingFooter } from '@/components/landing/landing-footer';
import {
  HeroSection,
  ProblemSection,
  SolutionSection,
  RoadmapShowcase,
  MentalSupportSection,
  FeatureHighlights,
  TestimonialsSection,
  CtaSection,
} from '@/components/landing/sections';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className={cn("bg-background text-foreground w-full overflow-x-hidden")}>
      <LandingHeader />
      <main className="isolate">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <RoadmapShowcase />
        <MentalSupportSection />
        <FeatureHighlights />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
