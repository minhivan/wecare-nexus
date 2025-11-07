import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { DonationChart } from "@/components/dashboard/DonationChart";
import { RecentDonations } from "@/components/dashboard/RecentDonations";
import { DollarSign, Heart, Users, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout title="Overview" subtitle="Monitor your fundraising performance">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Raised"
            value="$142,850"
            change="+12.5%"
            trend="up"
            icon={DollarSign}
            color="emerald"
          />
          <KPICard
            title="Active Campaigns"
            value="24"
            change="+4"
            trend="up"
            icon={Heart}
            color="cyan"
          />
          <KPICard
            title="Total Donors"
            value="1,428"
            change="+18.2%"
            trend="up"
            icon={Users}
            color="amber"
          />
          <KPICard
            title="Avg. Donation"
            value="$328"
            change="+8.4%"
            trend="up"
            icon={TrendingUp}
            color="fire-orange"
          />
        </div>

        {/* Chart */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DonationChart />
          </div>
          <div className="glass rounded-2xl p-6 animate-slide-up border border-white/60">
            <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Campaign Success Rate</span>
                <span className="text-sm font-semibold">87.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recurring Donors</span>
                <span className="text-sm font-semibold">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Livestream Views</span>
                <span className="text-sm font-semibold">12.4K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Community Members</span>
                <span className="text-sm font-semibold">5,823</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Donations Table */}
        <RecentDonations />
      </div>
    </DashboardLayout>
  );
};

export default Index;
