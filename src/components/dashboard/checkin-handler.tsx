'use client';

import { useState, useEffect } from 'react';
import { usePlacementData } from '@/context/placement-data-context';
import { WeeklyCheckinModal } from '@/components/dashboard/weekly-checkin-modal';

export function CheckinHandler({ children }: { children: React.ReactNode }) {
  const { state } = usePlacementData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if it has been 7 days since the last check-in
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    
    if (!state.lastCheckinTimestamp || (now - state.lastCheckinTimestamp > oneWeek)) {
      // Use a timeout to avoid showing the modal immediately on load, which can be jarring.
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [state.lastCheckinTimestamp]);

  return (
    <>
      <WeeklyCheckinModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      {children}
    </>
  );
}
