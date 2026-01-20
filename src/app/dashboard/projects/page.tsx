'use client';

import { usePlacementData } from '@/context/placement-data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Star } from 'lucide-react';
import { AddProjectSheet } from '@/components/projects/add-project-sheet';
import { Badge } from '@/components/ui/badge';

export default function ProjectsPage() {
  const { state } = usePlacementData();

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
        case 'High': return 'bg-green-500';
        case 'Medium': return 'bg-yellow-500';
        case 'Low': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Portfolio</h2>
          <p className="text-muted-foreground">Showcase your skills with a strong project list.</p>
        </div>
        <AddProjectSheet>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
        </AddProjectSheet>
      </div>

      {state.projects.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20">
            <CardHeader>
                <CardTitle className="text-center">No Projects Yet</CardTitle>
                <CardDescription className="text-center">
                    Add your first project to get started.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AddProjectSheet>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                </AddProjectSheet>
            </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {state.projects.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className='flex justify-between items-start'>
                    {project.name}
                    <Badge variant={project.confidence === 'High' ? 'default' : project.confidence === 'Medium' ? 'secondary' : 'destructive'} className={getConfidenceColor(project.confidence)}>
                        {project.confidence}
                    </Badge>
                </CardTitle>
                <CardDescription>{project.techStack}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-1">
                    {project.confidence === 'High' && 
                        <span className='text-xs flex items-center gap-1 text-green-600 dark:text-green-400'>
                            <Star className="h-4 w-4" /> Placement Ready
                        </span>
                    }
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
