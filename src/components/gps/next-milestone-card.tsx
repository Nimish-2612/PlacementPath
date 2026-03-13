'use client';

import type { Milestone } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flag } from 'lucide-react';
import Link from 'next/link';

interface NextMilestoneCardProps {
  nextMilestone: Milestone;
}

export default function NextMilestoneCard({ nextMilestone }: NextMilestoneCardProps) {
    const isFinalMilestone = nextMilestone.readinessThreshold >= 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            Next Milestone
        </CardTitle>
        <CardDescription>
            {isFinalMilestone ? "You're approaching the finish line!" : "Your next major goal on the roadmap."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">{nextMilestone.name}</h3>
            <div className="text-sm text-muted-foreground">
                <p>Reach this by achieving a <span className="font-semibold text-foreground">{nextMilestone.readinessThreshold}%</span> readiness score.</p>
                {nextMilestone.topics.length > 0 && !isFinalMilestone && (
                    <p className="mt-1">Focus on topics like: {nextMilestone.topics[0]}, {nextMilestone.topics[1]}...</p>
                )}
            </div>
            <Button asChild variant="outline">
                <Link href="/dashboard/roadmap">
                    View Roadmap Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
