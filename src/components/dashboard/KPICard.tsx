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
    <div className="glass rounded-xl p-6 transition-smooth hover:shadow-md animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
          <div className="mt-3 flex items-center gap-1 text-sm">
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-emerald" strokeWidth={1.5} />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" strokeWidth={1.5} />
            )}
            <span className={cn(trend === "up" ? "text-emerald" : "text-destructive")}>
              {change}
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", bgColorClasses[color])}>
          <Icon className={cn("h-6 w-6", colorClasses[color])} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};
