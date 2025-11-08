import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Radio, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const topContributors = [
  { rank: 1, name: "Alice Chen", avatar: "AC", amount: "$12,450", badge: "🥇" },
  { rank: 2, name: "Robert Lee", avatar: "RL", amount: "$8,920", badge: "🥈" },
  { rank: 3, name: "Maria Garcia", avatar: "MG", amount: "$7,340", badge: "🥉" },
  { rank: 4, name: "James Wilson", avatar: "JW", amount: "$6,200" },
  { rank: 5, name: "Sophia Kim", avatar: "SK", amount: "$5,890" },
];

const trendingCauses = [
  { name: "Emergency Relief", count: 24, trend: "+12%", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  { name: "Education", count: 18, trend: "+8%", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { name: "Health", count: 15, trend: "+5%", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  { name: "Environment", count: 12, trend: "+15%", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
];

const liveEvents = [
  {
    id: 1,
    title: "Q&A with Ocean Conservation Team",
    viewers: 234,
    thumbnail: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Building Schools in Rural Areas",
    viewers: 156,
    thumbnail: "/placeholder.svg",
  },
];

export const DiscoverySidebar = () => {
  return (
    <div className="space-y-6 sticky top-6">
      {/* Top Contributors */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-amber" />
            Top Contributors This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topContributors.map((contributor) => (
            <div
              key={contributor.rank}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-cyan/30">
                  <AvatarFallback className="bg-gradient-to-br from-violet to-pink text-white text-xs">
                    {contributor.avatar}
                  </AvatarFallback>
                </Avatar>
                {contributor.badge && (
                  <span className="absolute -top-1 -right-1 text-sm">{contributor.badge}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {contributor.name}
                </p>
                <p className="text-xs text-muted-foreground">{contributor.amount} donated</p>
              </div>
              <span className="text-xs font-bold text-cyan">#{contributor.rank}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Causes */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-emerald" />
            Trending Causes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {trendingCauses.map((cause) => (
            <div
              key={cause.name}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn("text-xs", cause.color)}>
                  {cause.name}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {cause.count} campaigns
                </span>
              </div>
              <div className="flex items-center gap-1 text-emerald text-xs font-medium">
                <TrendingUp className="h-3 w-3" />
                {cause.trend}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Live Events */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Radio className="h-5 w-5 text-red-500 animate-pulse" />
            Live Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {liveEvents.map((event) => (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-lg border border-border/50 hover:border-cyan/50 transition-all cursor-pointer"
            >
              <div className="relative h-32">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/90 text-white text-xs font-medium">
                  <Radio className="h-3 w-3" />
                  LIVE
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-sm font-medium text-white mb-1 line-clamp-2">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-300">{event.viewers} watching</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-6 w-6 text-background ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
