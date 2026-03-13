'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Users, BrainCircuit, Heart, BarChart, LayoutGrid, FolderGit2, Target, MoveRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import PreparationGpsMap from '../gps/preparation-gps-map';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const heading = element.querySelector('h2');
    const contentElements = Array.from(element.querySelectorAll('h2 ~ *'));

    const ctx = gsap.context(() => {
      if (heading) {
        gsap.from(heading, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      if (contentElements.length) {
        // Target inner cards or direct children for staggered animation
        const animateItems = contentElements.length === 1 && contentElements[0].classList.contains('grid')
          ? Array.from(contentElements[0].children)
          : contentElements;

        gsap.from(animateItems, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentElements[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={sectionRef} id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;
    
    // Split text into words for animation
    const words = headline.innerText.split(' ');
    headline.innerHTML = words.map(word => `<span class="inline-block translate-y-full">${word}</span>`).join(' ');
    
    const wordSpans = headline.children;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});
    
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.2
    })
    .to(wordSpans, {
      y: 0,
      stagger: 0.05,
      duration: 1,
    }, "-=0.3")
    .to(sublineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, "-=0.8")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, "-=0.6");
    
  }, []);

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-neutral-950 dark:bg-[linear-gradient(to_right,#f0f0f0_0.1px,transparent_0.1px),linear-gradient(to_bottom,#f0f0f0_0.1px,transparent_0.1px)]"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#fbe9d7,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#332211,transparent)] -z-10"></div>
      <div className="container mx-auto px-4">
        <Badge ref={badgeRef} variant="outline" className="mb-4 text-primary border-primary bg-primary/10 opacity-0 -translate-y-4">Your Personal Guide to Placement Success</Badge>
        <h1 ref={headlineRef} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground [&>span]:mr-3 overflow-hidden">
          Placement prep shouldn’t be overwhelming.
        </h1>
        <p ref={sublineRef} className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 opacity-0 translate-y-4">
          PlacementPath guides you step-by-step with a smart roadmap, progress tracking, and psychological support to help you land your dream job with confidence.
        </p>
        <div ref={buttonsRef} className="flex justify-center gap-4 opacity-0 translate-y-4">
          <Button size="lg" asChild>
            <Link href="/signup">Get Started Free <MoveRight className="ml-2"/></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Explore Features</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};


export const ProblemSection = () => {
    const problems = [
        { title: "No Clear Path", description: "Jumping between tutorials and topics with no clear structure or end goal in sight." },
        { title: "Constant Pressure", description: "Rankings and competitive platforms create anxiety, making learning feel like a race." },
        { title: "Uncertain Progress", description: "It's hard to know if you're truly making progress or just staying busy." },
    ]
    return (
        <AnimatedSection className="bg-muted/40">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Placement Prep is Exhausting</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-12">Most placement tools only test you. They don’t guide you.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, i) => (
                        <Card key={i} className="text-left">
                            <CardHeader>
                                <CardTitle>{problem.title}</CardTitle>
                                <CardDescription>{problem.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    )
};


export const SolutionSection = () => {
  const solutions = [
    { icon: <Compass className="h-8 w-8 text-primary"/>, title: "Interactive Preparation GPS", description: "A visual journey of your preparation progress, so you always know where you are and what's next." },
    { icon: <LayoutGrid className="h-8 w-8 text-primary"/>, title: "Placement Readiness Dashboard", description: "See your readiness score and get a clear, holistic view of where you stand at a glance." },
    { icon: <BrainCircuit className="h-8 w-8 text-primary"/>, title: "Skill Gap Analyzer", description: "Stop guessing. We tell you exactly what skills are missing for your target role and what to learn next." },
    { icon: <Heart className="h-8 w-8 text-primary"/>, title: "Psychological Support", description: "Reduce anxiety and build confidence with streaks, encouragement, and a focus on personal growth." },
  ];
  return (
    <AnimatedSection id="features">
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A system that guides you, not judges you.</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-12">PlacementPath is designed to reduce stress and provide clarity.</p>
            <div className="grid md:grid-cols-2 gap-8">
                {solutions.map((solution, i) => (
                    <Card key={i} className="text-left h-full group hover:border-primary transition-all duration-300 hover:-translate-y-1.5">
                        <CardHeader>
                            {solution.icon}
                            <CardTitle className="mt-4">{solution.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{solution.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </AnimatedSection>
  );
};

export const RoadmapShowcase = () => (
    <AnimatedSection className="bg-muted/40">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your preparation journey, visualized.</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-12">The Preparation GPS turns your hard work into a tangible journey, making progress feel rewarding and motivating.</p>
        <div className="rounded-lg border bg-background/50 p-4">
             <PreparationGpsMap readinessScore={65} milestones={[
                  { name: 'Start', readinessThreshold: 0, topics: [], estimatedTime: 'N/A' },
                  { name: 'Arrays', readinessThreshold: 20, topics: [], estimatedTime: '2 weeks' },
                  { name: 'Trees', readinessThreshold: 50, topics: [], estimatedTime: '3 weeks' },
                  { name: 'Graphs', readinessThreshold: 70, topics: [], estimatedTime: '3 weeks' },
                  { name: 'Ready', readinessThreshold: 100, topics: [], estimatedTime: 'Go!' },
                ]} />
        </div>
      </div>
    </AnimatedSection>
);

export const MentalSupportSection = () => (
    <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">It's not just about skills.</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-12">PlacementPath is built to support your mental well-being throughout the demanding preparation process.</p>
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="relative overflow-hidden group">
                    <CardHeader><CardTitle>Confidence Tracking</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">Rate your confidence on topics and projects to see your self-assurance grow.</p></CardContent>
                    <div className="absolute -bottom-4 -right-4 size-24 bg-primary/10 rounded-full group-hover:scale-[8] transition-transform duration-500 ease-in-out -z-10"></div>
                </Card>
                <Card className="relative overflow-hidden group">
                    <CardHeader><CardTitle>Motivation Reminders</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">Maintain momentum with weekly consistency scores and activity heatmaps.</p></CardContent>
                    <div className="absolute -bottom-4 -right-4 size-24 bg-primary/10 rounded-full group-hover:scale-[8] transition-transform duration-500 ease-in-out -z-10"></div>
                </Card>
                <Card className="relative overflow-hidden group">
                    <CardHeader><CardTitle>Progress Encouragement</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">Get AI-powered suggestions and celebrate milestones as you hit them.</p></CardContent>
                    <div className="absolute -bottom-4 -right-4 size-24 bg-primary/10 rounded-full group-hover:scale-[8] transition-transform duration-500 ease-in-out -z-10"></div>
                </Card>
            </div>
        </div>
    </AnimatedSection>
);

export const FeatureHighlights = () => {
    const features = [
        { icon: <Target className="w-6 h-6"/>, label: "DSA Tracker"},
        { icon: <FolderGit2 className="w-6 h-6"/>, label: "Project Scoring"},
        { icon: <BarChart className="w-6 h-6"/>, label: "Progress Analytics"},
        { icon: <LayoutGrid className="w-6 h-6"/>, label: "Skill Gap Detection"},
        { icon: <Users className="w-6 h-6"/>, label: "User Profiles"},
        { icon: <BrainCircuit className="w-6 h-6"/>, label: "AI Readiness Score"},
    ]
    return (
        <AnimatedSection className="bg-muted/40">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Everything you need, in one place.</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {features.map(feature => (
                    <div key={feature.label} className="flex flex-col items-center gap-3 text-center">
                        <div className="p-4 bg-background rounded-full border shadow-sm">{feature.icon}</div>
                        <p className="font-semibold text-sm">{feature.label}</p>
                    </div>
                ))}
                </div>
            </div>
        </AnimatedSection>
    );
}

export const TestimonialsSection = () => {
  const testimonials = [
    { name: "Anjali S.", role: "SDE @ Amazon", quote: "PlacementPath finally helped me understand what to study next. The GPS view was a game-changer for my motivation." },
    { name: "Rohan M.", role: "Backend Developer", quote: "Seeing my readiness score go up was so reassuring. It massively reduced my placement anxiety." },
    { name: "Priya K.", role: "Placed at Google", quote: "I used to feel lost with so many resources. This tool gave me the structure I desperately needed." },
    { name: "Vikram G.", role: "Final Year Student", quote: "The skill-gap analyzer is brilliant. It told me to focus on Graphs, and that's exactly what I was asked in my interviews." },
  ];
  return (
    <AnimatedSection id="testimonials">
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Loved by students who got placed.</h2>
            <Carousel
                opts={{ align: "start", loop: true, }}
                className="w-full"
            >
                <CarouselContent>
                {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                        <Card className="flex flex-col justify-between h-full">
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground">"{testimonial.quote}"</p>
                            </CardContent>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
    </AnimatedSection>
  );
};


export const CtaSection = () => (
    <AnimatedSection className="bg-muted/40">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Start your placement journey today.</h2>
            <p className="text-xl text-muted-foreground mb-10">Clarity. Confidence. Progress.</p>
            <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                    <Link href="/signup">Sign Up for Free</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                    <Link href="/login">Log In</Link>
                </Button>
            </div>
        </div>
    </AnimatedSection>
);
