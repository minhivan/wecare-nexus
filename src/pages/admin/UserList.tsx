import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserDetailDrawer } from "@/components/admin/UserDetailDrawer";
import {
  Search,
  Download,
  SlidersHorizontal,
  UserPlus,
  RefreshCw,
  TrendingUp,
  Users,
  AlertTriangle,
  Shield,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  Flag,
  MoreHorizontal,
  Eye,
  Ban,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@example.com",
    avatar: "NVA",
    role: "Creator",
    emailVerified: true,
    kycStatus: "Verified",
    lastLogin: "2 hours ago",
    device: "Chrome on Windows",
    totalDonations: "$2,450",
    campaignsCreated: 3,
    riskSignals: [],
    status: "Active",
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "tran.thi.binh@example.com",
    avatar: "TTB",
    role: "Donor",
    emailVerified: true,
    kycStatus: "Pending",
    lastLogin: "1 day ago",
    device: "Safari on iPhone",
    totalDonations: "$5,320",
    campaignsCreated: 0,
    riskSignals: ["multi-account"],
    status: "Active",
  },
  {
    id: "3",
    name: "Lê Minh Công",
    email: "le.minh.cong@example.com",
    avatar: "LMC",
    role: "Organization",
    emailVerified: true,
    kycStatus: "Verified",
    lastLogin: "5 hours ago",
    device: "Chrome on Mac",
    totalDonations: "$0",
    campaignsCreated: 12,
    riskSignals: [],
    status: "Active",
  },
  {
    id: "4",
    name: "Phạm Thị Dung",
    email: "pham.thi.dung@example.com",
    avatar: "PTD",
    role: "Donor",
    emailVerified: false,
    kycStatus: "None",
    lastLogin: "3 days ago",
    device: "Chrome on Android",
    totalDonations: "$180",
    campaignsCreated: 0,
    riskSignals: ["fraud"],
    status: "Flagged",
  },
  {
    id: "5",
    name: "Hoàng Văn Em",
    email: "hoang.van.em@example.com",
    avatar: "HVE",
    role: "Creator",
    emailVerified: true,
    kycStatus: "Failed",
    lastLogin: "1 week ago",
    device: "Firefox on Linux",
    totalDonations: "$890",
    campaignsCreated: 1,
    riskSignals: ["suspicious"],
    status: "Suspended",
  },
];

export default function UserList() {
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");

  const handleViewUser = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const statusFilters = ["All", "Verified", "Unverified", "KYC Pending", "Flagged", "Suspended"];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#111827] tracking-tight">Users</h1>
            <p className="text-[#6B7280] mt-2">
              Manage users, permissions, verification, and activity across the platform.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button className="gap-2 bg-[#2563EB] hover:bg-[#2563EB]/90">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Overview Widgets */}
        <div className="grid grid-cols-4 gap-4">
          {/* Total Users */}
          <Card className="p-5 border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">Total Users</p>
                <p className="text-2xl font-semibold text-[#111827] mt-2">24,582</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-[#10B981]" />
                  <span className="text-xs font-medium text-[#10B981]">+12.5%</span>
                  <span className="text-xs text-[#6B7280]">vs last 7 days</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#2563EB]" />
              </div>
            </div>
          </Card>

          {/* Growth Breakdown */}
          <Card className="p-5 border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">New This Week</p>
                <p className="text-2xl font-semibold text-[#111827] mt-2">342</p>
                <div className="flex gap-2 mt-2">
                  <button className="text-xs font-medium text-[#2563EB]">Daily</button>
                  <button className="text-xs text-[#6B7280]">Weekly</button>
                  <button className="text-xs text-[#6B7280]">Monthly</button>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
              </div>
            </div>
          </Card>

          {/* User Types */}
          <Card className="p-5 border-[#E5E7EB]">
            <p className="text-sm font-medium text-[#6B7280] mb-3">User Types</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Donors</span>
                <span className="font-medium text-[#111827]">18,234</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Creators</span>
                <span className="font-medium text-[#111827]">4,821</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Organizations</span>
                <span className="font-medium text-[#111827]">1,527</span>
              </div>
            </div>
          </Card>

          {/* Risk & Compliance */}
          <Card className="p-5 border-[#E5E7EB]">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-medium text-[#6B7280]">Risk & Compliance</p>
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Flagged</span>
                <span className="font-medium text-[#EF4444]">23</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Pending KYC</span>
                <span className="font-medium text-[#F59E0B]">142</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Failed KYC</span>
                <span className="font-medium text-[#EF4444]">8</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Smart Filter Bar */}
        <Card className="p-4 border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <Input
                placeholder="Search by name, email, or ID..."
                className="pl-10 border-[#E5E7EB] focus-visible:ring-[#2563EB]"
              />
            </div>

            {/* Status Filters */}
            <div className="flex gap-2">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeStatusFilter === filter
                      ? "bg-[#2563EB] text-white"
                      : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <select className="px-3 py-1.5 rounded-md border border-[#E5E7EB] text-sm text-[#6B7280] bg-white">
              <option>All Roles</option>
              <option>Donor</option>
              <option>Creator</option>
              <option>Organization</option>
            </select>

            <select className="px-3 py-1.5 rounded-md border border-[#E5E7EB] text-sm text-[#6B7280] bg-white">
              <option>Sort by: Newest</option>
              <option>Highest Contributors</option>
              <option>Highest Risk</option>
              <option>Most Donations</option>
              <option>Recently Active</option>
            </select>
          </div>
        </Card>

        {/* Main Table */}
        <Card className="border-[#E5E7EB]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">
                    User & Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">
                    Role & Verification
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">
                    Activity
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">
                    Contributions
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#6B7280]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors group cursor-pointer"
                    onClick={() => handleViewUser(user)}
                  >
                    {/* User & Email */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center text-white text-sm font-medium">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-[#111827] text-sm">{user.name}</p>
                          <p className="text-xs text-[#6B7280]">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role & Verification */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <Badge
                          variant="outline"
                          className="border-[#E5E7EB] text-[#111827] text-xs"
                        >
                          {user.role}
                        </Badge>
                        <div className="flex items-center gap-2">
                          {user.emailVerified ? (
                            <div className="flex items-center gap-1 text-xs text-[#10B981]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Email</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                              <XCircle className="w-3 h-3" />
                              <span>Email</span>
                            </div>
                          )}
                          <span className="text-xs text-[#6B7280]">•</span>
                          <span
                            className={`text-xs ${
                              user.kycStatus === "Verified"
                                ? "text-[#10B981]"
                                : user.kycStatus === "Pending"
                                ? "text-[#F59E0B]"
                                : user.kycStatus === "Failed"
                                ? "text-[#EF4444]"
                                : "text-[#6B7280]"
                            }`}
                          >
                            KYC: {user.kycStatus}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Activity */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                          <Clock className="w-3 h-3" />
                          <span>{user.lastLogin}</span>
                        </div>
                        <p className="text-xs text-[#9CA3AF]">{user.device}</p>
                      </div>
                    </td>

                    {/* Contributions */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-[#111827]">
                          {user.totalDonations}
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          {user.campaignsCreated} campaigns
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${
                            user.status === "Active"
                              ? "bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20"
                              : user.status === "Suspended"
                              ? "bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20"
                              : "bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                          }`}
                        >
                          {user.status}
                        </Badge>
                        {user.riskSignals.length > 0 && (
                          <div className="flex items-center gap-1">
                            {user.riskSignals.includes("fraud") && (
                              <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
                            )}
                            {user.riskSignals.includes("multi-account") && (
                              <Shield className="w-3 h-3 text-[#F59E0B]" />
                            )}
                            {user.riskSignals.includes("suspicious") && (
                              <Flag className="w-3 h-3 text-[#F59E0B]" />
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 h-7 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewUser(user);
                          }}
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Flag className="w-4 h-4 mr-2" />
                              Flag User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[#EF4444]">
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* User Detail Drawer */}
      <UserDetailDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        user={selectedUser}
      />
    </AdminLayout>
  );
}
