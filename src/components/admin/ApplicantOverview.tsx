import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Mail, Phone, CreditCard } from "lucide-react";

interface ApplicantOverviewProps {
  applicant: {
    avatar: string;
    name: string;
    type: "personal" | "organization";
    email: string;
    phone: string;
    bankAccount: {
      bank: string;
      accountNumber: string;
      accountHolder: string;
    };
    riskScore: number;
    accountAge: string;
    campaignsCount: number;
    totalRequested: string;
  };
}

export const ApplicantOverview = ({ applicant }: ApplicantOverviewProps) => {
  const getRiskColor = (score: number) => {
    if (score <= 30) return "text-[#10B981] bg-[#D1FAE5]";
    if (score <= 60) return "text-[#F59E0B] bg-[#FEF3C7]";
    return "text-[#EF4444] bg-[#FEE2E2]";
  };

  const riskLevel = applicant.riskScore <= 30 ? "Low" : applicant.riskScore <= 60 ? "Medium" : "High";

  return (
    <Card className="bg-white border-[#E5E7EB] rounded-[20px] p-6 sticky top-24">
      {/* Profile */}
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar className="w-20 h-20 mb-4">
          <AvatarImage src={applicant.avatar} />
          <AvatarFallback>{applicant.name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold text-[#111827] mb-1">{applicant.name}</h3>
        <Badge variant="outline" className="border-[#4ECDC4] text-[#4ECDC4]">
          {applicant.type === "personal" ? (
            <><User className="w-3 h-3 mr-1" /> Cá nhân</>
          ) : (
            <><Building2 className="w-3 h-3 mr-1" /> Tổ chức</>
          )}
        </Badge>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-6 pb-6 border-b border-[#E5E7EB]">
        <div className="flex items-start gap-3 text-sm">
          <Mail className="w-4 h-4 text-[#6B7280] mt-0.5 shrink-0" />
          <div>
            <p className="text-[#9CA3AF] text-xs">Email</p>
            <p className="text-[#111827]">{applicant.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <Phone className="w-4 h-4 text-[#6B7280] mt-0.5 shrink-0" />
          <div>
            <p className="text-[#9CA3AF] text-xs">Số điện thoại</p>
            <p className="text-[#111827]">{applicant.phone}</p>
          </div>
        </div>
      </div>

      {/* Bank Account */}
      <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="w-4 h-4 text-[#6B7280]" />
          <h4 className="text-sm font-medium text-[#111827]">Tài khoản nhận tiền</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-[#9CA3AF] text-xs">Ngân hàng</p>
            <p className="text-[#111827] font-medium">{applicant.bankAccount.bank}</p>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-xs">Số tài khoản</p>
            <p className="text-[#111827] font-mono">{applicant.bankAccount.accountNumber}</p>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-xs">Chủ tài khoản</p>
            <p className="text-[#111827]">{applicant.bankAccount.accountHolder}</p>
          </div>
        </div>
      </div>

      {/* Risk Indicator */}
      <div>
        <h4 className="text-sm font-medium text-[#111827] mb-4">Risk Assessment</h4>
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="8" fill="none" />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={applicant.riskScore <= 30 ? "#10B981" : applicant.riskScore <= 60 ? "#F59E0B" : "#EF4444"}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(applicant.riskScore / 100) * 352} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#111827]">{applicant.riskScore}</span>
              <span className="text-xs text-[#6B7280]">Risk Score</span>
            </div>
          </div>
        </div>
        <div className={`text-center py-2 px-4 rounded-lg ${getRiskColor(applicant.riskScore)}`}>
          <span className="text-sm font-medium">{riskLevel} Risk</span>
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB] space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Tuổi tài khoản</span>
            <span className="text-[#111827] font-medium">{applicant.accountAge}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Số chiến dịch</span>
            <span className="text-[#111827] font-medium">{applicant.campaignsCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Tổng yêu cầu</span>
            <span className="text-[#111827] font-medium">{applicant.totalRequested}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
