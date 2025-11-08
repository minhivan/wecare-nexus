import { DollarSign, Heart, Zap, TrendingUp } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface InsightTabProps {
  dateRange: { from: Date; to: Date };
  selectedCampaign: string | null;
}

const engagementData = [
  { name: "Health", value: 4200 },
  { name: "Education", value: 3800 },
  { name: "Environment", value: 2900 },
  { name: "Emergency", value: 3200 },
];

const donorData = [
  { name: "New Donors", value: 65, color: "hsl(var(--emerald))" },
  { name: "Returning Donors", value: 35, color: "hsl(var(--cyan))" },
];

const campaignPerformance = [
  { campaign: "Hope for Tomorrow", impressions: 45200, clicks: 3400, donations: 890, conversion: "2.6%", status: "Active" },
  { campaign: "Education First", impressions: 38900, clicks: 2850, donations: 720, conversion: "2.4%", status: "Active" },
  { campaign: "Clean Water Initiative", impressions: 31500, clicks: 2100, donations: 580, conversion: "2.2%", status: "Active" },
  { campaign: "Emergency Relief", impressions: 28700, clicks: 1950, donations: 450, conversion: "2.0%", status: "Paused" },
];

export const InsightTab = ({ dateRange, selectedCampaign }: InsightTabProps) => {
  return (
    <div className="space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="Total Donations"
          value="$284,590"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="emerald"
        />
        <KPICard
          title="Active Campaigns"
          value="24"
          change="+3"
          trend="up"
          icon={Heart}
          color="fire-orange"
        />
        <KPICard
          title="Avg. Engagement"
          value="3,247"
          change="+8.3%"
          trend="up"
          icon={Zap}
          color="cyan"
        />
        <KPICard
          title="Conversion Rate"
          value="2.4%"
          change="+0.3%"
          trend="up"
          icon={TrendingUp}
          color="amber"
        />
      </div>

      {/* Engagement Overview */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Engagement by Campaign Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Donor Composition</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={donorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {donorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Performance Table */}
      <Card className="glass p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Campaign Performance</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">Donations</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignPerformance.map((campaign) => (
              <TableRow key={campaign.campaign} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{campaign.campaign}</TableCell>
                <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
                <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
                <TableCell className="text-right">{campaign.donations.toLocaleString()}</TableCell>
                <TableCell className="text-right font-semibold text-emerald">{campaign.conversion}</TableCell>
                <TableCell>
                  <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                    {campaign.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
