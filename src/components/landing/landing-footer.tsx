import Link from "next/link";
import { Compass } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl mb-4 md:mb-0">
            <Compass className="h-7 w-7 text-primary" />
            <span>PlacementPath</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#" className="hover:text-primary transition-colors">About</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PlacementPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
