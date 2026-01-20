'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Milestone, Target, FolderGit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/roadmap', label: 'Roadmap', icon: Milestone },
  { href: '/dashboard/dsa', label: 'DSA Tracker', icon: Target },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderGit2 },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-2">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === href && 'bg-muted text-primary'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </div>
  );
}
