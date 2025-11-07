import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", donations: 12400 },
  { month: "Feb", donations: 19800 },
  { month: "Mar", donations: 15600 },
  { month: "Apr", donations: 24500 },
  { month: "May", donations: 31200 },
  { month: "Jun", donations: 28900 },
];

export const DonationChart = () => {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up border border-white/60">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Donation Trends</h3>
        <p className="text-sm text-muted-foreground">Monthly donation performance</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--emerald))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--emerald))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Donations"]}
          />
          <Area
            type="monotone"
            dataKey="donations"
            stroke="hsl(var(--emerald))"
            strokeWidth={2}
            fill="url(#donationGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
