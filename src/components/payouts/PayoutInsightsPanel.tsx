import { AlertCircle, DollarSign, Link as LinkIcon, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const PayoutInsightsPanel = () => {
  return (
    <div className="space-y-4 lg:sticky lg:top-6">
      {/* Balance Overview */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-emerald" />
          Balance Overview
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Available Balance</span>
              <span className="text-2xl font-bold text-emerald">$47,892</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pending Release</span>
              <span className="text-foreground font-medium">$12,450</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Withdrawable Today</span>
              <span className="text-emerald font-medium">$47,892</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payout Activity Chart */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-cyan" />
          7-Day Activity
        </h3>

        <div className="space-y-3">
          {[
            { day: "Mon", amount: 8500, percent: 65 },
            { day: "Tue", amount: 12200, percent: 90 },
            { day: "Wed", amount: 6800, percent: 50 },
            { day: "Thu", amount: 15400, percent: 100 },
            { day: "Fri", amount: 9200, percent: 68 },
            { day: "Sat", amount: 4500, percent: 35 },
            { day: "Sun", amount: 10200, percent: 75 },
          ].map((item) => (
            <div key={item.day} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.day}</span>
                <span className="text-foreground font-medium">
                  ${item.amount.toLocaleString()}
                </span>
              </div>
              <Progress value={item.percent} className="h-1.5" />
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4">
          View Full Analytics
        </Button>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <LinkIcon className="h-4 w-4 mr-2" />
            Link New Account
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Schedule Auto Payout
          </Button>
        </div>
      </Card>

      {/* Alerts */}
      <Card className="p-4 bg-amber/5 border-amber/20">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Pending Approval</p>
            <p className="text-xs text-muted-foreground mt-1">
              2 payout requests are waiting for your approval
            </p>
            <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-amber">
              Review Now →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
