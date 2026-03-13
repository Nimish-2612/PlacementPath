'use client';

import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Milestone } from '@/lib/types';

interface PreparationGpsMapProps {
  readinessScore: number;
  milestones: Milestone[];
}

const CarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21.3663 10.4571C21.1396 9.81143 20.5057 9.33333 19.8095 9.33333H9.72857L11.5667 6.42381C11.9048 5.89524 11.7305 5.1619 11.2019 4.82381C10.6733 4.48571 9.94 4.6619 9.6019 5.19048L7.14762 9.33333H4.19048C3.5 9.33333 2.94286 9.89048 2.94286 10.581V16.8381C2.94286 17.5286 3.5 18.0857 4.19048 18.0857H5.28571C5.28571 19.3429 6.27619 20.3333 7.53333 20.3333C8.79048 20.3333 9.78095 19.3429 9.78095 18.0857H16.419C16.419 19.3429 17.4095 20.3333 18.6667 20.3333C19.9238 20.3333 20.9143 19.3429 20.9143 18.0857H21.7524C22.1048 18.0857 22.4 17.7905 22.4 17.4381V11.181C22.4 10.8286 22.2286 10.5143 21.9143 10.3524L21.3663 10.4571ZM7.53333 18.0857C7.18095 18.0857 6.89524 17.8 6.89524 17.4381C6.89524 17.0762 7.18095 16.7905 7.53333 16.7905C7.88571 16.7905 8.17143 17.0762 8.17143 17.4381C8.17143 17.8 7.88571 18.0857 7.53333 18.0857ZM18.6667 18.0857C18.3143 18.0857 18.0286 17.8 18.0286 17.4381C18.0286 17.0762 18.3143 16.7905 18.6667 16.7905C19.019 16.7905 19.3048 17.0762 19.3048 17.4381C19.3048 17.8 19.019 18.0857 18.6667 18.0857ZM4.19048 15.5429V10.581H6.94286L9.41905 15.5429H4.19048Z" />
    </svg>
);


export default function PreparationGpsMap({ readinessScore, milestones }: PreparationGpsMapProps) {
    const progress = readinessScore / 100;
    
    const path = "M 20 100 Q 150 100 200 50 T 400 100 T 600 50 T 800 100 T 1000 50 T 1180 100";
    const totalLength = 1160; 

    return (
        <TooltipProvider>
            <div className="w-full h-48 flex items-center justify-center overflow-x-auto overflow-y-hidden rounded-lg bg-muted/30 p-4">
                <svg width="1200" height="200" viewBox="0 0 1200 200" className="min-w-[1200px]">
                    <path
                        d={path}
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    <path
                        d={path}
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    <motion.path
                        d={path}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    
                    {milestones.map((milestone) => {
                        const x = (milestone.readinessThreshold / 100) * totalLength + 20;
                        const isCompleted = readinessScore >= milestone.readinessThreshold;

                        return (
                            <Tooltip key={milestone.name}>
                                <TooltipTrigger asChild>
                                    <g transform={`translate(${x}, 100)`}>
                                        <motion.circle
                                            cx="0"
                                            cy="0"
                                            r="12"
                                            fill={isCompleted ? "hsl(var(--primary))" : "hsl(var(--background))"}
                                            stroke="hsl(var(--primary))"
                                            strokeWidth="3"
                                            className="cursor-pointer"
                                            whileHover={{ scale: 1.2 }}
                                        />
                                        {isCompleted && (
                                            <path d="M -5 0 L -2 3 L 4 -4" stroke="hsl(var(--primary-foreground))" strokeWidth="2" fill="none" />
                                        )}
                                        <text x="0" y="30" textAnchor="middle" className="text-xs font-semibold fill-current text-muted-foreground">{milestone.name}</text>
                                    </g>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-bold">{milestone.name}</p>
                                    <p>Required Score: {milestone.readinessThreshold}%</p>
                                    <p>Est. Time: {milestone.estimatedTime}</p>
                                    {milestone.topics.length > 0 && <p className="text-xs mt-1">Topics: {milestone.topics.slice(0,3).join(', ')}...</p>}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                    
                    <motion.g
                        style={{ offsetPath: `path('${path}')` }}
                        initial={{ offsetDistance: '0%' }}
                        animate={{ offsetDistance: `${readinessScore}%` }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <foreignObject x="-12" y="-24" width="24" height="24">
                            <CarIcon className="w-6 h-6 text-primary" />
                        </foreignObject>
                    </motion.g>
                </svg>
            </div>
        </TooltipProvider>
    );
}
