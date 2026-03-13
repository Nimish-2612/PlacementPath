'use client';

import { useEffect, useState } from 'react';
import { Award, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePlacementData } from '@/context/placement-data-context';
import { runPlacementReadinessScore } from '@/app/dashboard/actions';
import type { PlacementReadinessScoreOutput } from '@/ai/flows/placement-readiness-score';

export default function ReadinessScoreCard() {
  const { dsaCompletion, coreCsCompletion, projectConfidence, weeklyConsistency, state } = usePlacementData();
  const { resumeReady } = state.userProfile;
  const [result, setResult] = useState<PlacementReadinessScoreOutput | null>(null);
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
        setResult(scoreResult);
      } catch (error) {
        console.error("Failed to calculate readiness score:", error);
        setResult({ score: 0, message: "Error calculating score." });
      } finally {
        setIsLoading(false);
      }
    }
    calculateScore();
  }, [dsaCompletion, coreCsCompletion, projectConfidence, weeklyConsistency, resumeReady]);

  const getStatus = (score: number) => {
    if (score > 70) return "Placement Ready";
    if (score > 40) return "On Track";
    return "Needs Improvement";
  };
  
  const status = result?.score ? getStatus(result.score) : "Calculating...";

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-primary-foreground/80">Placement Readiness</CardTitle>
        <CardDescription className="text-primary-foreground/70">{status}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <div className='flex items-center justify-center h-24'>
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : (
            <>
                <div className="text-2xl font-bold">{result?.score}/100</div>
                <Progress value={result?.score || 0} className="mt-2 h-2 [&>*]:bg-primary-foreground" />
                <div className="flex items-start gap-2 text-sm text-primary-foreground/90 mt-2">
                    <Award className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{result?.message}</span>
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
}
