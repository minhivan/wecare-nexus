import { useState } from "react";
import { VerificationHeader } from "@/components/admin/VerificationHeader";
import { ApplicantOverview } from "@/components/admin/ApplicantOverview";
import { DocumentViewer } from "@/components/admin/DocumentViewer";
import { DecisionPanel } from "@/components/admin/DecisionPanel";

export type VerificationStatus = "pending" | "verified" | "rejected";

const AdminVerification = () => {
  const [status, setStatus] = useState<VerificationStatus>("pending");
  const [activeTab, setActiveTab] = useState("personal");

  // Mock data
  const applicant = {
    id: "12345",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    name: "Nguyễn Văn A",
    type: "personal" as const,
    email: "nguyenvana@example.com",
    phone: "+84 912 345 678",
    bankAccount: {
      bank: "Vietcombank",
      accountNumber: "1234567890",
      accountHolder: "NGUYEN VAN A"
    },
    riskScore: 25,
    accountAge: "2 tháng",
    campaignsCount: 1,
    totalRequested: "50,000,000 VND"
  };

  const documents = {
    personal: [
      { type: "CCCD mặt trước", url: "/placeholder.svg", uploadTime: "2024-01-15 14:30", status: "pending" },
      { type: "CCCD mặt sau", url: "/placeholder.svg", uploadTime: "2024-01-15 14:31", status: "pending" }
    ],
    organization: [],
    banking: [
      { type: "Sao kê 3 tháng", url: "/placeholder.svg", uploadTime: "2024-01-15 14:35", status: "pending" }
    ],
    history: []
  };

  const handleApprove = () => {
    setStatus("verified");
  };

  const handleReject = () => {
    setStatus("rejected");
  };

  const handleRequestInfo = () => {
    console.log("Request more information");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <VerificationHeader 
        userId={applicant.id}
        status={status}
        onApprove={handleApprove}
        onReject={handleReject}
        onRequestInfo={handleRequestInfo}
      />

      <div className="container mx-auto px-4 py-6 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Applicant Overview */}
          <div className="lg:col-span-3">
            <ApplicantOverview applicant={applicant} />
          </div>

          {/* Center Column - Document Viewer */}
          <div className="lg:col-span-6">
            <DocumentViewer 
              documents={documents}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Right Column - Decision Panel */}
          <div className="lg:col-span-3">
            <DecisionPanel 
              onApprove={handleApprove}
              onReject={handleReject}
              onRequestInfo={handleRequestInfo}
              status={status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVerification;
