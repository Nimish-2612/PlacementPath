'use client';

import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePlacementData } from '@/context/placement-data-context';

export default function CoreSubjectsCard() {
    const { coreCsCompletion, state } = usePlacementData();
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Core CS Coverage</CardTitle>
        <CardDescription>Fundamental subjects completed.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{coreCsCompletion}%</div>
        <Progress value={coreCsCompletion} className="mt-2" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <BookOpen className="h-4 w-4"/>
            <span>{Math.round(coreCsCompletion/100 * state.coreCsTopics.length)} of {state.coreCsTopics.length} subjects covered</span>
        </div>
      </CardContent>
    </Card>
  );
}
