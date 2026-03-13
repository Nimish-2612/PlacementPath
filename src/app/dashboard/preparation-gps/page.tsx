'use client';

import { usePlacementData } from '@/context/placement-data-context';
import { runPlacementReadinessScore } from '@/app/dashboard/actions';
import type { PlacementReadinessScoreOutput } from '@/ai/flows/placement-readiness-score';
import { useEffect, useState, useMemo } from 'react';

import PreparationGpsMap from '@/components/gps/preparation-gps-map';
import WeakestAreaCard from '@/components/dashboard/weakest-area';
import ConsistencyScoreCard from '@/components/dashboard/consistency-score';
import NextMilestoneCard from '@/components/gps/next-milestone-card';
import { MILESTONES } from '@/lib/milestones';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function PreparationGpsPage() {
  const { dsaCompletion, coreCsCompletion, projectConfidence, weeklyConsistency, state } = usePlacementData();
  const { resumeReady } = state.userProfile;
  const [readinessResult, setReadinessResult] = useState<PlacementReadinessScoreOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function calculateScore() {
      setIsLoading(true);
      try {
        const scoreResult = await runPlacementReadinessScore({
          dsaCompletion,
          coreCsCompletion,
          projectConfidence,
          weeklyConsistency,
          resumeReady,
        });
        setReadinessResult(scoreResult);
      } catch (error) {
        console.error("Failed to calculate readiness score:", error);
        setReadinessResult({ score: 0, message: "Error calculating score." });
      } finally {
        setIsLoading(false);
      }
    }
    calculateScore();
  }, [dsaCompletion, coreCsCompletion, projectConfidence, weeklyConsistency, resumeReady]);

  const readinessScore = readinessResult?.score ?? 0;

  const { nextMilestone } = useMemo(() => {
    const sortedMilestones = [...MILESTONES].sort((a, b) => a.readinessThreshold - b.readinessThreshold);
    let current = sortedMilestones[0];
    let next = sortedMilestones[1];

    for (let i = 0; i < sortedMilestones.length; i++) {
      if (readinessScore >= sortedMilestones[i].readinessThreshold) {
        if (i + 1 < sortedMilestones.length) {
          next = sortedMilestones[i + 1];
        } else {
          next = sortedMilestones[i]; // Reached the end
        }
      } else {
        break;
      }
    }
    return { nextMilestone: next };
  }, [readinessScore]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg">Loading your GPS...</p>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Preparation GPS</h2>
        <p className="text-muted-foreground">Your visual journey to placement readiness.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Your Roadmap</CardTitle>
            <CardDescription>You are currently <span className="font-bold text-primary">{readinessScore}%</span> placement ready. Keep going!</CardDescription>
        </CardHeader>
        <CardContent>
            <PreparationGpsMap readinessScore={readinessScore} milestones={MILESTONES} />
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NextMilestoneCard nextMilestone={nextMilestone} />
        <WeakestAreaCard />
        <ConsistencyScoreCard />
      </div>
    </div>
  );
}
