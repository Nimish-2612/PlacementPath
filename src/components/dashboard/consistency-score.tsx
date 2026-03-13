'use client';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePlacementData } from '@/context/placement-data-context';
import { format, subDays } from 'date-fns';

export default function ConsistencyScoreCard() {
    const { weeklyConsistency, state } = usePlacementData();

    const activeDays = new Set(state.weeklyActivity.filter(a => {
        const activityDate = new Date(a.date);
        const sevenDaysAgo = subDays(new Date(), 7);
        return activityDate >= sevenDaysAgo;
    }).map(a => a.date)).size;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Weekly Consistency</CardTitle>
        <CardDescription>Your study habit score for last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{weeklyConsistency}%</div>
        <Progress value={weeklyConsistency} className="mt-2" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <Activity className="h-4 w-4"/>
            <span>You were active on {activeDays} of the last 7 days.</span>
        </div>
      </CardContent>
    </Card>
  );
}
