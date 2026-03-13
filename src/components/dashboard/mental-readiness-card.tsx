'use client';

import * as React from 'react';
import { HeartPulse, Smile, Meh, Frown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePlacementData } from '@/context/placement-data-context';
import { cn } from '@/lib/utils';
import type { MentalReadinessStatus } from '@/lib/types';

const statusConfig: Record<MentalReadinessStatus, { icon: React.ElementType, color: string, bgColor: string }> = {
    'Low Stress': {
        icon: Smile,
        color: 'text-green-600',
        bgColor: 'bg-green-500',
    },
    'Moderate Stress': {
        icon: Meh,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-500',
    },
    'High Burnout Risk': {
        icon: Frown,
        color: 'text-red-600',
        bgColor: 'bg-red-500',
    }
};

export default function MentalReadinessCard() {
  const { mentalReadiness } = usePlacementData();

  if (!mentalReadiness) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mental Readiness</CardTitle>
                <CardDescription>Your weekly well-being check.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-col items-center justify-center text-center py-4">
                    <HeartPulse className="h-10 w-10 text-muted-foreground mb-2"/>
                    <p className="font-semibold">No Data Yet</p>
                    <p className="text-sm text-muted-foreground">Complete your first weekly check-in.</p>
                </div>
            </CardContent>
        </Card>
    )
  }
  
  const { score, status, recommendation } = mentalReadiness;
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Mental Readiness</CardTitle>
        <CardDescription className={cn("font-semibold", config.color)}>{status}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{score}%</div>
        <Progress value={score} className="mt-2" indicatorClassName={config.bgColor} />
        <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
            <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", config.color)} />
            <span>{recommendation}</span>
        </div>
      </CardContent>
    </Card>
  );
}
