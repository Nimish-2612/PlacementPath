'use client';

import { useState } from 'react';
import { usePlacementData } from '@/context/placement-data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { Calendar, Check, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ConsistencyScoreCard from '@/components/dashboard/consistency-score';


const ActivityHeatmap = ({ data }: { data: { date: string; dsaProblems: number }[] }) => {
    const endDate = new Date();
    const startDate = subDays(endDate, 34); // 5 weeks of squares
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const dataMap = new Map(data.map(item => [item.date, item.dsaProblems]));

    const getWeekDay = (date: Date) => {
        const day = date.getDay();
        return day === 0 ? 6 : day -1; // Monday starts at 0
    }
    
    const getColor = (count: number) => {
        if (count === 0) return 'bg-muted/50';
        if (count <= 2) return 'bg-primary/20';
        if (count <= 4) return 'bg-primary/50';
        return 'bg-primary/90';
    };

    return (
        <div>
            <div className="grid grid-cols-5 grid-rows-7 sm:grid-cols-7 sm:grid-rows-7 gap-1" style={{gridAutoFlow: 'column'}}>
            {days.map(day => {
                const dateString = format(day, 'yyyy-MM-dd');
                const count = dataMap.get(dateString) || 0;
                return (
                    <TooltipProvider key={dateString}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={`aspect-square rounded-sm ${getColor(count)}`} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{count} problems on {format(day, 'MMM d')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            })}
            </div>
        </div>
    )
}

export default function ProgressPage() {
    const { state, dispatch, weeklyConsistency } = usePlacementData();
    const { toast } = useToast();
    const [dsaProblems, setDsaProblems] = useState(0);
    const [studyHours, setStudyHours] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: 'LOG_ACTIVITY', payload: { dsaProblems, studyHours, topicsCompleted: 0 } });
        toast({
            title: 'Activity Logged',
            description: `You've logged ${dsaProblems} problems and ${studyHours} hours.`,
        });
        setDsaProblems(0);
        setStudyHours(0);
    };

    const weeklyChartData = eachDayOfInterval({ start: subDays(new Date(), 6), end: new Date() }).map(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const activity = state.weeklyActivity.find(a => a.date === dateStr);
        return {
            name: format(day, 'EEE'),
            Problems: activity?.dsaProblems || 0,
            Hours: activity?.studyHours || 0
        }
    });

    return (
    <div className="space-y-6">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Weekly Progress Tracker</h2>
            <p className="text-muted-foreground">Monitor your study habits and stay consistent.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
             <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Last 7 Days Activity</CardTitle>
                    <CardDescription>Problems solved and hours studied.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyChartData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                            <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                            <Legend />
                            <Bar dataKey="Problems" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Hours" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Log Today's Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="dsa-problems">DSA Problems Solved</Label>
                                <Input id="dsa-problems" type="number" value={dsaProblems} onChange={e => setDsaProblems(Number(e.target.value))} min="0" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="study-hours">Study Hours</Label>
                                <Input id="study-hours" type="number" value={studyHours} onChange={e => setStudyHours(Number(e.target.value))} min="0" step="0.5"/>
                            </div>
                            <Button type="submit" className="w-full">Log Activity</Button>
                        </form>
                    </CardContent>
                </Card>
                <ConsistencyScoreCard />
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>DSA Problem Heatmap</CardTitle>
                <CardDescription>Your problem-solving activity over the last 5 weeks.</CardDescription>
            </CardHeader>
            <CardContent>
                <ActivityHeatmap data={state.weeklyActivity} />
            </CardContent>
        </Card>
    </div>
    );
}
