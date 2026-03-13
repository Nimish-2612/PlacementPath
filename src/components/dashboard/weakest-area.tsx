'use client';
import { AlertTriangle, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePlacementData } from '@/context/placement-data-context';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function WeakestAreaCard() {
    const { weakestDsaCategory } = usePlacementData();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Weakest Skill Area</CardTitle>
        <CardDescription>Your biggest opportunity for growth.</CardDescription>
      </CardHeader>
      <CardContent>
        {weakestDsaCategory ? (
            <>
                <div className="text-2xl font-bold flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    {weakestDsaCategory}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    This is calculated based on your "Confident" topics in the DSA tracker.
                </p>
                <Button variant="link" asChild className="p-0 h-auto mt-2">
                    <Link href="/dashboard/dsa">Update DSA Progress &rarr;</Link>
                </Button>
            </>
        ) : (
             <div className="flex flex-col items-center justify-center text-center py-4">
                <BrainCircuit className="h-10 w-10 text-muted-foreground mb-2"/>
                <p className="font-semibold">No Weakness Detected</p>
                <p className="text-sm text-muted-foreground">Keep up the great work!</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
