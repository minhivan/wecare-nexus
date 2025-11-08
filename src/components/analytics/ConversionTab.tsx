import { Card } from "@/components/ui/card";
import { ArrowRight, DollarSign, Eye, MousePointer, Sparkles, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ConversionTabProps {
  dateRange: { from: Date; to: Date };
  filters: any;
}

const funnelStages = [
  { stage: "Impressions", value: 125800, percentage: 100, color: "hsl(var(--primary))" },
  { stage: "Visits", value: 48200, percentage: 38, color: "hsl(var(--accent))" },
  { stage: "Clicks", value: 12400, percentage: 10, color: "hsl(var(--cyan))" },
  { stage: "Donations", value: 3150, percentage: 2.5, color: "hsl(var(--emerald))" },
];

const sourceAttribution = [
  { source: "Email", campaign: 845, visitors: 12400, donors: 320, conversion: "2.6%", cost: "$4,200", roi: "385%" },
  { source: "Social Media", campaign: 1240, visitors: 18600, donors: 410, conversion: "2.2%", cost: "$6,800", roi: "298%" },
  { source: "Partner Sites", campaign: 620, visitors: 8900, donors: 185, conversion: "2.1%", cost: "$2,400", roi: "412%" },
  { source: "Direct", campaign: 1850, visitors: 8300, donors: 220, conversion: "2.7%", cost: "$0", roi: "∞" },
];

export const ConversionTab = ({ dateRange, filters }: ConversionTabProps) => {
  return (
    <div className="space-y-8">
      {/* Funnel Overview */}
      <Card className="border border-border bg-card rounded-[10px] p-6">
        <h3 className="text-[15px] font-semibold mb-8 text-foreground tracking-tight">Funnel Overview</h3>
        <div className="space-y-4">
          {funnelStages.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="flex items-center gap-4">
                <div className="w-32 text-[15px] font-medium text-muted-foreground tracking-tight">{stage.stage}</div>
                <div className="flex-1 relative">
                  <div
                    className="h-14 rounded-[10px] border border-border transition-smooth flex items-center justify-between px-6 hover:border-emerald/50 hover-surface"
                    style={{
                      width: `${stage.percentage}%`,
                      backgroundColor: `${stage.color}20`,
                      minWidth: "200px",
                    }}
                  >
                    <span className="font-bold text-[16px] text-foreground tracking-tight">{stage.value.toLocaleString()}</span>
                    <span className="text-[15px] font-medium text-muted-foreground tracking-tight">{stage.percentage}%</span>
                  </div>
                  {index > 0 && (
                    <div className="absolute -top-1 left-0 text-[13px] text-emerald font-medium tracking-tight">
                      +{((funnelStages[index].percentage / funnelStages[index - 1].percentage) * 100 - 100).toFixed(1)}% vs last week
                    </div>
                  )}
                </div>
              </div>
              {index < funnelStages.length - 1 && (
                <div className="absolute left-32 top-14 ml-4">
                  <ArrowRight className="h-4 w-4 stroke-[1.5px] text-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Channel Efficiency */}
      <Card className="border border-border bg-card rounded-[10px] p-6">
        <h3 className="text-[15px] font-semibold mb-6 text-foreground tracking-tight">Channel Efficiency</h3>
        <div className="space-y-4">
          {[
            { channel: "Email", ctr: 4.2, conversion: 2.6, color: "emerald" },
            { channel: "Social Media", ctr: 3.8, conversion: 2.2, color: "cyan" },
            { channel: "Livestream", ctr: 5.1, conversion: 3.1, color: "amber" },
            { channel: "Website", ctr: 2.9, conversion: 1.8, color: "primary" },
          ].map((item) => (
            <div key={item.channel} className="border border-border rounded-[10px] p-4 hover:border-emerald/50 transition-smooth hover-surface">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-[15px] text-foreground tracking-tight">{item.channel}</span>
                <div className="flex items-center gap-6 text-[15px]">
                  <div>
                    <span className="text-muted-foreground tracking-tight">CTR: </span>
                    <span className="font-semibold text-foreground tracking-tight">{item.ctr}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground tracking-tight">Conversion: </span>
                    <span className="font-semibold text-emerald tracking-tight">{item.conversion}%</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-cyan rounded-full`}
                    style={{ width: `${(item.ctr / 6) * 100}%` }}
                  />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-emerald rounded-full`}
                    style={{ width: `${(item.conversion / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Behavior Table */}
      <Card className="border border-border bg-card rounded-[10px] p-6">
        <h3 className="text-[15px] font-semibold mb-6 text-foreground tracking-tight">Top User Paths</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[13px] uppercase font-medium tracking-tight">User Path</TableHead>
              <TableHead className="text-right text-[13px] uppercase font-medium tracking-tight">Sessions</TableHead>
              <TableHead className="text-right text-[13px] uppercase font-medium tracking-tight">Avg. Donation</TableHead>
              <TableHead className="text-right text-[13px] uppercase font-medium tracking-tight">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { path: "Landing → Campaign → Donate", sessions: 2840, avgDonation: 142, trend: "+12%" },
              { path: "Social → Campaign → Donate", sessions: 1920, avgDonation: 128, trend: "+8%" },
              { path: "Email → Campaign → Donate", sessions: 1540, avgDonation: 156, trend: "+15%" },
              { path: "Search → Landing → Campaign → Donate", sessions: 980, avgDonation: 138, trend: "+5%" },
              { path: "Direct → Campaign → Donate", sessions: 720, avgDonation: 165, trend: "+18%" },
            ].map((row, i) => (
              <TableRow key={i} className="hover:bg-secondary/10 transition-smooth">
                <TableCell className="font-medium text-[15px] tracking-tight">{row.path}</TableCell>
                <TableCell className="text-right text-[15px] tracking-tight">{row.sessions.toLocaleString()}</TableCell>
                <TableCell className="text-right font-semibold text-[15px] tracking-tight">${row.avgDonation}</TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-1 text-emerald text-[13px] font-medium tracking-tight">
                    <TrendingUp className="h-3 w-3 stroke-[1.5px]" />
                    {row.trend}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Recommendations */}
      <Card className="border border-cyan/20 bg-cyan/5 rounded-[10px] p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-cyan/20">
            <Sparkles className="h-5 w-5 stroke-[1.5px] text-cyan" />
          </div>
          <div>
            <h4 className="font-semibold text-[15px] text-foreground mb-3 flex items-center gap-2 tracking-tight">
              AI-Driven Recommendations
            </h4>
            <div className="space-y-2 text-[15px] text-muted-foreground tracking-tight leading-relaxed">
              <p>• Users who donate via livestream are <span className="font-semibold text-cyan">2.3x more likely</span> to return — consider increasing event frequency.</p>
              <p>• Email campaigns show the highest conversion rate at <span className="font-semibold text-cyan">2.6%</span> — allocate more budget to this channel.</p>
              <p>• Drop-off rate is highest between Landing and Campaign pages. Consider A/B testing campaign preview cards.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
