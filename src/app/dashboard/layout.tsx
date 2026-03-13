'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MainNav, mainNavLinks } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { CheckinHandler } from '@/components/dashboard/checkin-handler';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg mb-4">
            <Compass className="h-7 w-7 text-primary" />
            <span className="font-headline">PlacementPath</span>
          </Link>
          <MainNav />
        </nav>
      </aside>

      <div className="flex flex-col sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-4 text-lg font-medium p-4">
                <Link
                  href="/dashboard"
                  className="group flex h-10 shrink-0 items-center gap-2 text-lg font-semibold"
                >
                  <Compass className="h-7 w-7 text-primary" />
                  <span className="font-headline">PlacementPath</span>
                </Link>
                {mainNavLinks.map(({ href, label, icon: Icon }) => (
                  <SheetClose asChild key={label}>
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname === href && 'bg-muted text-primary'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <CheckinHandler>{children}</CheckinHandler>
        </main>
      </div>
    </div>
  );
}
