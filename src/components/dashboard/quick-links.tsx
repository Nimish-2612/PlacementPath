import Link from "next/link";
import { Milestone, Target, FolderGit2, ArrowRight, LayoutGrid, LineChart, MessageSquare, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const links = [
    {
      title: "Update DSA Progress",
      description: "Mark topics as you master them.",
      icon: Target,
      href: "/dashboard/dsa",
    },
    {
      title: "Analyze Skill Gaps",
      description: "Identify missing skills for your target role.",
      icon: LayoutGrid,
      href: "/dashboard/skill-gap",
    },
    {
      title: "Manage Projects",
      description: "Add or edit your portfolio projects.",
      icon: FolderGit2,
      href: "/dashboard/projects",
    },
  ];

export function QuickLinksCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {links.map((link) => (
          <Link href={link.href} key={link.title} className="flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-muted">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-md">
                <link.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{link.title}</p>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
