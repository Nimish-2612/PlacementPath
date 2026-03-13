'use client';

import { Award, Loader2, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePlacementData } from '@/context/placement-data-context';
import { Button } from '@/components/ui/button';

export default function ReadinessScoreCard() {
  const { readinessScoreResult: result, isReadinessScoreLoading: isLoading, calculateReadinessScore } = usePlacementData();

  const getStatus = (score: number) => {
    if (score > 70) return "Placement Ready";
    if (score > 40) return "On Track";
    return "Needs Improvement";
  };
  
  const status = result?.score ? getStatus(result.score) : "Not calculated";

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='flex flex-col items-center justify-center h-24 text-center'>
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p className="text-sm text-primary-foreground/80">Calculating your score...</p>
        </div>
      );
    }

    if (!result) {
      return (
        <div className='flex flex-col items-center justify-center h-24 text-center'>
            <p className="text-sm text-primary-foreground/80 mb-4">Click to generate your AI-powered readiness score.</p>
            <Button
              onClick={calculateReadinessScore}
              disabled={isLoading}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
                <Zap className="mr-2 h-4 w-4" />
                Calculate Score
            </Button>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-baseline">
            <div className="text-2xl font-bold">{result.score}/100</div>
            <Button 
                variant="ghost" 
                size="sm"
                onClick={calculateReadinessScore}
                disabled={isLoading}
                className="text-primary-foreground/80 hover:bg-white/20 hover:text-primary-foreground h-auto p-1"
            >
                Recalculate
            </Button>
        </div>
        <Progress value={result.score || 0} className="mt-2 h-2 [&>*]:bg-primary-foreground" />
        <div className="flex items-start gap-2 text-sm text-primary-foreground/90 mt-2">
            <Award className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{result.message}</span>
        </div>
      </>
    );
  };

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-primary-foreground/80">Placement Readiness</CardTitle>
        <CardDescription className="text-primary-foreground/70">{status}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
