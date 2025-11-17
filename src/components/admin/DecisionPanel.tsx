import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MessageSquare, AlertTriangle, Sparkles } from "lucide-react";
import type { VerificationStatus } from "@/pages/AdminVerification";

interface DecisionPanelProps {
  onApprove: () => void;
  onReject: () => void;
  onRequestInfo: () => void;
  status: VerificationStatus;
}

export const DecisionPanel = ({ onApprove, onReject, onRequestInfo, status }: DecisionPanelProps) => {
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [checklist, setChecklist] = useState({
    idValid: false,
    nameMatch: false,
    orgLicense: false,
    bankStatement: false,
    noTampering: false,
    legalRep: false
  });

  const tags = [
    { label: "need-more-info", color: "bg-[#DBEAFE] text-[#1E40AF]" },
    { label: "risk", color: "bg-[#FEE2E2] text-[#991B1B]" },
    { label: "missing-doc", color: "bg-[#FEF3C7] text-[#92400E]" },
    { label: "verified", color: "bg-[#D1FAE5] text-[#065F46]" }
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Card className="bg-white border-[#E5E7EB] rounded-[20px] p-6 sticky top-24">
      {/* Admin Notes */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-[#111827] mb-3">Admin Notes</h3>
        <Textarea
          placeholder="Nhập ghi chú xét duyệt..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px] resize-none border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]"
        />
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map(tag => (
            <button
              key={tag.label}
              onClick={() => toggleTag(tag.label)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedTags.includes(tag.label)
                  ? tag.color
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
              }`}
            >
              #{tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Review Checklist */}
      <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
        <h3 className="text-sm font-semibold text-[#111827] mb-4">Review Checklist</h3>
        <div className="space-y-3">
          {[
            { key: "idValid", label: "CCCD/CMND hợp lệ" },
            { key: "nameMatch", label: "Trùng khớp tên chủ tài khoản" },
            { key: "orgLicense", label: "Giấy phép tổ chức có hiệu lực" },
            { key: "bankStatement", label: "Sao kê đủ 1–3 tháng" },
            { key: "noTampering", label: "Không có dấu hiệu chỉnh sửa" },
            { key: "legalRep", label: "Người đại diện hợp pháp" }
          ].map(item => (
            <div key={item.key} className="flex items-center space-x-3">
              <Checkbox
                id={item.key}
                checked={checklist[item.key as keyof typeof checklist]}
                onCheckedChange={(checked) => 
                  setChecklist(prev => ({ ...prev, [item.key]: checked as boolean }))
                }
                className="border-[#E5E7EB] data-[state=checked]:bg-[#4ECDC4] data-[state=checked]:border-[#4ECDC4]"
              />
              <label
                htmlFor={item.key}
                className="text-sm text-[#374151] leading-none cursor-pointer"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>

        {/* Completion Progress */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#6B7280]">Completion</span>
            <span className="text-[#111827] font-medium">
              {Object.values(checklist).filter(Boolean).length}/6
            </span>
          </div>
          <div className="w-full bg-[#E5E7EB] rounded-full h-2">
            <div
              className="bg-[#4ECDC4] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(Object.values(checklist).filter(Boolean).length / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* System Insights */}
      <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
          <h3 className="text-sm font-semibold text-[#111827]">AI Insights</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
            <span className="text-[#6B7280]">Tên trên CCCD khớp với chủ tài khoản ngân hàng</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
            <span className="text-[#6B7280]">Định dạng số CCCD hợp lệ</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
            <span className="text-[#6B7280]">Phát hiện độ mờ nhẹ ở vùng chữ ký</span>
          </div>
        </div>

        {/* Fraud Risk Score */}
        <div className="mt-4 p-4 bg-[#D1FAE5] rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#065F46]">Fraud Risk Score</span>
            <span className="text-2xl font-bold text-[#10B981]">25</span>
          </div>
          <div className="w-full bg-[#A7F3D0] rounded-full h-2">
            <div className="bg-[#10B981] h-2 rounded-full" style={{ width: "25%" }} />
          </div>
          <p className="text-xs text-[#047857] mt-2">Low risk - Safe to approve</p>
        </div>
      </div>

      {/* Decision Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onApprove}
          disabled={status === "verified"}
          className="w-full bg-[#4ECDC4] hover:bg-[#45b8b0] text-white h-11"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Approve Application
        </Button>
        <Button
          onClick={onReject}
          disabled={status === "rejected"}
          variant="outline"
          className="w-full border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FFEBEE] h-11"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Reject Application
        </Button>
        <Button
          onClick={onRequestInfo}
          variant="outline"
          className="w-full border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] h-11"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Request More Information
        </Button>
      </div>

      {/* Status Badge */}
      {status !== "pending" && (
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <Badge 
            className={`w-full justify-center py-2 ${
              status === "verified" 
                ? "bg-[#D1FAE5] text-[#065F46] border-[#10B981]" 
                : "bg-[#FEE2E2] text-[#991B1B] border-[#FF6B6B]"
            }`}
          >
            {status === "verified" ? "✓ Đã phê duyệt" : "✗ Đã từ chối"}
          </Badge>
        </div>
      )}
    </Card>
  );
};
