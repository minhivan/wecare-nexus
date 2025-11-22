import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  DollarSign,
  Calendar,
  MapPin,
  Shield,
  FileSearch,
  Image as ImageIcon,
  AlertTriangle,
  Pause,
  Flag,
  RefreshCw,
  BarChart3,
} from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  coverImage: string;
  creator: {
    name: string;
    avatar: string;
    email: string;
  };
  status: "Live" | "Boosting" | "Ending Soon" | "Flagged";
  category: string;
  country: string;
  metrics: {
    totalDonations: number;
    donationsChange: number;
    activeDonors: number;
    conversionRate: number;
    avgDonation: number;
    engagement: number;
    isLive: boolean;
  };
  healthIndicators: {
    fraudCheck: "good" | "warning" | "danger";
    mediaIssues: "good" | "warning" | "danger";
    compliance: "good" | "warning" | "danger";
    highRisk: boolean;
    missingUpdates: boolean;
    donationSpike: boolean;
  };
}

interface ActiveCampaignDrawerProps {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ActiveCampaignDrawer = ({
  campaign,
  open,
  onOpenChange,
}: ActiveCampaignDrawerProps) => {
  if (!campaign) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-[#10B981] text-white";
      case "Boosting":
        return "bg-[#2563EB] text-white";
      case "Ending Soon":
        return "bg-[#F59E0B] text-white";
      case "Flagged":
        return "bg-[#EF4444] text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthStatus = (status: string) => {
    switch (status) {
      case "good":
        return { color: "text-[#10B981]", bg: "bg-[#10B981]/10", label: "Good" };
      case "warning":
        return { color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", label: "Warning" };
      case "danger":
        return { color: "text-[#EF4444]", bg: "bg-[#EF4444]/10", label: "Critical" };
      default:
        return { color: "text-gray-400", bg: "bg-gray-100", label: "Unknown" };
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[460px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-[#111827]">
            Campaign Analytics
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Overview Section */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={campaign.coverImage}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-3 right-3 ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </Badge>
              {campaign.metrics.isLive && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#EF4444] text-white text-xs px-2 py-1 rounded-md">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Live
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#111827] mb-2">{campaign.title}</h3>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={campaign.creator.avatar} />
                    <AvatarFallback>{campaign.creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{campaign.creator.name}</span>
                </div>
                <span>•</span>
                <span>{campaign.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{campaign.country}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Key Metrics */}
          <div>
            <h4 className="font-medium text-sm text-[#111827] mb-4">Key Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-[#E5E7EB] bg-white">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-5 w-5 text-[#2563EB]" />
                  {campaign.metrics.donationsChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-[#10B981]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#EF4444]" />
                  )}
                </div>
                <p className="text-2xl font-semibold text-[#111827]">
                  ${campaign.metrics.totalDonations.toLocaleString()}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">
                  {campaign.metrics.donationsChange > 0 ? "+" : ""}
                  {campaign.metrics.donationsChange}% vs yesterday
                </p>
              </div>

              <div className="p-4 rounded-lg border border-[#E5E7EB] bg-white">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-[#2563EB]" />
                </div>
                <p className="text-2xl font-semibold text-[#111827]">
                  {campaign.metrics.activeDonors}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">Active donors</p>
              </div>

              <div className="p-4 rounded-lg border border-[#E5E7EB] bg-white">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="h-5 w-5 text-[#2563EB]" />
                </div>
                <p className="text-2xl font-semibold text-[#111827]">
                  {campaign.metrics.conversionRate}%
                </p>
                <p className="text-xs text-[#6B7280] mt-1">Conversion rate</p>
              </div>

              <div className="p-4 rounded-lg border border-[#E5E7EB] bg-white">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-5 w-5 text-[#2563EB]" />
                </div>
                <p className="text-2xl font-semibold text-[#111827]">
                  ${campaign.metrics.avgDonation}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">Avg donation</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timeline Chart Placeholder */}
          <div>
            <h4 className="font-medium text-sm text-[#111827] mb-4">Donation Timeline (24h)</h4>
            <div className="h-32 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-[#6B7280] mx-auto mb-2" />
                <p className="text-xs text-[#6B7280]">Real-time chart visualization</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Engagement Sources */}
          <div>
            <h4 className="font-medium text-sm text-[#111827] mb-4">Engagement Sources</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F9FAFB]">
                <span className="text-sm text-[#6B7280]">Social Media</span>
                <span className="text-sm font-medium text-[#111827]">45%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F9FAFB]">
                <span className="text-sm text-[#6B7280]">Email Campaign</span>
                <span className="text-sm font-medium text-[#111827]">30%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F9FAFB]">
                <span className="text-sm text-[#6B7280]">Direct</span>
                <span className="text-sm font-medium text-[#111827]">25%</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Compliance Status */}
          <div>
            <h4 className="font-medium text-sm text-[#111827] mb-4">Compliance Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <Shield className={getHealthStatus(campaign.healthIndicators.fraudCheck).color} />
                  <span className="text-sm text-[#6B7280]">Fraud Check</span>
                </div>
                <Badge className={getHealthStatus(campaign.healthIndicators.fraudCheck).bg}>
                  <span className={getHealthStatus(campaign.healthIndicators.fraudCheck).color}>
                    {getHealthStatus(campaign.healthIndicators.fraudCheck).label}
                  </span>
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <ImageIcon className={getHealthStatus(campaign.healthIndicators.mediaIssues).color} />
                  <span className="text-sm text-[#6B7280]">Media Quality</span>
                </div>
                <Badge className={getHealthStatus(campaign.healthIndicators.mediaIssues).bg}>
                  <span className={getHealthStatus(campaign.healthIndicators.mediaIssues).color}>
                    {getHealthStatus(campaign.healthIndicators.mediaIssues).label}
                  </span>
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <FileSearch className={getHealthStatus(campaign.healthIndicators.compliance).color} />
                  <span className="text-sm text-[#6B7280]">Content Compliance</span>
                </div>
                <Badge className={getHealthStatus(campaign.healthIndicators.compliance).bg}>
                  <span className={getHealthStatus(campaign.healthIndicators.compliance).color}>
                    {getHealthStatus(campaign.healthIndicators.compliance).label}
                  </span>
                </Badge>
              </div>

              {campaign.healthIndicators.highRisk && (
                <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-[#EF4444]" />
                    <span className="text-sm font-medium text-[#EF4444]">
                      High-risk region detected
                    </span>
                  </div>
                </div>
              )}

              {campaign.healthIndicators.donationSpike && (
                <div className="p-3 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#2563EB]" />
                    <span className="text-sm font-medium text-[#2563EB]">
                      Unusual donation spike detected
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Admin Notes */}
          <div>
            <h4 className="font-medium text-sm text-[#111827] mb-4">Admin Notes</h4>
            <Textarea
              placeholder="Add internal note about this campaign..."
              className="min-h-[100px] border-[#E5E7EB]"
            />
            <Button size="sm" className="mt-2 bg-[#2563EB] hover:bg-[#1d4ed8]">
              Add Note
            </Button>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E7EB] mt-6 -mx-6 -mb-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-[#E5E7EB]"
              onClick={() => onOpenChange(false)}
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              <Flag className="h-4 w-4 mr-2" />
              Flag
            </Button>
            <Button
              className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8]"
              onClick={() => onOpenChange(false)}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
