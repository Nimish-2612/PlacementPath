import DsaProgressCard from "@/components/dashboard/dsa-progress";
import ProjectsSummaryCard from "@/components/dashboard/projects-summary";
import CoreSubjectsCard from "@/components/dashboard/cs-coverage";
import ReadinessScoreCard from "@/components/dashboard/readiness-score";
import { QuickLinksCard } from "@/components/dashboard/quick-links";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import WeakestAreaCard from "@/components/dashboard/weakest-area";
import ConsistencyScoreCard from "@/components/dashboard/consistency-score";
import SuggestionsCard from "@/components/dashboard/suggestions-card";
import FeedbackSummaryCard from "@/components/dashboard/feedback-summary";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeHeader />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DsaProgressCard />
        <CoreSubjectsCard />
        <ProjectsSummaryCard />
        <ReadinessScoreCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <WeakestAreaCard />
        <ConsistencyScoreCard />
        <SuggestionsCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <QuickLinksCard />
        </div>
        <div className="lg:col-span-3">
          <FeedbackSummaryCard />
        </div>
      </div>
    </div>
  );
}
