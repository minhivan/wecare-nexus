import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Search, Download, RefreshCw, Calendar, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KYCReviewDrawer } from "@/components/admin/KYCReviewDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusType = "pending" | "in_review" | "approved" | "rejected";
type SubmissionType = "organization" | "individual";

interface KYCSubmission {
  id: string;
  name: string;
  email: string;
  avatar: string;
  submissionType: SubmissionType;
  country: string;
  status: StatusType;
  submittedAt: string;
  documents: {
    id: boolean;
    businessLicense: boolean;
    proofOfAddress: boolean;
    selfie: boolean;
  };
}

const mockSubmissions: KYCSubmission[] = [
  {
    id: "KYC-2024-001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    submissionType: "individual",
    country: "Vietnam",
    status: "pending",
    submittedAt: "5 minutes ago",
    documents: { id: true, businessLicense: false, proofOfAddress: true, selfie: true }
  },
  {
    id: "KYC-2024-002",
    name: "Công ty TNHH ABC",
    email: "contact@abc.com",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ABC",
    submissionType: "organization",
    country: "Vietnam",
    status: "in_review",
    submittedAt: "2 hours ago",
    documents: { id: true, businessLicense: true, proofOfAddress: true, selfie: false }
  },
  {
    id: "KYC-2024-003",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    submissionType: "individual",
    country: "Vietnam",
    status: "approved",
    submittedAt: "1 day ago",
    documents: { id: true, businessLicense: false, proofOfAddress: true, selfie: true }
  },
];

const KYCVerificationList = () => {
  const [selectedStatus, setSelectedStatus] = useState<StatusType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusColors: Record<StatusType, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    in_review: "bg-blue-100 text-blue-800 border-blue-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const statusLabels: Record<StatusType, string> = {
    pending: "Pending",
    in_review: "In Review",
    approved: "Approved",
    rejected: "Rejected",
  };

  const pendingCount = mockSubmissions.filter(s => s.status === "pending").length;
  const overdueCount = 2; // Mock data

  const handleReview = (submission: KYCSubmission) => {
    setSelectedSubmission(submission);
    setDrawerOpen(true);
  };

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ width: "1360px" }}>
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 bg-[#F9FAFB] border-b border-[#E5E7EB] pb-6 pt-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-[24px] font-semibold text-[#111827] mb-1">
                KYC Review
              </h1>
              <p className="text-[14px] text-[#6B7280]">
                Review and verify identity information from organizations and users.
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
              placeholder="Search by name, email, or submission ID..."
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
              {(["pending", "in_review", "approved", "rejected"] as StatusType[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
                    selectedStatus === status
                      ? "bg-[#2563EB] text-white"
                      : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]"
                  }`}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-[#E5E7EB]" />

            {/* Dropdown Filters */}
            <Select>
              <SelectTrigger className="w-[160px] h-9 border-[#E5E7EB] text-[14px]">
                <SelectValue placeholder="Submission Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
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
                <SelectValue placeholder="Reviewer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviewers</SelectItem>
                <SelectItem value="admin1">Admin 1</SelectItem>
                <SelectItem value="admin2">Admin 2</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[140px] h-9 border-[#E5E7EB] text-[14px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="sla">SLA Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* SLA Indicator Bar */}
        <div className="flex items-center gap-4 mb-6 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280]">Pending reviews:</span>
            <span className="text-[14px] font-semibold text-[#111827]">{pendingCount}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280]">Overdue:</span>
            <Badge className="bg-[#EF4444] text-white border-0">{overdueCount}</Badge>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280]">SLA target:</span>
            <span className="text-[14px] font-medium text-[#111827]">48h review window</span>
          </div>
        </div>

        {/* Main Content - KYC Submission List */}
        <div className="space-y-3 pb-8">
          {mockSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="group bg-white rounded-[10px] border border-[#E5E7EB] p-5 hover:bg-[#F3F4F6] hover:border-l-4 hover:border-l-[#2563EB] transition-all cursor-pointer"
              onClick={() => handleReview(submission)}
            >
              <div className="flex items-center justify-between">
                {/* Left: User Info */}
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={submission.avatar} />
                    <AvatarFallback>{submission.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#111827] mb-0.5">
                      {submission.name}
                    </h3>
                    <p className="text-[14px] text-[#6B7280]">{submission.email}</p>
                    <p className="text-[12px] text-[#9CA3AF] italic">{submission.id}</p>
                  </div>
                </div>

                {/* Middle: Submission Details */}
                <div className="flex items-center gap-8 flex-1">
                  <div>
                    <Badge variant="outline" className="text-[12px] border-[#E5E7EB]">
                      {submission.submissionType === "organization" ? "Organization" : "Individual"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#6B7280] mb-1">{submission.country}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] text-[#6B7280] mb-1">Documents:</p>
                    <div className="flex gap-1.5">
                      {submission.documents.id && (
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" title="ID Document" />
                      )}
                      {submission.documents.businessLicense && (
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" title="Business License" />
                      )}
                      {submission.documents.proofOfAddress && (
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" title="Proof of Address" />
                      )}
                      {submission.documents.selfie && (
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" title="Selfie Verification" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#9CA3AF]">
                      Submitted {submission.submittedAt}
                    </p>
                  </div>
                </div>

                {/* Right: Status & Action */}
                <div className="flex items-center gap-3">
                  <Badge className={`${statusColors[submission.status]} border text-[13px] font-medium`}>
                    {statusLabels[submission.status]}
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white h-8 px-4 text-[14px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReview(submission);
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
      <KYCReviewDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        submission={selectedSubmission}
      />
    </AdminLayout>
  );
};

export default KYCVerificationList;
