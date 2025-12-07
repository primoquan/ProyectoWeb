import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { SubscriptionStatus } from "@/components/subscription-status"
import { RecentContacts } from "@/components/recent-contacts"
import { LatestReviews } from "@/components/latest-reviews"
import { ProfileViewsChart } from "@/components/profile-views-chart"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      <div className="flex-1 lg:ml-64">
        <DashboardHeader title="Dashboard" />

        <main className="p-4 lg:p-8 space-y-8">
          <DashboardStats />

          <SubscriptionStatus />

          <div className="grid lg:grid-cols-2 gap-8">
            <RecentContacts />
            <LatestReviews />
          </div>

          <ProfileViewsChart />
        </main>
      </div>
    </div>
  )
}
