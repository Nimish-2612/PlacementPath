'use client';
import { FolderGit2, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePlacementData } from '@/context/placement-data-context';
import { Badge } from '../ui/badge';

export default function ProjectsSummary() {
    const { projectsCompleted, projectConfidence } = usePlacementData();
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Projects</CardTitle>
        <CardDescription>Total projects added to your list.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{projectsCompleted}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <Star className="h-4 w-4" />
            <span>Avg. Confidence: </span>
            <Badge variant={projectConfidence === 'High' ? 'default' : projectConfidence === 'Medium' ? 'secondary' : 'destructive'} className={projectConfidence === 'High' ? 'bg-green-600' : ''}>
                {projectConfidence}
            </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
