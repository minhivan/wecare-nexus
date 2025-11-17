import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MessageSquare, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { VerificationStatus } from "@/pages/AdminVerification";

interface VerificationHeaderProps {
  userId: string;
  status: VerificationStatus;
  onApprove: () => void;
  onReject: () => void;
  onRequestInfo: () => void;
}

export const VerificationHeader = ({ 
  userId, 
  status, 
  onApprove, 
  onReject, 
  onRequestInfo 
}: VerificationHeaderProps) => {
  const statusConfig = {
    pending: { label: "Pending", className: "bg-[#FFF8E1] text-[#F57F17] border-[#FFD54F]" },
    verified: { label: "Verified", className: "bg-[#E0F2F1] text-[#00695C] border-[#4ECDC4]" },
    rejected: { label: "Rejected", className: "bg-[#FFEBEE] text-[#C62828] border-[#FF6B6B]" }
  };

  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-[1600px]">
        <div className="flex items-center justify-between">
          {/* Left - Breadcrumb */}
          <div className="flex items-center gap-4">
            <img src="/wecare-icon.png" alt="WeCare" className="h-8 w-8" />
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Link to="/" className="hover:text-[#4ECDC4] transition-colors">Dashboard</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/admin/verification" className="hover:text-[#4ECDC4] transition-colors">Verification</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#111827] font-medium">User #{userId}</span>
            </div>
            <Badge className={`${statusConfig[status].className} border px-3 py-1`}>
              {statusConfig[status].label}
            </Badge>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onRequestInfo}
              className="border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF]"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Request Info
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
              className="border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FFEBEE]"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={onApprove}
              className="bg-[#4ECDC4] hover:bg-[#45b8b0] text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
