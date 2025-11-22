import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Mail,
  MapPin,
  Calendar,
  Monitor,
  Chrome,
  CheckCircle2,
  XCircle,
  FileText,
  Activity,
  DollarSign,
  Heart,
  MessageSquare,
  Ban,
  Flag,
  KeyRound,
  UserCog,
  Clock,
  Globe,
  Smartphone,
  Shield,
  AlertTriangle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  emailVerified: boolean;
  kycStatus: string;
  lastLogin: string;
  device: string;
  totalDonations: string;
  campaignsCreated: number;
  riskSignals: string[];
  status: string;
}

interface UserDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export const UserDetailDrawer = ({
  open,
  onOpenChange,
  user,
}: UserDetailDrawerProps) => {
  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[480px] overflow-y-auto bg-white border-l border-[#E5E7EB]">
        <SheetHeader>
          <SheetTitle className="text-[#111827]">User Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* User Profile Overview */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center text-white text-xl font-medium">
                {user.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#111827]">{user.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-sm text-[#6B7280]">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="border-[#E5E7EB] text-[#111827]"
                  >
                    {user.role}
                  </Badge>
                  <Badge
                    className={`${
                      user.status === "Active"
                        ? "bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20"
                        : user.status === "Suspended"
                        ? "bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20"
                        : "bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-[#6B7280]">
                <MapPin className="w-4 h-4" />
                <span>Vietnam</span>
              </div>
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Globe className="w-4 h-4" />
                <span>GMT+7</span>
              </div>
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Calendar className="w-4 h-4" />
                <span>Joined Jan 2024</span>
              </div>
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Monitor className="w-4 h-4" />
                <span>2 devices</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-[#F9FAFB] rounded-lg">
              <Chrome className="w-4 h-4 text-[#6B7280]" />
              <span className="text-sm text-[#6B7280]">Google Account Connected</span>
            </div>
          </div>

          <Separator className="bg-[#E5E7EB]" />

          {/* KYC & Identity */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#111827] flex items-center gap-2">
              <Shield className="w-4 h-4" />
              KYC & Identity
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                <div className="flex items-center gap-2">
                  {user.emailVerified ? (
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#6B7280]" />
                  )}
                  <span className="text-sm text-[#111827]">Email Verified</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    user.emailVerified ? "text-[#10B981]" : "text-[#6B7280]"
                  }`}
                >
                  {user.emailVerified ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-sm text-[#111827]">KYC Status</span>
                </div>
                <Badge
                  className={`text-xs ${
                    user.kycStatus === "Verified"
                      ? "bg-[#10B981]/10 text-[#10B981]"
                      : user.kycStatus === "Pending"
                      ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                      : user.kycStatus === "Failed"
                      ? "bg-[#EF4444]/10 text-[#EF4444]"
                      : "bg-[#6B7280]/10 text-[#6B7280]"
                  }`}
                >
                  {user.kycStatus}
                </Badge>
              </div>

              {user.kycStatus !== "None" && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-video bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#6B7280]" />
                  </div>
                  <div className="aspect-video bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#6B7280]" />
                  </div>
                  <div className="aspect-video bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#6B7280]" />
                  </div>
                </div>
              )}

              {user.riskSignals.length > 0 && (
                <div className="p-3 bg-[#FEF3C7] border border-[#F59E0B]/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#92400E]">Risk Signals Detected</p>
                      <p className="text-xs text-[#92400E]/80 mt-1">
                        {user.riskSignals.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-[#E5E7EB]" />

          {/* Activity & Behavior */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#111827] flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity & Behavior
            </h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Last Login</span>
                <span className="font-medium text-[#111827]">{user.lastLogin}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Device</span>
                <span className="font-medium text-[#111827]">{user.device}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Login Frequency</span>
                <span className="font-medium text-[#111827]">Daily</span>
              </div>
            </div>

            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <p className="text-xs text-[#6B7280] mb-2">14-Day Activity</p>
              <div className="h-12 flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95, 70, 85].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#2563EB] rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-[#F9FAFB] rounded">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-3 h-3 text-[#6B7280]" />
                  <span className="text-[#6B7280]">IP: 103.45.234.12</span>
                </div>
                <span className="text-[#111827]">Ho Chi Minh City</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#F9FAFB] rounded">
                <div className="flex items-center gap-2">
                  <Monitor className="w-3 h-3 text-[#6B7280]" />
                  <span className="text-[#6B7280]">IP: 14.234.56.78</span>
                </div>
                <span className="text-[#111827]">Hanoi</span>
              </div>
            </div>
          </div>

          <Separator className="bg-[#E5E7EB]" />

          {/* Contributions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#111827] flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Contributions
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#F9FAFB] rounded-lg">
                <p className="text-xs text-[#6B7280] mb-1">Total Donations</p>
                <p className="text-lg font-semibold text-[#111827]">{user.totalDonations}</p>
              </div>
              <div className="p-3 bg-[#F9FAFB] rounded-lg">
                <p className="text-xs text-[#6B7280] mb-1">Campaigns Created</p>
                <p className="text-lg font-semibold text-[#111827]">{user.campaignsCreated}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-[#6B7280]">Top Campaigns Donated To</p>
              <div className="space-y-2">
                {["Help Children in Need", "Emergency Food Relief", "Education for All"].map(
                  (campaign, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-[#F9FAFB] rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3 text-[#EF4444]" />
                        <span className="text-[#111827]">{campaign}</span>
                      </div>
                      <span className="font-medium text-[#111827]">
                        ${((i + 1) * 250).toLocaleString()}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-[#E5E7EB]" />

          {/* Notes & Admin Logs */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#111827] flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Notes & Admin Logs
            </h4>

            <div className="space-y-3">
              <div className="space-y-2">
                {[
                  { action: "KYC Verified", admin: "Admin User", time: "2 days ago" },
                  { action: "User Registered", admin: "System", time: "30 days ago" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5" />
                    <div className="flex-1">
                      <p className="text-[#111827] font-medium">{log.action}</p>
                      <p className="text-[#6B7280] mt-0.5">
                        by {log.admin} • {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Textarea
                placeholder="Add internal note..."
                className="text-sm border-[#E5E7EB] focus-visible:ring-[#2563EB]"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 -mx-6 -mb-6 mt-6">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="gap-2" size="sm">
              <MessageSquare className="w-4 h-4" />
              Message
            </Button>
            <Button variant="outline" className="gap-2" size="sm">
              <Flag className="w-4 h-4" />
              Flag
            </Button>
            <Button variant="outline" className="gap-2" size="sm">
              <KeyRound className="w-4 h-4" />
              Reset Password
            </Button>
            <Button variant="outline" className="gap-2" size="sm">
              <UserCog className="w-4 h-4" />
              Promote
            </Button>
            <Button
              variant="outline"
              className="gap-2 col-span-2 text-[#EF4444] border-[#EF4444] hover:bg-[#EF4444] hover:text-white"
              size="sm"
            >
              <Ban className="w-4 h-4" />
              Suspend User
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
