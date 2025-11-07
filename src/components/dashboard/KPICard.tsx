import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "emerald" | "cyan" | "amber" | "fire-orange";
}

const colorClasses = {
  emerald: "text-emerald",
  cyan: "text-cyan",
  amber: "text-amber",
  "fire-orange": "text-fire-orange",
};

const bgColorClasses = {
  emerald: "bg-emerald/10",
  cyan: "bg-cyan/10",
  amber: "bg-amber/10",
  "fire-orange": "bg-fire-orange/10",
};

export const KPICard = ({ title, value, change, trend, icon: Icon, color }: KPICardProps) => {
  return (
    <div className="glass rounded-2xl p-6 transition-smooth hover:shadow-xl hover:-translate-y-1 animate-slide-up border border-white/60">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          <div className="mt-3 flex items-center gap-1 text-sm">
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-emerald" strokeWidth={2} />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" strokeWidth={2} />
            )}
            <span className={cn("font-semibold", trend === "up" ? "text-emerald" : "text-destructive")}>
              {change}
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl shadow-lg", bgColorClasses[color])}>
          <Icon className={cn("h-7 w-7", colorClasses[color])} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};
