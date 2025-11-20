import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FileText, 
  MapPin, 
  Building2, 
  CreditCard, 
  CheckCircle2, 
  XCircle,
  AlertTriangle,
  Clock,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface KYCSubmission {
  id: string;
  name: string;
  email: string;
  avatar: string;
  submissionType: "organization" | "individual";
  country: string;
  status: string;
  submittedAt: string;
  documents: {
    id: boolean;
    businessLicense: boolean;
    proofOfAddress: boolean;
    selfie: boolean;
  };
}

interface KYCReviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: KYCSubmission | null;
}

export function KYCReviewDrawer({ open, onOpenChange, submission }: KYCReviewDrawerProps) {
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!open) return;
      
      if (e.key === "Escape") {
        onOpenChange(false);
      } else if (e.key === "a" || e.key === "A") {
        handleApprove();
      } else if (e.key === "r" || e.key === "R") {
        handleReject();
      } else if (e.key === "n" || e.key === "N") {
        document.getElementById("notes-textarea")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [open]);

  if (!submission) return null;

  const handleApprove = () => {
    toast({
      title: "Approved",
      description: `${submission.name}'s KYC submission has been approved.`,
      className: "bg-[#10B981] text-white border-0",
    });
    onOpenChange(false);
  };

  const handleReject = () => {
    toast({
      title: "Rejected",
      description: `${submission.name}'s KYC submission has been rejected.`,
      variant: "destructive",
    });
    onOpenChange(false);
  };

  const mockDocuments = [
    { 
      type: "Government ID", 
      status: "verified", 
      url: "/placeholder.svg",
      expiryDate: "2027-12-31"
    },
    { 
      type: submission.submissionType === "organization" ? "Business Registration Certificate" : "Proof of Address", 
      status: "verified", 
      url: "/placeholder.svg",
      expiryDate: "N/A"
    },
    { 
      type: "Selfie with ID", 
      status: "verified", 
      url: "/placeholder.svg",
      livenessCheck: true
    },
  ];

  const verificationChecks = [
    { label: "Name match check", status: "passed", icon: CheckCircle2 },
    { label: "Document expiration", status: "passed", icon: CheckCircle2 },
    { label: "Fraud flags", status: "clear", icon: CheckCircle2 },
    { label: "AI confidence score", status: "95%", icon: CheckCircle2 },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[480px] p-0 bg-white border-l border-[#E5E7EB] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white z-10 border-b border-[#E5E7EB]">
          <SheetHeader className="px-6 py-5">
            <SheetTitle className="text-[18px] font-semibold text-[#111827]">
              KYC Review
            </SheetTitle>
            <p className="text-[13px] text-[#6B7280] mt-1">
              Submission ID: {submission.id}
            </p>
          </SheetHeader>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* 1. Applicant Overview */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-semibold text-[#111827]">Applicant Overview</h3>
            <div className="bg-[#F9FAFB] rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={submission.avatar} />
                  <AvatarFallback>{submission.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#111827]">{submission.name}</h4>
                  <p className="text-[13px] text-[#6B7280]">{submission.email}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2 text-[13px]">
                  <User className="h-4 w-4 text-[#6B7280]" />
                  <span className="text-[#6B7280]">Type:</span>
                  <Badge variant="outline" className="text-[12px]">
                    {submission.submissionType === "organization" ? "Organization" : "Individual"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[13px]">
                  <MapPin className="h-4 w-4 text-[#6B7280]" />
                  <span className="text-[#6B7280]">Country:</span>
                  <span className="text-[#111827] font-medium">{submission.country}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px]">
                  <Clock className="h-4 w-4 text-[#6B7280]" />
                  <span className="text-[#6B7280]">Submitted:</span>
                  <span className="text-[#111827]">{submission.submittedAt}</span>
                </div>
              </div>

              {submission.submissionType === "organization" && (
                <div className="pt-2 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2 text-[13px]">
                    <Building2 className="h-4 w-4 text-[#6B7280]" />
                    <span className="text-[#6B7280]">Organization:</span>
                    <span className="text-[#111827] font-medium">{submission.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Documents Block */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-semibold text-[#111827]">Documents</h3>
            <div className="space-y-3">
              {mockDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#2563EB] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-[14px] font-medium text-[#111827]">{doc.type}</span>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  </div>
                  <div className="aspect-video bg-[#F9FAFB] rounded border border-[#E5E7EB] mb-2 flex items-center justify-center">
                    <img src={doc.url} alt={doc.type} className="max-h-full" />
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[#6B7280]">
                      {doc.expiryDate !== "N/A" ? `Expires: ${doc.expiryDate}` : "No expiry"}
                    </span>
                    {doc.livenessCheck && (
                      <Badge className="bg-[#10B981] text-white border-0 text-[11px]">
                        Liveness Check Passed
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Verification Checks */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-semibold text-[#111827]">Verification Checks</h3>
            <div className="bg-[#F9FAFB] rounded-lg p-4 space-y-3">
              {verificationChecks.map((check, index) => {
                const Icon = check.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#10B981]" />
                      <span className="text-[14px] text-[#111827]">{check.label}</span>
                    </div>
                    <span className="text-[13px] font-medium text-[#10B981]">
                      {check.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Admin Notes */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-semibold text-[#111827]">Admin Notes</h3>
            <Textarea
              id="notes-textarea"
              placeholder="Add internal notes about this review... (Press N to focus)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] border-[#E5E7EB] text-[14px] resize-none"
            />
            <div className="text-[12px] text-[#9CA3AF]">
              Previous reviews: No history
            </div>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="bg-[#F9FAFB] rounded-lg p-3 border border-[#E5E7EB]">
            <p className="text-[12px] font-medium text-[#111827] mb-2">Keyboard Shortcuts</p>
            <div className="space-y-1 text-[11px] text-[#6B7280]">
              <div><kbd className="px-1.5 py-0.5 bg-white border border-[#E5E7EB] rounded">A</kbd> Approve</div>
              <div><kbd className="px-1.5 py-0.5 bg-white border border-[#E5E7EB] rounded">R</kbd> Reject</div>
              <div><kbd className="px-1.5 py-0.5 bg-white border border-[#E5E7EB] rounded">N</kbd> Add note</div>
              <div><kbd className="px-1.5 py-0.5 bg-white border border-[#E5E7EB] rounded">Esc</kbd> Close</div>
            </div>
          </div>
        </div>

        {/* 5. Actions Footer - Sticky */}
        <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white h-10"
              onClick={handleReject}
            >
              Reject
            </Button>
            <Button
              className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white h-10"
              onClick={handleApprove}
            >
              Approve
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
