import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Mail, 
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  FileText,
  Image as ImageIcon,
  Video,
  User,
  Building
} from "lucide-react";
import { toast } from "sonner";

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

interface CampaignReviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: CampaignSubmission | null;
}

export function CampaignReviewDrawer({ open, onOpenChange, campaign }: CampaignReviewDrawerProps) {
  const [comment, setComment] = useState("");
  const [checklist, setChecklist] = useState({
    identityVerified: false,
    purposeClear: false,
    documentsUploaded: false,
    noProhibitedContent: false,
    noMisleading: false,
  });

  if (!campaign) return null;

  const handleApprove = () => {
    toast.success("Campaign approved successfully");
    onOpenChange(false);
  };

  const handleReject = () => {
    toast.error("Campaign rejected");
    onOpenChange(false);
  };

  const handleRequestChanges = () => {
    if (!comment.trim()) {
      toast.error("Please provide feedback for the creator");
      return;
    }
    toast.success("Change request sent to creator");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[480px] overflow-y-auto bg-white p-0">
        <SheetHeader className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB] px-6 py-4">
          <SheetTitle className="text-[18px] font-semibold text-[#111827]">
            Campaign Review
          </SheetTitle>
        </SheetHeader>

        <div className="px-6 py-6 space-y-6">
          {/* A. Campaign Overview */}
          <section>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-3">Campaign Overview</h3>
            
            {/* Cover Image */}
            <div className="w-full h-48 rounded-lg overflow-hidden bg-[#F3F4F6] mb-4">
              <img 
                src={campaign.thumbnail} 
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Info */}
            <h4 className="text-[16px] font-semibold text-[#111827] mb-3">{campaign.title}</h4>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[13px]">
                <User className="h-4 w-4 text-[#6B7280]" />
                <span className="text-[#6B7280]">Creator:</span>
                <span className="font-medium text-[#111827]">{campaign.creator.name}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <Mail className="h-4 w-4 text-[#6B7280]" />
                <a href={`mailto:${campaign.creator.email}`} className="text-[#2563EB] hover:underline">
                  {campaign.creator.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <Calendar className="h-4 w-4 text-[#6B7280]" />
                <span className="text-[#6B7280]">Submitted:</span>
                <span className="text-[#111827]">{campaign.submittedAt}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <MapPin className="h-4 w-4 text-[#6B7280]" />
                <span className="text-[#6B7280]">Country:</span>
                <span className="text-[#111827]">{campaign.country}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <Building className="h-4 w-4 text-[#6B7280]" />
                <span className="text-[#6B7280]">Category:</span>
                <Badge variant="outline" className="text-[11px]">{campaign.category}</Badge>
              </div>
            </div>
          </section>

          <Separator className="bg-[#E5E7EB]" />

          {/* B. Content Review */}
          <section>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-3">Content Review</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[12px] font-medium text-[#6B7280] mb-1">Mission Statement</p>
                <p className="text-[13px] text-[#111827]">{campaign.missionTagline}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[12px] font-medium text-[#6B7280] mb-1">Target Amount</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#10B981]" />
                    <p className="text-[14px] font-semibold text-[#111827]">
                      ${campaign.goalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#6B7280] mb-1">Timeline</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#2563EB]" />
                    <p className="text-[14px] font-semibold text-[#111827]">
                      {campaign.duration} days
                    </p>
                  </div>
                </div>
              </div>

              {/* Issues Alert */}
              {campaign.issues.length > 0 && (
                <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[12px] font-semibold text-[#92400E] mb-1">Content Issues</p>
                      <ul className="text-[12px] text-[#92400E] space-y-1">
                        {campaign.issues.map((issue, idx) => (
                          <li key={idx}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <Separator className="bg-[#E5E7EB]" />

          {/* C. Media Review */}
          <section>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-3">Media Review</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-[#6B7280]" />
                  <div>
                    <p className="text-[13px] font-medium text-[#111827]">Cover Image</p>
                    <p className="text-[11px] text-[#6B7280]">1920x1080 • 2.3 MB</p>
                  </div>
                </div>
                <Badge className="bg-[#ECFDF5] text-[#059669] border-0 text-[11px]">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-[#6B7280]" />
                  <div>
                    <p className="text-[13px] font-medium text-[#111827]">Campaign Video</p>
                    <p className="text-[11px] text-[#6B7280]">1080p • 45 sec</p>
                  </div>
                </div>
                <Badge className="bg-[#ECFDF5] text-[#059669] border-0 text-[11px]">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </section>

          <Separator className="bg-[#E5E7EB]" />

          {/* D. Compliance Checklist */}
          <section>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-3">Compliance Checklist</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="identity" 
                  checked={checklist.identityVerified}
                  onCheckedChange={(checked) => 
                    setChecklist({ ...checklist, identityVerified: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <label htmlFor="identity" className="text-[13px] text-[#111827] cursor-pointer">
                  Creator identity verified
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox 
                  id="purpose" 
                  checked={checklist.purposeClear}
                  onCheckedChange={(checked) => 
                    setChecklist({ ...checklist, purposeClear: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <label htmlFor="purpose" className="text-[13px] text-[#111827] cursor-pointer">
                  Campaign purpose is clear and legitimate
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox 
                  id="documents" 
                  checked={checklist.documentsUploaded}
                  onCheckedChange={(checked) => 
                    setChecklist({ ...checklist, documentsUploaded: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <label htmlFor="documents" className="text-[13px] text-[#111827] cursor-pointer">
                  Required documents uploaded and valid
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox 
                  id="prohibited" 
                  checked={checklist.noProhibitedContent}
                  onCheckedChange={(checked) => 
                    setChecklist({ ...checklist, noProhibitedContent: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <label htmlFor="prohibited" className="text-[13px] text-[#111827] cursor-pointer">
                  No prohibited or harmful content
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox 
                  id="misleading" 
                  checked={checklist.noMisleading}
                  onCheckedChange={(checked) => 
                    setChecklist({ ...checklist, noMisleading: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <label htmlFor="misleading" className="text-[13px] text-[#111827] cursor-pointer">
                  No misleading descriptions or false claims
                </label>
              </div>
            </div>
          </section>

          <Separator className="bg-[#E5E7EB]" />

          {/* E. Communication with Creator */}
          <section>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-3">Communication with Creator</h3>
            
            <div className="space-y-3">
              <Textarea
                placeholder="Add comments or request specific changes from the creator..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] text-[13px] border-[#E5E7EB]"
              />

              {/* Comment History */}
              <div className="space-y-2 pt-2">
                <p className="text-[12px] font-medium text-[#6B7280]">Previous Comments</p>
                <div className="text-[12px] text-[#9CA3AF] italic">No previous comments</div>
              </div>
            </div>
          </section>
        </div>

        {/* F. Decision Actions - Sticky Bottom */}
        <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2]"
              onClick={handleReject}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#F59E0B] text-[#F59E0B] hover:bg-[#FEF3C7]"
              onClick={handleRequestChanges}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Request Changes
            </Button>
            <Button
              className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white"
              onClick={handleApprove}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Approve & Publish
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
