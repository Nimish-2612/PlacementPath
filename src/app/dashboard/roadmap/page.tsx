'use client';
import { usePlacementData } from '@/context/placement-data-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function RoadmapPage() {
  const { state, dispatch } = usePlacementData();

  const dsaCategories = Array.from(new Set(state.dsaTopics.map(t => t.category)));
  const projectStages = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Placement Roadmap</h2>
        <p className="text-muted-foreground">Your step-by-step guide to placement readiness.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Core CS Subjects</CardTitle>
          <CardDescription>Foundational knowledge for any tech interview.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {state.coreCsTopics.map(topic => (
            <div key={topic.id} className="flex items-center space-x-2 p-4 rounded-lg bg-muted/50">
              <Checkbox
                id={topic.id}
                checked={topic.completed}
                onCheckedChange={(checked) =>
                  dispatch({ type: 'SET_CS_STATUS', payload: { id: topic.id, completed: !!checked } })
                }
              />
              <Label htmlFor={topic.id} className="text-base font-medium">
                {topic.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Data Structures & Algorithms</CardTitle>
            <CardDescription>Follow this path to build a strong DSA foundation.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {dsaCategories.map(category => (
                <AccordionItem value={category} key={category}>
                    <AccordionTrigger className="text-lg font-semibold">{category}</AccordionTrigger>
                    <AccordionContent className="pl-4">
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                        {state.dsaTopics.filter(t => t.category === category).map(topic => (
                        <li key={topic.id}>{topic.name}</li>
                        ))}
                    </ul>
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Progress through project complexity levels.</CardDescription>
        </CardHeader>
        <CardContent>
             <ul className="space-y-2 list-decimal list-inside text-lg">
                {projectStages.map(stage => (
                    <li key={stage} className="font-semibold">{stage} Level Projects</li>
                ))}
             </ul>
        </CardContent>
      </Card>
    </div>
  );
}
