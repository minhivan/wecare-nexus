import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Building2, User, AlertTriangle, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

type FilterStatus = "all" | "pending" | "approved" | "rejected" | "flagged";
type FilterType = "all" | "individual" | "organization";
type FilterRisk = "all" | "low" | "medium" | "high";

const KYCVerificationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterRisk, setFilterRisk] = useState<FilterRisk>("all");

  // Mock data
  const submissions = [
    {
      id: "12345",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      name: "Nguyễn Văn A",
      type: "individual" as const,
      risk: "low" as const,
      status: "pending" as const,
      submittedAt: "2024-01-15 14:30",
      notes: "Complete documentation"
    },
    {
      id: "12346",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
      name: "Trần Thị B",
      type: "individual" as const,
      risk: "medium" as const,
      status: "pending" as const,
      submittedAt: "2024-01-15 13:20",
      notes: "Missing bank statement"
    },
    {
      id: "12347",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company1",
      name: "Công ty TNHH ABC",
      type: "organization" as const,
      risk: "high" as const,
      status: "flagged" as const,
      submittedAt: "2024-01-15 11:45",
      notes: "Suspicious activity detected"
    },
    {
      id: "12348",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai",
      name: "Lê Văn C",
      type: "individual" as const,
      risk: "low" as const,
      status: "approved" as const,
      submittedAt: "2024-01-14 16:00",
      notes: "All documents verified"
    },
    {
      id: "12349",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      name: "Phạm Minh D",
      type: "individual" as const,
      risk: "medium" as const,
      status: "rejected" as const,
      submittedAt: "2024-01-14 10:30",
      notes: "Invalid documents"
    }
  ];

  const stats = {
    totalPending: 15,
    highRiskToday: 3,
    avgReviewTime: "24h"
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]";
      case "medium": return "bg-[#FFF8E1] text-[#F57C00] border-[#FFD54F]";
      case "high": return "bg-[#FFEBEE] text-[#C62828] border-[#EF5350]";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "approved": return <CheckCircle2 className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      case "flagged": return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const FilterChip = ({ 
    active, 
    onClick, 
    children 
  }: { 
    active: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${active 
          ? "bg-[#EFFFFC] text-[#4ECDC4] border-2 border-[#4ECDC4] shadow-[0_0_20px_rgba(78,205,196,0.15)]" 
          : "bg-white text-muted-foreground border border-border hover:bg-muted/30"
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">KYC Verification Center</h1>
          <p className="text-muted-foreground text-base">Review and verify user identities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Search & Filters */}
            <Card className="rounded-2xl border-border/40 shadow-sm">
              <CardContent className="p-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name, ID, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base bg-background border-border/60 rounded-xl focus-visible:ring-[#4ECDC4] focus-visible:ring-offset-0 focus-visible:border-[#4ECDC4] transition-all"
                  />
                </div>

                {/* Filter Chips */}
                <div className="space-y-3">
                  {/* Status */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[60px]">Status</span>
                    <FilterChip active={filterStatus === "all"} onClick={() => setFilterStatus("all")}>All</FilterChip>
                    <FilterChip active={filterStatus === "pending"} onClick={() => setFilterStatus("pending")}>Pending</FilterChip>
                    <FilterChip active={filterStatus === "approved"} onClick={() => setFilterStatus("approved")}>Approved</FilterChip>
                    <FilterChip active={filterStatus === "rejected"} onClick={() => setFilterStatus("rejected")}>Rejected</FilterChip>
                    <FilterChip active={filterStatus === "flagged"} onClick={() => setFilterStatus("flagged")}>Flagged</FilterChip>
                  </div>

                  {/* Type */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[60px]">Type</span>
                    <FilterChip active={filterType === "all"} onClick={() => setFilterType("all")}>All</FilterChip>
                    <FilterChip active={filterType === "individual"} onClick={() => setFilterType("individual")}>Individual</FilterChip>
                    <FilterChip active={filterType === "organization"} onClick={() => setFilterType("organization")}>Organization</FilterChip>
                  </div>

                  {/* Risk */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[60px]">Risk</span>
                    <FilterChip active={filterRisk === "all"} onClick={() => setFilterRisk("all")}>All</FilterChip>
                    <FilterChip active={filterRisk === "low"} onClick={() => setFilterRisk("low")}>Low</FilterChip>
                    <FilterChip active={filterRisk === "medium"} onClick={() => setFilterRisk("medium")}>Medium</FilterChip>
                    <FilterChip active={filterRisk === "high"} onClick={() => setFilterRisk("high")}>High</FilterChip>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card className="rounded-2xl border-border/40 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                      <th className="text-left py-5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="text-left py-5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Risk</th>
                      <th className="text-right py-5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr 
                        key={submission.id}
                        className="border-b border-border/30 hover:bg-muted/30 transition-colors group"
                      >
                        {/* User */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-11 h-11 border-2 border-border/50">
                              <AvatarImage src={submission.avatar} alt={submission.name} />
                              <AvatarFallback>{submission.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">{submission.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                                {getStatusIcon(submission.status)}
                                <span className="capitalize">{submission.status}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            {submission.type === "individual" ? (
                              <>
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">Individual</span>
                              </>
                            ) : (
                              <>
                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">Organization</span>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Risk */}
                        <td className="py-5 px-6">
                          <Badge 
                            variant="outline" 
                            className={`${getRiskColor(submission.risk)} border capitalize font-medium`}
                          >
                            {submission.risk}
                          </Badge>
                        </td>

                        {/* Action */}
                        <td className="py-5 px-6 text-right">
                          <Link to={`/admin/verification/${submission.id}`}>
                            <Button 
                              size="sm"
                              className="bg-[#4ECDC4] hover:bg-[#45b8b0] text-white rounded-lg px-5 shadow-sm"
                            >
                              Review
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Panel - Stats */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="rounded-2xl border-border/40 shadow-sm">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-semibold text-foreground">{stats.totalPending}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Pending</div>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div>
                    <div className="text-3xl font-semibold text-[#FF6B6B]">{stats.highRiskToday}</div>
                    <div className="text-sm text-muted-foreground mt-1">High-risk Today</div>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div>
                    <div className="text-3xl font-semibold text-foreground">{stats.avgReviewTime}</div>
                    <div className="text-sm text-muted-foreground mt-1">Avg Review Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default KYCVerificationList;
