import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Globe, TrendingUp } from "lucide-react";

interface TrendTabProps {
  dateRange: { from: Date; to: Date };
  filters: any;
  comparePeriod: boolean;
}

const timelineData = [
  { date: "Jan 1", donations: 4200, engagement: 2800 },
  { date: "Jan 8", donations: 5100, engagement: 3400 },
  { date: "Jan 15", donations: 4800, engagement: 3200 },
  { date: "Jan 22", donations: 6200, engagement: 4100 },
  { date: "Jan 29", donations: 5800, engagement: 3900 },
  { date: "Feb 5", donations: 7100, engagement: 4800 },
  { date: "Feb 12", donations: 6500, engagement: 4500 },
  { date: "Feb 19", donations: 8200, engagement: 5600 },
];

const topPerformingDays = [
  { day: "Monday", value: 85, color: "hsl(var(--emerald))" },
  { day: "Tuesday", value: 72, color: "hsl(var(--cyan))" },
  { day: "Wednesday", value: 68, color: "hsl(var(--amber))" },
  { day: "Thursday", value: 91, color: "hsl(var(--emerald))" },
  { day: "Friday", value: 78, color: "hsl(var(--cyan))" },
  { day: "Saturday", value: 95, color: "hsl(var(--emerald))" },
  { day: "Sunday", value: 88, color: "hsl(var(--cyan))" },
];

export const TrendTab = ({ dateRange, filters, comparePeriod }: TrendTabProps) => {
  const trafficData = [
    { date: "Jan 1", visits: 2400, conversion: 2.1 },
    { date: "Jan 8", visits: 2800, conversion: 2.3 },
    { date: "Jan 15", visits: 3200, conversion: 2.5 },
    { date: "Jan 22", visits: 3600, conversion: 2.4 },
    { date: "Jan 29", visits: 3400, conversion: 2.6 },
    { date: "Feb 5", visits: 4100, conversion: 2.8 },
    { date: "Feb 12", visits: 3800, conversion: 2.7 },
    { date: "Feb 19", visits: 4500, conversion: 3.0 },
  ];

  const volumeData = [
    { date: "Jan 1", health: 1200, education: 800, environment: 600 },
    { date: "Jan 8", health: 1400, education: 900, environment: 700 },
    { date: "Jan 15", health: 1300, education: 1100, environment: 650 },
    { date: "Jan 22", health: 1600, education: 1200, environment: 800 },
    { date: "Jan 29", health: 1500, education: 1000, environment: 750 },
    { date: "Feb 5", health: 1800, education: 1300, environment: 900 },
    { date: "Feb 12", health: 1700, education: 1150, environment: 850 },
    { date: "Feb 19", health: 2100, education: 1400, environment: 1000 },
  ];

  return (
    <div className="space-y-8">
      {/* Traffic & Conversion Over Time */}
      <Card className="border border-border bg-card rounded-[10px] p-6">
        <h3 className="text-[15px] font-semibold mb-6 text-foreground tracking-tight">Traffic & Conversion Over Time</h3>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} strokeWidth={1.5} />
            <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={11} strokeWidth={1.5} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={11} strokeWidth={1.5} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="visits" 
              fill="hsl(var(--cyan))" 
              fillOpacity={0.2}
              stroke="hsl(var(--cyan))" 
              strokeWidth={1.5}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="conversion" 
              stroke="hsl(var(--emerald))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--emerald))", r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Donation Volume Trend */}
      <Card className="border border-border bg-card rounded-[10px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[15px] font-semibold text-foreground tracking-tight">Donation Volume Trend</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[13px] tracking-tight">
              Total Volume
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-[13px] tracking-tight">
              Unique Donors
            </Button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={volumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} strokeWidth={1.5} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} strokeWidth={1.5} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="health" 
              stackId="1"
              stroke="hsl(var(--emerald))" 
              fill="hsl(var(--emerald))"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="education" 
              stackId="1"
              stroke="hsl(var(--cyan))" 
              fill="hsl(var(--cyan))"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="environment" 
              stackId="1"
              stroke="hsl(var(--amber))" 
              fill="hsl(var(--amber))"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Geo Heatmap */}
      <Card className="border border-border bg-card rounded-[10px] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="h-5 w-5 stroke-[1.5px] text-muted-foreground" />
          <h3 className="text-[15px] font-semibold text-foreground tracking-tight">Geo Heatmap</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { country: "United States", donations: 4820, color: "emerald" },
            { country: "United Kingdom", donations: 3240, color: "cyan" },
            { country: "Canada", donations: 2180, color: "amber" },
            { country: "Australia", donations: 1850, color: "primary" },
            { country: "Germany", donations: 1620, color: "emerald" },
            { country: "France", donations: 1340, color: "cyan" },
            { country: "Japan", donations: 980, color: "amber" },
            { country: "Vietnam", donations: 720, color: "primary" },
          ].map((region) => (
            <div 
              key={region.country} 
              className="p-4 border border-border rounded-[10px] bg-secondary/10 hover:border-emerald/50 transition-smooth cursor-pointer hover-surface"
            >
              <p className="text-[13px] font-medium text-muted-foreground mb-2 tracking-tight uppercase">{region.country}</p>
              <p className="text-[22px] font-bold text-foreground tracking-tight">{region.donations.toLocaleString()}</p>
              <div className="mt-3 h-1 bg-secondary/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${region.color} rounded-full`}
                  style={{ width: `${(region.donations / 5000) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {comparePeriod && (
        <Card className="border border-amber/20 bg-amber/5 rounded-[10px] p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 stroke-[1.5px] text-amber" />
            <h3 className="text-[15px] font-semibold text-foreground tracking-tight">Period Comparison Active</h3>
          </div>
          <p className="text-[15px] text-muted-foreground tracking-tight leading-relaxed">
            Comparison view enabled. Charts now show current period vs previous period data with trend indicators.
          </p>
        </Card>
      )}
    </div>
  );
};
