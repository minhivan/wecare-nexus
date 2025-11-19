import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Building2, 
  User, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  XCircle,
  SlidersHorizontal,
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FilterStatus = "all" | "pending" | "approved" | "rejected" | "flagged";
type FilterType = "all" | "individual" | "organization";
type FilterRisk = "all" | "low" | "medium" | "high";

const KYCVerificationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterRisk, setFilterRisk] = useState<FilterRisk>("all");
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - expanded list
  const allSubmissions = [
    {
      id: "12345",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      name: "Nguyễn Văn A",
      type: "individual" as const,
      risk: "low" as const,
      status: "pending" as const,
      submittedAt: "2024-01-15 14:30",
    },
    {
      id: "12346",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
      name: "Trần Thị B",
      type: "individual" as const,
      risk: "medium" as const,
      status: "pending" as const,
      submittedAt: "2024-01-15 13:20",
    },
    {
      id: "12347",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company1",
      name: "Công ty TNHH ABC",
      type: "organization" as const,
      risk: "high" as const,
      status: "flagged" as const,
      submittedAt: "2024-01-15 11:45",
    },
    {
      id: "12348",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai",
      name: "Lê Văn C",
      type: "individual" as const,
      risk: "low" as const,
      status: "approved" as const,
      submittedAt: "2024-01-14 16:00",
    },
    {
      id: "12349",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      name: "Phạm Minh D",
      type: "individual" as const,
      risk: "medium" as const,
      status: "rejected" as const,
      submittedAt: "2024-01-14 10:30",
    },
    {
      id: "12350",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
      name: "Hoàng Thị E",
      type: "individual" as const,
      risk: "low" as const,
      status: "pending" as const,
      submittedAt: "2024-01-14 09:15",
    },
    {
      id: "12351",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Company2",
      name: "Quỹ Từ Thiện XYZ",
      type: "organization" as const,
      risk: "medium" as const,
      status: "pending" as const,
      submittedAt: "2024-01-13 15:45",
    },
    {
      id: "12352",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
      name: "Đặng Văn F",
      type: "individual" as const,
      risk: "high" as const,
      status: "flagged" as const,
      submittedAt: "2024-01-13 11:20",
    },
  ];

  // Pagination
  const totalPages = Math.ceil(allSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const submissions = allSubmissions.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    totalPending: 15,
    highRiskToday: 3,
    avgReviewTime: "18h"
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-[#FFF8E1] text-[#F57C00] border-[#FFD54F] font-medium">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7] font-medium">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-[#FFEBEE] text-[#C62828] border-[#EF5350] font-medium">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "flagged":
        return (
          <Badge variant="outline" className="bg-[#FFF3E0] text-[#E65100] border-[#FFB74D] font-medium">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Flagged
          </Badge>
        );
      default:
        return null;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]";
      case "medium": return "bg-[#FFF8E1] text-[#F57C00] border-[#FFD54F]";
      case "high": return "bg-[#FFEBEE] text-[#C62828] border-[#EF5350]";
      default: return "bg-muted text-muted-foreground";
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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">KYC Verification Center</h1>
            <p className="text-muted-foreground text-base">Review and verify user identities</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-[320px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 text-sm bg-white border-border/60 rounded-xl focus-visible:ring-[#4ECDC4] focus-visible:ring-offset-0 focus-visible:border-[#4ECDC4]"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-10 px-4 rounded-xl border-border/60 ${showFilters ? 'bg-[#EFFFFC] border-[#4ECDC4] text-[#4ECDC4]' : ''}`}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] h-10 rounded-xl border-border/60">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="risk-high">Risk: High to Low</SelectItem>
                <SelectItem value="risk-low">Risk: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Filter Bar */}
            {showFilters && (
              <Card className="rounded-2xl border-border/40 shadow-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Status */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</label>
                      <div className="flex flex-wrap gap-2">
                        <FilterChip active={filterStatus === "all"} onClick={() => setFilterStatus("all")}>All</FilterChip>
                        <FilterChip active={filterStatus === "pending"} onClick={() => setFilterStatus("pending")}>Pending</FilterChip>
                        <FilterChip active={filterStatus === "approved"} onClick={() => setFilterStatus("approved")}>Approved</FilterChip>
                        <FilterChip active={filterStatus === "rejected"} onClick={() => setFilterStatus("rejected")}>Rejected</FilterChip>
                        <FilterChip active={filterStatus === "flagged"} onClick={() => setFilterStatus("flagged")}>Flagged</FilterChip>
                      </div>
                    </div>

                    {/* Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account Type</label>
                      <div className="flex flex-wrap gap-2">
                        <FilterChip active={filterType === "all"} onClick={() => setFilterType("all")}>All</FilterChip>
                        <FilterChip active={filterType === "individual"} onClick={() => setFilterType("individual")}>Individual</FilterChip>
                        <FilterChip active={filterType === "organization"} onClick={() => setFilterType("organization")}>Organization</FilterChip>
                      </div>
                    </div>

                    {/* Risk */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Level</label>
                      <div className="flex flex-wrap gap-2">
                        <FilterChip active={filterRisk === "all"} onClick={() => setFilterRisk("all")}>All</FilterChip>
                        <FilterChip active={filterRisk === "low"} onClick={() => setFilterRisk("low")}>Low</FilterChip>
                        <FilterChip active={filterRisk === "medium"} onClick={() => setFilterRisk("medium")}>Medium</FilterChip>
                        <FilterChip active={filterRisk === "high"} onClick={() => setFilterRisk("high")}>High</FilterChip>
                      </div>
                    </div>

                    {/* Date Range */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date Range</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal h-10 rounded-xl border-border/60">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span className="text-sm">Last 7 days</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" align="start">
                          <div className="space-y-2">
                            <button className="w-full text-left text-sm px-3 py-2 hover:bg-muted rounded-lg">Today</button>
                            <button className="w-full text-left text-sm px-3 py-2 hover:bg-muted rounded-lg">Last 7 days</button>
                            <button className="w-full text-left text-sm px-3 py-2 hover:bg-muted rounded-lg">Last 30 days</button>
                            <button className="w-full text-left text-sm px-3 py-2 hover:bg-muted rounded-lg">All time</button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Table */}
            {submissions.length > 0 ? (
              <>
                <Card className="rounded-2xl border-border/40 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50 bg-muted/20">
                          <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                          <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account Type</th>
                          <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Submission Time</th>
                          <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Risk Level</th>
                          <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                          <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions.map((submission, index) => (
                          <tr 
                            key={submission.id}
                            className="border-b border-border/30 hover:bg-muted/20 transition-all duration-200 group relative"
                            style={{ 
                              animation: `fade-in 0.3s ease-out ${index * 0.05}s backwards` 
                            }}
                          >
                            {/* Hover accent stripe */}
                            <td colSpan={6} className="absolute left-0 top-0 h-full w-1 bg-[#4ECDC4] opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            {/* User */}
                            <td className="py-5 px-6">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10 border-2 border-border/50 ring-2 ring-transparent group-hover:ring-[#4ECDC4]/20 transition-all">
                                  <AvatarImage src={submission.avatar} alt={submission.name} />
                                  <AvatarFallback className="text-sm">{submission.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-foreground text-sm">{submission.name}</div>
                                  <div className="text-xs text-muted-foreground">ID: {submission.id}</div>
                                </div>
                              </div>
                            </td>

                            {/* Account Type */}
                            <td className="py-5 px-6">
                              <div className="flex items-center gap-2">
                                {submission.type === "individual" ? (
                                  <>
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                      <User className="w-4 h-4 text-blue-600" strokeWidth={2} />
                                    </div>
                                    <span className="text-sm text-foreground font-medium">Individual</span>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                                      <Building2 className="w-4 h-4 text-purple-600" strokeWidth={2} />
                                    </div>
                                    <span className="text-sm text-foreground font-medium">Organization</span>
                                  </>
                                )}
                              </div>
                            </td>

                            {/* Submission Time */}
                            <td className="py-5 px-6">
                              <div className="text-sm text-foreground">{submission.submittedAt}</div>
                            </td>

                            {/* Risk Level */}
                            <td className="py-5 px-6">
                              <Badge 
                                variant="outline" 
                                className={`${getRiskColor(submission.risk)} border capitalize font-medium text-xs`}
                              >
                                {submission.risk}
                              </Badge>
                            </td>

                            {/* Status */}
                            <td className="py-5 px-6">
                              {getStatusBadge(submission.status)}
                            </td>

                            {/* Action */}
                            <td className="py-5 px-6 text-right">
                              <Link to={`/admin/verification/${submission.id}`}>
                                <Button 
                                  size="sm"
                                  className="bg-[#4ECDC4] hover:bg-[#45b8b0] text-white rounded-xl px-5 h-9 font-medium shadow-sm hover:shadow-md transition-all"
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

                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{" "}
                    <span className="font-medium text-foreground">{Math.min(startIndex + itemsPerPage, allSubmissions.length)}</span> of{" "}
                    <span className="font-medium text-foreground">{allSubmissions.length}</span> submissions
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-9 px-3 rounded-xl border-border/60 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`h-9 w-9 rounded-xl ${
                            currentPage === page 
                              ? 'bg-[#4ECDC4] hover:bg-[#45b8b0] text-white border-0' 
                              : 'border-border/60'
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="h-9 px-3 rounded-xl border-border/60 disabled:opacity-40"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              // Empty State
              <Card className="rounded-2xl border-border/40 shadow-sm">
                <CardContent className="py-20 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted/30 flex items-center justify-center">
                    <ShieldCheck className="w-10 h-10 text-muted-foreground/50" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No KYC submissions pending</h3>
                  <p className="text-muted-foreground mb-6">All verification requests have been processed.</p>
                  <Button variant="outline" className="rounded-xl">
                    Refresh
                  </Button>
                </CardContent>
              </Card>
            )}
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
