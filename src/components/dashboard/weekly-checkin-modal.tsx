'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { usePlacementData } from '@/context/placement-data-context';
import type { StressLevel, ConfidenceLevel } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '../ui/switch';

interface WeeklyCheckinModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const stressLevels: StressLevel[] = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
const confidenceLevels: ConfidenceLevel[] = ['Very Confident', 'Confident', 'Neutral', 'Not Confident', 'Very Anxious'];


export function WeeklyCheckinModal({ isOpen, onOpenChange }: WeeklyCheckinModalProps) {
  const { dispatch } = usePlacementData();
  const { toast } = useToast();

  const [stressLevel, setStressLevel] = useState<StressLevel | undefined>();
  const [confidenceLevel, setConfidenceLevel] = useState<ConfidenceLevel | undefined>();
  const [studyHours, setStudyHours] = useState<number>(0);
  const [overwhelmed, setOverwhelmed] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!stressLevel || !confidenceLevel) {
      toast({
        title: 'Missing Fields',
        description: 'Please answer all questions to complete your check-in.',
        variant: 'destructive',
      });
      return;
    }

    dispatch({
      type: 'ADD_MENTAL_CHECKIN',
      payload: {
        stressLevel,
        confidenceLevel,
        studyHours: Number(studyHours) || 0,
        overwhelmed,
      },
    });

    toast({
      title: 'Check-in Complete!',
      description: "Thanks for sharing. Your mental readiness has been updated.",
    });

    // Reset form and close modal
    setStressLevel(undefined);
    setConfidenceLevel(undefined);
    setStudyHours(0);
    setOverwhelmed(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Weekly Mental Check-in</DialogTitle>
          <DialogDescription>
            Let's see how you're feeling. This helps us give you better support.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>How stressed are you about placements?</Label>
            <RadioGroup onValueChange={(v: StressLevel) => setStressLevel(v)} value={stressLevel} className="flex flex-wrap gap-x-4 gap-y-2">
                {stressLevels.map(v => (
                    <div key={v} className="flex items-center space-x-2">
                        <RadioGroupItem value={v} id={`stress-${v}`} />
                        <Label htmlFor={`stress-${v}`} className="font-normal">{v}</Label>
                    </div>
                ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label>How confident do you feel about your preparation?</Label>
            <RadioGroup onValueChange={(v: ConfidenceLevel) => setConfidenceLevel(v)} value={confidenceLevel} className="flex flex-wrap gap-x-4 gap-y-2">
                {confidenceLevels.map(v => (
                    <div key={v} className="flex items-center space-x-2">
                        <RadioGroupItem value={v} id={`conf-${v}`} />
                        <Label htmlFor={`conf-${v}`} className="font-normal">{v}</Label>
                    </div>
                ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="study-hours">Roughly how many hours did you study this week?</Label>
            <Input id="study-hours" type="number" value={studyHours} onChange={e => setStudyHours(Number(e.target.value))} min="0" />
          </div>
          
          <div className="flex items-center space-x-3 rounded-md border p-4">
            <Switch id="overwhelmed" checked={overwhelmed} onCheckedChange={setOverwhelmed} />
            <Label htmlFor="overwhelmed">Did you feel exhausted or overwhelmed this week?</Label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit Check-in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
