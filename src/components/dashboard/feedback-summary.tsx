'use client';
import { Star, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePlacementData } from '@/context/placement-data-context';

export default function FeedbackSummaryCard() {
    const { feedbackSummary } = usePlacementData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Summary</CardTitle>
        <CardDescription>Quick overview of user feedback.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-2'>
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Total Responses</span>
            </div>
            <span className="font-bold text-lg">{feedbackSummary.count}</span>
        </div>
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-2'>
                <Star className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Average Rating</span>
            </div>
            <span className="font-bold text-lg">{feedbackSummary.averageRating} / 5</span>
        </div>
        {feedbackSummary.count === 0 && (
            <p className="text-center text-muted-foreground pt-4">No feedback submitted yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
