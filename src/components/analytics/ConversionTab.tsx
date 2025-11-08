import { Card } from "@/components/ui/card";
import { ArrowRight, DollarSign, Eye, MousePointer } from "lucide-react";
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
  selectedCampaign: string | null;
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

export const ConversionTab = ({ dateRange, selectedCampaign }: ConversionTabProps) => {
  return (
    <div className="space-y-6">
      {/* Funnel Visualization */}
      <Card className="glass p-8">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Conversion Funnel</h3>
        <div className="space-y-4">
          {funnelStages.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-muted-foreground">{stage.stage}</div>
                <div className="flex-1 relative">
                  <div
                    className="h-16 rounded-lg transition-all duration-500 flex items-center justify-between px-6"
                    style={{
                      width: `${stage.percentage}%`,
                      backgroundColor: stage.color,
                      minWidth: "200px",
                    }}
                  >
                    <span className="text-white font-bold text-lg">{stage.value.toLocaleString()}</span>
                    <span className="text-white/90 text-sm font-medium">{stage.percentage}%</span>
                  </div>
                </div>
              </div>
              {index < funnelStages.length - 1 && (
                <div className="absolute left-32 top-16 ml-4">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Source Attribution */}
      <Card className="glass p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Source Attribution</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <Eye className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold">48.2K</p>
            <p className="text-xs text-muted-foreground">Total Visitors</p>
          </div>
          <div className="p-4 rounded-lg bg-cyan/10 border border-cyan/20">
            <MousePointer className="h-5 w-5 text-cyan mb-2" />
            <p className="text-2xl font-bold">12.4K</p>
            <p className="text-xs text-muted-foreground">Engaged Users</p>
          </div>
          <div className="p-4 rounded-lg bg-emerald/10 border border-emerald/20">
            <DollarSign className="h-5 w-5 text-emerald mb-2" />
            <p className="text-2xl font-bold">3,150</p>
            <p className="text-xs text-muted-foreground">Total Donors</p>
          </div>
          <div className="p-4 rounded-lg bg-amber/10 border border-amber/20">
            <ArrowRight className="h-5 w-5 text-amber mb-2" />
            <p className="text-2xl font-bold">2.5%</p>
            <p className="text-xs text-muted-foreground">Avg Conversion</p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Campaigns</TableHead>
              <TableHead className="text-right">Visitors</TableHead>
              <TableHead className="text-right">Donors</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sourceAttribution.map((source) => (
              <TableRow key={source.source} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{source.source}</TableCell>
                <TableCell className="text-right">{source.campaign.toLocaleString()}</TableCell>
                <TableCell className="text-right">{source.visitors.toLocaleString()}</TableCell>
                <TableCell className="text-right">{source.donors.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="font-semibold">
                    {source.conversion}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{source.cost}</TableCell>
                <TableCell className="text-right font-semibold text-emerald">{source.roi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* User Journey Snapshot */}
      <Card className="glass p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">User Journey Flow</h3>
        <div className="flex items-center justify-center gap-4 py-8">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center mb-2">
              <span className="text-2xl font-bold text-primary">38%</span>
            </div>
            <p className="text-sm font-medium">Landing Page</p>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-accent/20 border-4 border-accent flex items-center justify-center mb-2">
              <span className="text-2xl font-bold text-accent">26%</span>
            </div>
            <p className="text-sm font-medium">Campaign Page</p>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-cyan/20 border-4 border-cyan flex items-center justify-center mb-2">
              <span className="text-2xl font-bold text-cyan">10%</span>
            </div>
            <p className="text-sm font-medium">Donation Form</p>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-emerald/20 border-4 border-emerald flex items-center justify-center mb-2">
              <span className="text-2xl font-bold text-emerald">2.5%</span>
            </div>
            <p className="text-sm font-medium">Completed</p>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Key Insight:</span> 62% of users who reach the
            donation form complete their donation. Focus on improving earlier stages of the funnel.
          </p>
        </div>
      </Card>
    </div>
  );
};
