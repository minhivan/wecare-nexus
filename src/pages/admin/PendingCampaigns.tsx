import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Search, Download, RefreshCw, Calendar, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CampaignReviewDrawer } from "@/components/admin/CampaignReviewDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusType = "awaiting_review" | "high_priority" | "awaiting_assets" | "sla_urgent";

interface CampaignSubmission {
  id: string;
  title: string;
  thumbnail: string;
  creator: {
    name: string;
    email: string;
  };
  category: string;
  country: string;
  submissionId: string;
  goalAmount: number;
  duration: number;
  missionTagline: string;
  issues: string[];
  hasRiskSignals: boolean;
  slaHoursLeft: number;
  status: string;
  submittedAt: string;
}

const mockCampaigns: CampaignSubmission[] = [
  {
    id: "CAMP-2024-001",
    title: "Clean Water Initiative for Rural Communities",
    thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    creator: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
    },
    category: "Environment",
    country: "Vietnam",
    submissionId: "CAMP-2024-001",
    goalAmount: 50000,
    duration: 60,
    missionTagline: "Bringing clean water to 1,000 families in rural Vietnam",
    issues: ["Missing required documents", "Low-quality cover image"],
    hasRiskSignals: false,
    slaHoursLeft: 18,
    status: "Awaiting review",
    submittedAt: "2 hours ago",
  },
  {
    id: "CAMP-2024-002",
    title: "Education Support for Underprivileged Children",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    creator: {
      name: "Trần Thị B",
      email: "tranthib@example.com",
    },
    category: "Education",
    country: "Vietnam",
    submissionId: "CAMP-2024-002",
    goalAmount: 30000,
    duration: 90,
    missionTagline: "Providing school supplies and scholarships for 500 students",
    issues: [],
    hasRiskSignals: false,
    slaHoursLeft: 36,
    status: "Awaiting review",
    submittedAt: "5 hours ago",
  },
  {
    id: "CAMP-2024-003",
    title: "Emergency Medical Equipment for Local Hospital",
    thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
    creator: {
      name: "Lê Văn C",
      email: "levanc@example.com",
    },
    category: "Healthcare",
    country: "Vietnam",
    submissionId: "CAMP-2024-003",
    goalAmount: 100000,
    duration: 30,
    missionTagline: "Urgent medical equipment needed for emergency ward",
    issues: ["Suspicious text patterns detected"],
    hasRiskSignals: true,
    slaHoursLeft: 6,
    status: "High priority",
    submittedAt: "30 minutes ago",
  },
];

const PendingCampaigns = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignSubmission | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pendingCount = mockCampaigns.length;
  const urgentCount = mockCampaigns.filter(c => c.slaHoursLeft < 12).length;

  const handleReview = (campaign: CampaignSubmission) => {
    setSelectedCampaign(campaign);
    setDrawerOpen(true);
  };

  const getSLABadgeColor = (hours: number) => {
    if (hours < 12) return "bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]";
    if (hours < 24) return "bg-[#FEF3C7] text-[#F59E0B] border-[#FDE68A]";
    return "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]";
  };

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ width: "1360px" }}>
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 bg-[#F9FAFB] border-b border-[#E5E7EB] pb-6 pt-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-[24px] font-semibold text-[#111827] mb-1">
                Pending Campaign Reviews
              </h1>
              <p className="text-[14px] text-[#6B7280]">
                Review new campaign submissions before publishing.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 text-[14px] border-[#E5E7EB]">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm" className="h-9 border-[#E5E7EB]">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-9 text-[14px] border-[#E5E7EB]">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Global Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input
              placeholder="Search by campaign name or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 border-[#E5E7EB] bg-white text-[14px]"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-3">
            {/* Status Chips */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`px-3 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
                  selectedStatus === "all"
                    ? "bg-[#2563EB] text-white"
                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatus("high_priority")}
                className={`px-3 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
                  selectedStatus === "high_priority"
                    ? "bg-[#2563EB] text-white"
                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]"
                }`}
              >
                High Priority
              </button>
              <button
                onClick={() => setSelectedStatus("awaiting_assets")}
                className={`px-3 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
                  selectedStatus === "awaiting_assets"
                    ? "bg-[#2563EB] text-white"
                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]"
                }`}
              >
                Awaiting Assets
              </button>
              <button
                onClick={() => setSelectedStatus("sla_urgent")}
                className={`px-3 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
                  selectedStatus === "sla_urgent"
                    ? "bg-[#2563EB] text-white"
                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]"
                }`}
              >
                SLA &lt; 24 hours
              </button>
            </div>

            <div className="h-6 w-px bg-[#E5E7EB]" />

            {/* Dropdown Filters */}
            <Select>
              <SelectTrigger className="w-[140px] h-9 border-[#E5E7EB] text-[14px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[140px] h-9 border-[#E5E7EB] text-[14px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="vietnam">Vietnam</SelectItem>
                <SelectItem value="thailand">Thailand</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[140px] h-9 border-[#E5E7EB] text-[14px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="impact">Highest impact</SelectItem>
                <SelectItem value="sla">SLA remaining</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-4 mb-6 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280]">Pending reviews:</span>
            <span className="text-[14px] font-semibold text-[#111827]">{pendingCount}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280]">SLA urgent:</span>
            <Badge className="bg-[#EF4444] text-white border-0">{urgentCount}</Badge>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280]">SLA target:</span>
            <span className="text-[14px] font-medium text-[#111827]">48h review window</span>
          </div>
        </div>

        {/* Review Queue - Flat Cards List */}
        <div className="space-y-3 pb-8">
          {mockCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="group bg-white rounded-[12px] border border-[#E5E7EB] hover:shadow-sm hover:border-l-4 hover:border-l-[#2563EB] hover:bg-[#F3F4F6] transition-all cursor-pointer overflow-hidden"
              onClick={() => handleReview(campaign)}
            >
              <div className="grid grid-cols-[auto,1fr,auto] gap-6 p-5 items-center">
                {/* Left Block: Thumbnail + Basic Info */}
                <div className="flex items-start gap-4 min-w-[320px]">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#F3F4F6]">
                    <img 
                      src={campaign.thumbnail} 
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-[#111827] mb-1 line-clamp-2">
                      {campaign.title}
                    </h3>
                    <p className="text-[13px] text-[#6B7280] mb-2" title={campaign.creator.email}>
                      {campaign.creator.name}
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[11px] border-[#E5E7EB] font-medium">
                        {campaign.category}
                      </Badge>
                      <span className="text-[12px] text-[#9CA3AF]">{campaign.country}</span>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] font-mono">{campaign.submissionId}</p>
                  </div>
                </div>

                {/* Middle Block: Summary + Issues */}
                <div className="space-y-3">
                  {/* Quick Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-1">Goal</p>
                      <p className="text-[14px] font-semibold text-[#111827]">
                        ${campaign.goalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-1">Duration</p>
                      <p className="text-[14px] font-semibold text-[#111827]">
                        {campaign.duration} days
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-1">Submitted</p>
                      <p className="text-[13px] text-[#6B7280]">
                        {campaign.submittedAt}
                      </p>
                    </div>
                  </div>

                  {/* Mission Tagline */}
                  <p className="text-[13px] text-[#6B7280] line-clamp-1">
                    {campaign.missionTagline}
                  </p>

                  {/* Issues Highlight */}
                  {campaign.issues.length > 0 && (
                    <div className="flex items-start gap-2 bg-[#FEF3C7] px-3 py-2 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-[#F59E0B] mb-0.5">Issues detected</p>
                        <ul className="text-[12px] text-[#92400E] space-y-0.5">
                          {campaign.issues.map((issue, idx) => (
                            <li key={idx} className="truncate">• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {campaign.hasRiskSignals && (
                    <div className="flex items-center gap-2 bg-[#FEF2F2] px-3 py-2 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-[#EF4444]" />
                      <p className="text-[12px] font-medium text-[#EF4444]">Risk signals detected</p>
                    </div>
                  )}
                </div>

                {/* Right Block: SLA + Status + Action */}
                <div className="flex flex-col items-end gap-3">
                  {/* SLA Countdown */}
                  <Badge className={`${getSLABadgeColor(campaign.slaHoursLeft)} border text-[12px] font-semibold px-3 py-1`}>
                    <Clock className="h-3 w-3 mr-1" />
                    {campaign.slaHoursLeft}h left
                  </Badge>

                  {/* Status */}
                  <Badge variant="outline" className="text-[12px] border-[#E5E7EB] font-medium">
                    {campaign.status}
                  </Badge>

                  {/* Review Button */}
                  <Button
                    size="sm"
                    className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white h-9 px-5 text-[13px] font-medium shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReview(campaign);
                    }}
                  >
                    Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center pb-8">
          <Button variant="outline" className="border-[#E5E7EB]">
            Load More
          </Button>
        </div>
      </div>

      {/* Review Drawer */}
      <CampaignReviewDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        campaign={selectedCampaign}
      />
    </AdminLayout>
  );
};

export default PendingCampaigns;
