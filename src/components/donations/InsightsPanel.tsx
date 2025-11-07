import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Donation } from "@/pages/Donations";

interface InsightsPanelProps {
  donations: Donation[];
}

export const InsightsPanel = ({ donations }: InsightsPanelProps) => {
  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const completedDonations = donations.filter((d) => d.status === "completed");
  const refundRate = (donations.filter((d) => d.status === "refunded").length / donations.length) * 100;

  // Calculate top campaigns
  const campaignTotals = donations.reduce((acc, d) => {
    const key = d.campaign.id;
    if (!acc[key]) {
      acc[key] = { name: d.campaign.name, total: 0 };
    }
    acc[key].total += d.amount;
    return acc;
  }, {} as Record<string, { name: string; total: number }>);

  const topCampaigns = Object.values(campaignTotals)
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  const maxCampaignTotal = topCampaigns[0]?.total || 1;

  return (
    <div className="space-y-4 lg:sticky lg:top-6">
      {/* Main Stats Card */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-emerald/10 to-cyan/10 backdrop-blur-sm border border-border/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Donated This Period</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">
              ${totalDonated.toLocaleString()}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-emerald text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>+12.5%</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">vs. last period</span>
            <span className="text-foreground font-medium">+$1,450</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
      </div>

      {/* Top Campaigns */}
      <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">Top Campaigns by Volume</h4>
        <div className="space-y-3">
          {topCampaigns.map((campaign, index) => (
            <div key={campaign.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet to-pink text-white text-xs font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-foreground font-medium">{campaign.name}</span>
                </div>
                <span className="text-muted-foreground font-mono">${campaign.total}</span>
              </div>
              <Progress value={(campaign.total / maxCampaignTotal) * 100} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Donor Retention */}
      <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">Donor Retention</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-foreground">76%</p>
            <p className="text-xs text-muted-foreground mt-1">Return rate</p>
          </div>
          <div className="relative h-16 w-16">
            <svg className="transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-muted"
                strokeDasharray="75, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-emerald"
                strokeDasharray="76, 100"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Refund Rate */}
      <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">Refund Rate</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-foreground">{refundRate.toFixed(1)}%</p>
            <div className="flex items-center gap-1 text-emerald text-xs font-medium mt-1">
              <TrendingDown className="h-3 w-3" />
              <span>-0.5% from last period</span>
            </div>
          </div>
          <div className="relative h-16 w-16">
            <svg className="transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-muted"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-destructive"
                strokeDasharray={`${refundRate}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button variant="outline" className="w-full justify-between group">
        <span>View Full Analytics</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};
