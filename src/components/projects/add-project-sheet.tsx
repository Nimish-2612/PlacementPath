'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Project, ProjectConfidence } from '@/lib/types';
import { usePlacementData } from '@/context/placement-data-context';
import { useToast } from '@/hooks/use-toast';

export function AddProjectSheet({ children }: { children: React.ReactNode }) {
  const { dispatch } = usePlacementData();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [techStack, setTechStack] = useState('');
  const [confidence, setConfidence] = useState<ProjectConfidence | ''>('');

  const handleSubmit = () => {
    if (!name || !techStack || !confidence) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill out all fields to add a project.',
        variant: 'destructive',
      });
      return;
    }
    dispatch({ type: 'ADD_PROJECT', payload: { name, techStack, confidence } });
    toast({
      title: 'Project Added',
      description: `"${name}" has been added to your portfolio.`,
    });
    // Reset form
    setName('');
    setTechStack('');
    setConfidence('');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a New Project</SheetTitle>
          <SheetDescription>
            Fill in the details of your project. This will be used to calculate your readiness score.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tech-stack" className="text-right">Tech Stack</Label>
            <Input id="tech-stack" value={techStack} onChange={e => setTechStack(e.target.value)} placeholder="e.g., React, Node.js, ..." className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confidence" className="text-right">Confidence</Label>
            <Select onValueChange={(value: ProjectConfidence) => setConfidence(value)} value={confidence || undefined}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select your confidence level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleSubmit}>Save Project</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
