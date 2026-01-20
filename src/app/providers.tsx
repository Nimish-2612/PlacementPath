'use client';

import * as React from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { PlacementDataProvider } from '@/context/placement-data-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PlacementDataProvider>{children}</PlacementDataProvider>
    </ThemeProvider>
  );
}
