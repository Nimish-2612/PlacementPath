'use client';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePlacementData } from '@/context/placement-data-context';

export default function SuggestionsCard() {
    const { suggestions } = usePlacementData();

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-medium">Smart Suggestions</CardTitle>
        <CardDescription>AI-powered tips to guide you.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                    <Lightbulb className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-muted-foreground">{suggestion}</span>
                </li>
            ))}
            {suggestions.length === 0 && (
                 <p className="text-sm text-muted-foreground text-center py-4">You're on a roll! No immediate suggestions.</p>
            )}
        </ul>
      </CardContent>
    </Card>
  );
}
