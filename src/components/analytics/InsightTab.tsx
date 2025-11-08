import { DollarSign, Target, Users, RefreshCcw, TrendingUp, TrendingDown, Activity } from "lucide-react";
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
  filters: any;
  comparePeriod: boolean;
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

export const InsightTab = ({ dateRange, filters, comparePeriod }: InsightTabProps) => {
  const kpiData = [
    { 
      icon: DollarSign, 
      label: "Total Donations", 
      value: "$284,590", 
      delta: "+12.5%", 
      trend: "up",
      sparkline: [4200, 4800, 5100, 4900, 5400, 5800, 6200]
    },
    { 
      icon: Target, 
      label: "Active Campaigns", 
      value: "24", 
      delta: "+3", 
      trend: "up",
      sparkline: [18, 19, 21, 20, 22, 23, 24]
    },
    { 
      icon: Users, 
      label: "Avg. Donation per User", 
      value: "$142", 
      delta: "+8.3%", 
      trend: "up",
      sparkline: [120, 125, 135, 138, 140, 141, 142]
    },
    { 
      icon: RefreshCcw, 
      label: "Returning Donors %", 
      value: "35%", 
      delta: "+2.1%", 
      trend: "up",
      sparkline: [28, 30, 31, 32, 33, 34, 35]
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top KPI Bar */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.trend === "up";
          
          return (
            <Card key={kpi.label} className="border border-border bg-card p-4 hover:border-emerald/50 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald' : 'text-red-500'}`}>
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.delta}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
              </div>
              <div className="mt-3 h-8 flex items-end gap-0.5">
                {kpi.sparkline.map((value, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-emerald/20 rounded-sm transition-all hover:bg-emerald/40"
                    style={{ height: `${(value / Math.max(...kpi.sparkline)) * 100}%` }}
                  />
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Engagement Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="border border-border bg-card p-6">
          <h3 className="text-base font-semibold mb-4 text-foreground">Top 5 Campaigns by Donations</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={engagementData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }} 
              />
              <Bar dataKey="value" fill="hsl(var(--emerald))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border border-border bg-card p-6">
          <h3 className="text-base font-semibold mb-4 text-foreground">Donation Sources</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={[
                  { name: "Organic", value: 4200, color: "hsl(var(--emerald))" },
                  { name: "Referral", value: 3100, color: "hsl(var(--cyan))" },
                  { name: "Social", value: 2800, color: "hsl(var(--amber))" },
                  { name: "Livestream", value: 1900, color: "hsl(var(--primary))" },
                  { name: "Merchandise", value: 1200, color: "hsl(var(--muted))" },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {[
                  { name: "Organic", value: 4200, color: "hsl(var(--emerald))" },
                  { name: "Referral", value: 3100, color: "hsl(var(--cyan))" },
                  { name: "Social", value: 2800, color: "hsl(var(--amber))" },
                  { name: "Livestream", value: 1900, color: "hsl(var(--primary))" },
                  { name: "Merchandise", value: 1200, color: "hsl(var(--muted))" },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Recent Activities</h3>
          <Activity className="h-4 w-4 text-muted-foreground animate-pulse" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { donor: "John Smith", campaign: "Hope for Tomorrow", amount: "$250", time: "2 min ago", new: true },
              { donor: "Sarah Johnson", campaign: "Education First", amount: "$180", time: "5 min ago", new: true },
              { donor: "Michael Chen", campaign: "Clean Water", amount: "$500", time: "12 min ago", new: false },
              { donor: "Emma Wilson", campaign: "Emergency Relief", amount: "$75", time: "18 min ago", new: false },
              { donor: "David Brown", campaign: "Hope for Tomorrow", amount: "$320", time: "25 min ago", new: false },
            ].map((activity, i) => (
              <TableRow key={i} className={`hover:bg-muted/50 transition-colors ${activity.new ? 'border-l-2 border-l-emerald' : ''}`}>
                <TableCell className="font-medium">{activity.donor}</TableCell>
                <TableCell className="text-muted-foreground">{activity.campaign}</TableCell>
                <TableCell className="text-right font-semibold text-emerald">{activity.amount}</TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">{activity.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Observation Notes */}
      <Card className="border border-emerald/20 bg-emerald/5 p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald/20">
            <TrendingUp className="h-5 w-5 text-emerald" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Key Insights</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Donations rose <span className="font-semibold text-emerald">14% vs last week</span>, mainly from livestream campaigns. 
              The "Hope for Tomorrow" campaign shows exceptional performance with a <span className="font-semibold text-emerald">2.6% conversion rate</span>. 
              Consider increasing marketing spend on email channels which show the highest ROI.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
