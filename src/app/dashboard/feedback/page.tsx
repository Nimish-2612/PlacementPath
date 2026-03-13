'use client';

import { useState } from 'react';
import { usePlacementData } from '@/context/placement-data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import FeedbackSummaryCard from '@/components/dashboard/feedback-summary';

export default function FeedbackPage() {
  const { dispatch } = usePlacementData();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(0);
  const [feature, setFeature] = useState('');
  const [improvement, setImprovement] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !year || rating === 0 || !feature || !improvement) {
        toast({
            title: 'Missing Fields',
            description: 'Please fill out all fields to submit feedback.',
            variant: 'destructive'
        });
        return;
    }
    dispatch({ type: 'ADD_FEEDBACK', payload: { name, year, rating, feature, improvement } });
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your valuable input!',
    });
    // Reset form
    setName('');
    setYear('');
    setRating(0);
    setFeature('');
    setImprovement('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Feedback & Suggestions</h2>
        <p className="text-muted-foreground">Help us improve PlacementPath.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>Your thoughts are important to us.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <Input id="year" value={year} onChange={e => setYear(e.target.value)} />
                </div>
              </div>
              
              <div className="space-y-3">
                  <Label>Overall Rating</Label>
                  <RadioGroup onValueChange={(v) => setRating(parseInt(v))} value={rating ? String(rating) : undefined} className="flex space-x-4">
                      {[1, 2, 3, 4, 5].map(v => (
                          <div key={v} className="flex items-center space-x-2">
                              <RadioGroupItem value={String(v)} id={`r-${v}`} />
                              <Label htmlFor={`r-${v}`}>{v}</Label>
                          </div>
                      ))}
                  </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feature">Which feature helped you the most?</Label>
                <Select value={feature} onValueChange={setFeature}>
                    <SelectTrigger id="feature">
                        <SelectValue placeholder="Select a feature" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Dashboard">Dashboard Overview</SelectItem>
                        <SelectItem value="Roadmap">Roadmap</SelectItem>
                        <SelectItem value="DSA Tracker">DSA Tracker</SelectItem>
                        <SelectItem value="Skill Gap Analyzer">Skill Gap Analyzer</SelectItem>
                        <SelectItem value="AI Readiness Score">AI Readiness Score</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="improvement">What should we improve?</Label>
                <Textarea id="improvement" value={improvement} onChange={e => setImprovement(e.target.value)} />
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-1">
            <FeedbackSummaryCard />
        </div>
      </div>
    </div>
  );
}
