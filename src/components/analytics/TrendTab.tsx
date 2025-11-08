import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar as CalendarIcon } from "lucide-react";

interface TrendTabProps {
  dateRange: { from: Date; to: Date };
  selectedCampaign: string | null;
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

export const TrendTab = ({ dateRange, selectedCampaign }: TrendTabProps) => {
  return (
    <div className="space-y-6">
      {/* Timeline Chart */}
      <Card className="glass p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Performance Timeline</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="glass">
              Daily
            </Button>
            <Button variant="outline" size="sm" className="glass">
              Weekly
            </Button>
            <Button variant="outline" size="sm" className="glass bg-primary text-primary-foreground">
              Monthly
            </Button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="donations" 
              stroke="hsl(var(--emerald))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--emerald))", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              stroke="hsl(var(--cyan))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--cyan))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Trend Breakdown Panels */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Top Performing Days
          </h3>
          <div className="space-y-3">
            {topPerformingDays.map((day) => (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{day.day}</span>
                <div className="flex items-center gap-3 flex-1 ml-4">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${day.value}%`, backgroundColor: day.color }}
                    />
                  </div>
                  <span className="text-sm font-semibold min-w-[3ch] text-right">{day.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald" />
            Seasonality Insights
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald/10 border border-emerald/20">
              <p className="text-sm font-semibold text-emerald mb-1">Peak Season Detected</p>
              <p className="text-xs text-muted-foreground">
                Donations increase by 34% during holiday season (Nov-Dec)
              </p>
            </div>
            <div className="p-4 rounded-lg bg-cyan/10 border border-cyan/20">
              <p className="text-sm font-semibold text-cyan mb-1">Weekend Spike</p>
              <p className="text-xs text-muted-foreground">
                Engagement rates are 28% higher on weekends
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber/10 border border-amber/20">
              <p className="text-sm font-semibold text-amber mb-1">Evening Optimization</p>
              <p className="text-xs text-muted-foreground">
                Best posting time: 6-9 PM for maximum reach
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Anomaly Detection */}
      <Card className="glass p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Anomaly Detection</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-emerald/5 border border-emerald/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald uppercase tracking-wide">Positive Spike</span>
              <TrendingUp className="h-4 w-4 text-emerald" />
            </div>
            <p className="text-2xl font-bold mb-1">+142%</p>
            <p className="text-xs text-muted-foreground">Feb 19 - Valentine's campaign</p>
          </div>
          <div className="p-4 rounded-lg bg-cyan/5 border border-cyan/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyan uppercase tracking-wide">Above Average</span>
              <TrendingUp className="h-4 w-4 text-cyan" />
            </div>
            <p className="text-2xl font-bold mb-1">+68%</p>
            <p className="text-xs text-muted-foreground">Feb 5 - Partner collaboration</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/5 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Steady</span>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold mb-1">Normal</p>
            <p className="text-xs text-muted-foreground">No anomalies detected</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
