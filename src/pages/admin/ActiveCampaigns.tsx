import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Calendar,
  RefreshCw,
  Download,
  LayoutGrid,
  List,
  TrendingUp,
  TrendingDown,
  Eye,
  AlertTriangle,
  Shield,
  Image as ImageIcon,
  MapPin,
  Clock,
  MoreVertical,
  Pause,
  BarChart3,
  FileSearch,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActiveCampaignDrawer } from "@/components/admin/ActiveCampaignDrawer";

type ViewMode = "grid" | "table";

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

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Clean Water Initiative for Rural Communities",
    coverImage: "/placeholder.svg",
    creator: {
      name: "Green Earth Foundation",
      avatar: "/placeholder.svg",
      email: "contact@greenearth.org",
    },
    status: "Live",
    category: "Environment",
    country: "Kenya",
    metrics: {
      totalDonations: 45230,
      donationsChange: 12.5,
      activeDonors: 234,
      conversionRate: 3.8,
      avgDonation: 193,
      engagement: 12500,
      isLive: true,
    },
    healthIndicators: {
      fraudCheck: "good",
      mediaIssues: "good",
      compliance: "good",
      highRisk: false,
      missingUpdates: false,
      donationSpike: false,
    },
  },
  {
    id: "2",
    title: "Education Support for Underprivileged Children",
    coverImage: "/placeholder.svg",
    creator: {
      name: "Hope Foundation",
      avatar: "/placeholder.svg",
      email: "info@hopefoundation.org",
    },
    status: "Boosting",
    category: "Education",
    country: "Vietnam",
    metrics: {
      totalDonations: 78900,
      donationsChange: 28.3,
      activeDonors: 456,
      conversionRate: 5.2,
      avgDonation: 173,
      engagement: 23400,
      isLive: true,
    },
    healthIndicators: {
      fraudCheck: "good",
      mediaIssues: "good",
      compliance: "good",
      highRisk: false,
      missingUpdates: false,
      donationSpike: true,
    },
  },
  {
    id: "3",
    title: "Medical Equipment for Community Hospital",
    coverImage: "/placeholder.svg",
    creator: {
      name: "Health First",
      avatar: "/placeholder.svg",
      email: "admin@healthfirst.org",
    },
    status: "Ending Soon",
    category: "Healthcare",
    country: "Philippines",
    metrics: {
      totalDonations: 23450,
      donationsChange: -5.2,
      activeDonors: 89,
      conversionRate: 2.1,
      avgDonation: 263,
      engagement: 5600,
      isLive: false,
    },
    healthIndicators: {
      fraudCheck: "good",
      mediaIssues: "warning",
      compliance: "good",
      highRisk: false,
      missingUpdates: true,
      donationSpike: false,
    },
  },
  {
    id: "4",
    title: "Emergency Relief for Flood Victims",
    coverImage: "/placeholder.svg",
    creator: {
      name: "Rapid Response Team",
      avatar: "/placeholder.svg",
      email: "contact@rapidresponse.org",
    },
    status: "Flagged",
    category: "Emergency",
    country: "Bangladesh",
    metrics: {
      totalDonations: 156780,
      donationsChange: 156.7,
      activeDonors: 892,
      conversionRate: 8.9,
      avgDonation: 176,
      engagement: 45600,
      isLive: true,
    },
    healthIndicators: {
      fraudCheck: "warning",
      mediaIssues: "good",
      compliance: "warning",
      highRisk: true,
      missingUpdates: false,
      donationSpike: true,
    },
  },
];

const ActiveCampaigns = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusFilters, setStatusFilters] = useState<string[]>(["Normal"]);

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

  const getHealthIcon = (status: string) => {
    switch (status) {
      case "good":
        return "text-[#10B981]";
      case "warning":
        return "text-[#F59E0B]";
      case "danger":
        return "text-[#EF4444]";
      default:
        return "text-gray-400";
    }
  };

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDrawerOpen(true);
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-[1360px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#111827]">Active Campaigns</h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Monitor performance, compliance, and real-time activity across all live campaigns.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
              <Input
                placeholder="Search campaigns..."
                className="pl-9 w-[280px] border-[#E5E7EB] focus:border-[#2563EB]"
              />
            </div>
            <Button variant="outline" size="sm" className="border-[#E5E7EB]">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-[#E5E7EB]">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-[#E5E7EB]">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            {["Normal", "Boosting / High Activity", "Low Engagement", "Flagged", "Ending Soon"].map(
              (status) => (
                <Badge
                  key={status}
                  variant={statusFilters.includes(status) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    statusFilters.includes(status)
                      ? "bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                      : "border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]"
                  }`}
                  onClick={() => toggleStatusFilter(status)}
                >
                  {status}
                </Badge>
              )
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select defaultValue="all-categories">
                <SelectTrigger className="w-[160px] border-[#E5E7EB]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-creators">
                <SelectTrigger className="w-[160px] border-[#E5E7EB]">
                  <SelectValue placeholder="Creator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-creators">All Creators</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-countries">
                <SelectTrigger className="w-[160px] border-[#E5E7EB]">
                  <SelectValue placeholder="Region / Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-countries">All Countries</SelectItem>
                  <SelectItem value="kenya">Kenya</SelectItem>
                  <SelectItem value="vietnam">Vietnam</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="most-donations">
                <SelectTrigger className="w-[180px] border-[#E5E7EB]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-donations">Most donations</SelectItem>
                  <SelectItem value="highest-engagement">Highest engagement</SelectItem>
                  <SelectItem value="ending-soon">Ending soon</SelectItem>
                  <SelectItem value="recently-launched">Recently launched</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-white" : ""}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className={viewMode === "table" ? "bg-white" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="group cursor-pointer border border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#F3F4F6] transition-all duration-200 overflow-hidden"
                onClick={() => handleCampaignClick(campaign)}
              >
                {/* Top Section */}
                <div className="relative">
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={campaign.coverImage}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
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

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#111827] text-base line-clamp-2 mb-2">
                      {campaign.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={campaign.creator.avatar} />
                        <AvatarFallback>{campaign.creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#6B7280]">{campaign.creator.name}</span>
                    </div>
                  </div>

                  {/* Middle Section - Metrics */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E5E7EB]">
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-lg font-semibold text-[#111827]">
                          ${campaign.metrics.totalDonations.toLocaleString()}
                        </p>
                        {campaign.metrics.donationsChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-[#10B981]" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-[#EF4444]" />
                        )}
                      </div>
                      <p className="text-xs text-[#6B7280]">
                        {campaign.metrics.donationsChange > 0 ? "+" : ""}
                        {campaign.metrics.donationsChange}% vs yesterday
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-[#111827]">
                        {campaign.metrics.activeDonors}
                      </p>
                      <p className="text-xs text-[#6B7280]">Active donors</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#111827]">
                        {campaign.metrics.conversionRate}%
                      </p>
                      <p className="text-xs text-[#6B7280]">Conversion</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#111827]">
                        ${campaign.metrics.avgDonation}
                      </p>
                      <p className="text-xs text-[#6B7280]">Avg donation</p>
                    </div>
                  </div>

                  {/* Bottom Section - Health Indicators */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield
                        className={`h-4 w-4 ${getHealthIcon(campaign.healthIndicators.fraudCheck)}`}
                      />
                      <ImageIcon
                        className={`h-4 w-4 ${getHealthIcon(campaign.healthIndicators.mediaIssues)}`}
                      />
                      <FileSearch
                        className={`h-4 w-4 ${getHealthIcon(campaign.healthIndicators.compliance)}`}
                      />
                      {campaign.healthIndicators.highRisk && (
                        <MapPin className="h-4 w-4 text-[#EF4444]" />
                      )}
                      {campaign.healthIndicators.missingUpdates && (
                        <Clock className="h-4 w-4 text-[#F59E0B]" />
                      )}
                      {campaign.healthIndicators.donationSpike && (
                        <TrendingUp className="h-4 w-4 text-[#2563EB]" />
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Open in Review Mode
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Flag Campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#E5E7EB]">
            <table className="w-full">
              <thead className="border-b border-[#E5E7EB]">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#6B7280]">Campaign</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#6B7280]">Creator</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#6B7280]">Category</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#6B7280]">Donations</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#6B7280]">Donors</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#6B7280]">Conversion</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#6B7280]">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#6B7280]">Flags</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-[#6B7280]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-[#E5E7EB] hover:bg-[#F3F4F6] cursor-pointer"
                    onClick={() => handleCampaignClick(campaign)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={campaign.coverImage}
                          alt={campaign.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="max-w-[200px]">
                          <p className="font-medium text-sm text-[#111827] truncate">
                            {campaign.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#6B7280]">{campaign.creator.name}</td>
                    <td className="py-4 px-6 text-sm text-[#6B7280]">{campaign.category}</td>
                    <td className="py-4 px-6 text-sm font-medium text-[#111827]">
                      ${campaign.metrics.totalDonations.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#6B7280]">
                      {campaign.metrics.activeDonors}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#6B7280]">
                      {campaign.metrics.conversionRate}%
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Shield
                          className={`h-3.5 w-3.5 ${getHealthIcon(
                            campaign.healthIndicators.fraudCheck
                          )}`}
                        />
                        <ImageIcon
                          className={`h-3.5 w-3.5 ${getHealthIcon(
                            campaign.healthIndicators.mediaIssues
                          )}`}
                        />
                        <FileSearch
                          className={`h-3.5 w-3.5 ${getHealthIcon(
                            campaign.healthIndicators.compliance
                          )}`}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#E5E7EB]"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCampaignClick(campaign);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ActiveCampaignDrawer
        campaign={selectedCampaign}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </AdminLayout>
  );
};

export default ActiveCampaigns;
