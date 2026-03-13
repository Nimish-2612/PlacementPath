'use client';
import { usePlacementData } from '@/context/placement-data-context';

export function WelcomeHeader() {
    const { state } = usePlacementData();
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight">
                Welcome back, {state.userProfile.name}!
            </h2>
            <p className="text-muted-foreground">
                Here's a snapshot of your placement preparation progress.
            </p>
        </div>
    )
}
