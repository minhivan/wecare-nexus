import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Activity } from "lucide-react";
import { Campaign } from "@/pages/Campaigns";

interface MetricsSnapshotProps {
  campaigns: Campaign[];
}

export const MetricsSnapshot = ({ campaigns }: MetricsSnapshotProps) => {
  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalDonations = campaigns.reduce((sum, c) => sum + c.donations, 0);
  const avgDonation = totalDonations > 0 ? totalRaised / totalDonations : 0;
  const totalEngagement = campaigns.reduce((sum, c) => sum + c.engagement, 0);

  const metrics = [
    {
      title: "Total Raised",
      value: `$${(totalRaised / 1000).toFixed(1)}K`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-emerald-500/20 to-cyan-500/20",
      iconColor: "text-emerald-500",
    },
    {
      title: "Active Campaigns",
      value: activeCampaigns.length,
      change: "+3",
      trend: "up",
      icon: Target,
      gradient: "from-violet-500/20 to-pink-500/20",
      iconColor: "text-violet-500",
    },
    {
      title: "Avg. Donation / User",
      value: `$${avgDonation.toFixed(0)}`,
      change: "+8.2%",
      trend: "up",
      icon: Users,
      gradient: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-500",
    },
    {
      title: "Engagement Momentum",
      value: `${(totalEngagement / 1000).toFixed(1)}K`,
      change: "+24.1%",
      trend: "up",
      icon: Activity,
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card
            key={metric.title}
            className={`glass-gradient border-2 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
            
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {metric.title}
                  </p>
                  <h3 className="text-3xl font-bold tracking-tight">
                    {metric.value}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendIcon className={`h-3 w-3 ${metric.trend === "up" ? "text-emerald-500" : "text-red-500"}`} />
                    <span className={`text-xs font-semibold ${metric.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">vs last period</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-xl bg-background/50 ${metric.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Mini Sparkline Placeholder */}
              <div className="mt-4 h-8 flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${metric.iconColor} bg-current opacity-30 rounded-t transition-all group-hover:opacity-50`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
