import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Users, Share2, MoreVertical, Pause, Copy, BarChart3 } from "lucide-react";
import { Campaign } from "@/pages/Campaigns";

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
}

export const CampaignCard = ({ campaign, onClick }: CampaignCardProps) => {
  const progress = (campaign.raised / campaign.goal) * 100;
  
  const statusConfig = {
    active: {
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      label: "Active",
    },
    scheduled: {
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      label: "Scheduled",
    },
    draft: {
      color: "bg-muted text-muted-foreground",
      label: "Draft",
    },
    ended: {
      color: "bg-muted text-muted-foreground",
      label: "Ended",
    },
  };

  const status = statusConfig[campaign.status];

  return (
    <Card
      className="glass-gradient border-2 overflow-hidden group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={campaign.thumbnail}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Status Badge Overlay */}
        <div className="absolute top-3 right-3">
          <Badge className={status.color}>{status.label}</Badge>
        </div>

        {/* Quick Actions (visible on hover) */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-background/80 backdrop-blur-sm"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart3 className="mr-2 h-4 w-4" />
                View Insights
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Title & Organizer */}
        <div className="mb-4">
          <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">
            {campaign.title}
          </h3>
          <p className="text-sm text-muted-foreground">{campaign.organizer}</p>
        </div>

        {/* Progress */}
        {campaign.status !== "draft" && (
          <div className="mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xl font-bold">
                ${(campaign.raised / 1000).toFixed(1)}K
              </span>
              <span className="text-sm text-muted-foreground">
                of ${(campaign.goal / 1000).toFixed(0)}K
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {progress.toFixed(0)}% funded
            </p>
          </div>
        )}

        {/* Mini KPIs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-emerald-500" />
            <span>{campaign.donations}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-cyan-500" />
            <span>{campaign.donors}</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="h-4 w-4 text-violet-500" />
            <span>{campaign.engagement}</span>
          </div>
        </div>

        {/* Dates for scheduled/ended */}
        {campaign.startDate && (
          <p className="text-xs text-muted-foreground mt-3">
            Starts: {new Date(campaign.startDate).toLocaleDateString()}
          </p>
        )}
        {campaign.endDate && (
          <p className="text-xs text-muted-foreground mt-3">
            Ended: {new Date(campaign.endDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
