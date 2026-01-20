import DsaProgress from "@/components/dashboard/dsa-progress";
import ProjectsSummary from "@/components/dashboard/projects-summary";
import CsCoverage from "@/components/dashboard/cs-coverage";
import ReadinessScore from "@/components/dashboard/readiness-score";
import { QuickLinks } from "@/components/dashboard/quick-links";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeHeader />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DsaProgress />
        <CsCoverage />
        <ProjectsSummary />
        <ReadinessScore />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <QuickLinks />
        </div>
        <div className="lg:col-span-3">
          {/* Another component can go here, maybe recent activity */}
        </div>
      </div>
    </div>
  );
}
