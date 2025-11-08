import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Search, Download, FileJson } from "lucide-react";

const auditLogs = [
  {
    actor: "Sarah Anderson",
    action: "Changed campaign visibility",
    target: "Save the Ocean 2024",
    timestamp: "2 minutes ago",
    type: "update",
  },
  {
    actor: "Michael Chen",
    action: "Donation refunded",
    target: "$500.00 to John Doe",
    timestamp: "1 hour ago",
    type: "refund",
  },
  {
    actor: "Emma Wilson",
    action: "Created new campaign",
    target: "Help Local Schools",
    timestamp: "3 hours ago",
    type: "create",
  },
  {
    actor: "Sarah Anderson",
    action: "Updated team permissions",
    target: "James Rodriguez",
    timestamp: "5 hours ago",
    type: "security",
  },
  {
    actor: "System",
    action: "Auto-payout processed",
    target: "$12,450.00 to Bank Account",
    timestamp: "1 day ago",
    type: "payout",
  },
  {
    actor: "Michael Chen",
    action: "Exported donation data",
    target: "November 2024 Report",
    timestamp: "2 days ago",
    type: "export",
  },
];

const activityStats = [
  { label: "Total Events", value: "1,234", trend: "+12%" },
  { label: "Active Users", value: "8", trend: "+2" },
  { label: "System Events", value: "156", trend: "+8%" },
];

export const AuditLogsTab = () => {
  const [filter, setFilter] = useState("all");

  const getTypeBadge = (type: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      update: { color: "bg-cyan text-white", label: "Update" },
      refund: { color: "bg-fire-orange text-white", label: "Refund" },
      create: { color: "bg-emerald text-white", label: "Create" },
      security: { color: "bg-violet text-white", label: "Security" },
      payout: { color: "bg-amber text-white", label: "Payout" },
      export: { color: "bg-pink text-white", label: "Export" },
    };
    const config = variants[type] || { color: "bg-muted", label: type };
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {activityStats.map((stat) => (
          <Card key={stat.label} className="glass border-0">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{stat.value}</span>
                <Badge variant="secondary" className="bg-emerald/10 text-emerald">
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Actions */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Feed
              </CardTitle>
              <CardDescription>Real-time log of all system events</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline">
                <FileJson className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-9 glass border-0" />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48 glass border-0">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="payout">Payout</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Log Entries */}
      <Card className="glass border-0">
        <CardContent className="p-6 space-y-3">
          {auditLogs.map((log, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{log.actor}</span>
                    <span className="text-muted-foreground">{log.action}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.target}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                {getTypeBadge(log.type)}
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            Load Older Logs
          </Button>
        </CardContent>
      </Card>

      {/* Activity Chart */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle>Activity Volume</CardTitle>
          <CardDescription>System events over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-end justify-between gap-2">
            {[45, 62, 38, 71, 55, 68, 82].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-3">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
