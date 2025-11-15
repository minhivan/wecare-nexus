import { useState } from "react";
import { OnboardingHeader } from "@/components/onboarding/setup/OnboardingHeader";
import { ProgressTracker } from "@/components/onboarding/setup/ProgressTracker";
import { AccountTypeSelector } from "@/components/onboarding/setup/AccountTypeSelector";
import { PersonalInfoForm } from "@/components/onboarding/setup/PersonalInfoForm";
import { OrganizationInfoForm } from "@/components/onboarding/setup/OrganizationInfoForm";
import { DocumentVerification } from "@/components/onboarding/setup/DocumentVerification";
import { BankingInfo } from "@/components/onboarding/setup/BankingInfo";
import { TrustPanel } from "@/components/onboarding/setup/TrustPanel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type AccountType = "donor" | "creator" | "organization" | "community";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  const handleContinue = () => {
    if (currentStep === 1 && !accountType) {
      toast.error("Vui lòng chọn loại tài khoản");
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      toast.success("Đã lưu thông tin");
    } else {
      toast.success("Hoàn tất xác minh! Chào mừng bạn đến WeCare 💛");
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <OnboardingHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-[1360px]">
        <ProgressTracker currentStep={currentStep} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[28px] shadow-sm border border-[#E5E7EB] p-8 md:p-12">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#111827] mb-2">
                      Chọn loại tài khoản
                    </h2>
                    <p className="text-[#6B7280]">
                      Hãy cho chúng tôi biết bạn là ai để cá nhân hóa trải nghiệm
                    </p>
                  </div>
                  <AccountTypeSelector 
                    selected={accountType} 
                    onSelect={setAccountType} 
                  />
                </div>
              )}

              {currentStep === 2 && accountType && (
                <div className="space-y-6">
                  {(accountType === "donor" || accountType === "creator") && (
                    <PersonalInfoForm />
                  )}
                  {(accountType === "organization" || accountType === "community") && (
                    <OrganizationInfoForm accountType={accountType} />
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <DocumentVerification accountType={accountType!} />
                  <BankingInfo />
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#E5E7EB]">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="text-[#6B7280]"
                >
                  ← Quay lại
                </Button>
                <Button
                  onClick={handleContinue}
                  className="bg-[#4ECDC4] hover:bg-[#45b8b0] text-white px-8"
                >
                  {currentStep === 3 ? "Hoàn tất" : "Tiếp tục"} →
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-[#6B7280] mt-6">
              Bạn đã có tài khoản?{" "}
              <button
                onClick={() => navigate("/auth/signin")}
                className="text-[#4ECDC4] hover:underline font-medium"
              >
                Đăng nhập
              </button>
            </p>
          </div>

          {/* Trust Panel */}
          <div className="lg:col-span-1">
            <TrustPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
