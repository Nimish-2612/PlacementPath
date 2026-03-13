'use client';
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePlacementData } from '@/context/placement-data-context';

export default function DsaProgressCard() {
    const { dsaCompletion, state } = usePlacementData();
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">DSA Progress</CardTitle>
        <CardDescription>Based on topics marked "Confident".</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{dsaCompletion}%</div>
        <Progress value={dsaCompletion} className="mt-2" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <Target className="h-4 w-4"/>
            <span>{Math.round(dsaCompletion/100 * state.dsaTopics.length)} of {state.dsaTopics.length} topics mastered</span>
        </div>
      </CardContent>
    </Card>
  );
}
