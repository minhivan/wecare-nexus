import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import ProgressBar from "@/components/campaigns/create/ProgressBar";
import StepBasics from "@/components/campaigns/create/StepBasics";
import StepVisualStory from "@/components/campaigns/create/StepVisualStory";
import StepGoalDuration from "@/components/campaigns/create/StepGoalDuration";
import StepDonationSettings from "@/components/campaigns/create/StepDonationSettings";
import StepPublishVisibility from "@/components/campaigns/create/StepPublishVisibility";
import MobilePreview from "@/components/campaigns/create/MobilePreview";

export interface CampaignDraft {
  title: string;
  tagline: string;
  category: string;
  enableTeamCollaboration: boolean;
  coverImage: string;
  story: string;
  mediaGallery: string[];
  targetAmount: number;
  currency: string;
  duration: number;
  endDate: Date | null;
  flexibleEndDate: boolean;
  minimumDonation: number;
  suggestedTiers: { amount: number; emoji: string; label: string }[];
  enableRecurring: boolean;
  autoThankYou: string;
  visibility: "public" | "unlisted" | "private";
  showInCommunityFeed: boolean;
}

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignDraft>({
    title: "",
    tagline: "",
    category: "",
    enableTeamCollaboration: false,
    coverImage: "",
    story: "",
    mediaGallery: [],
    targetAmount: 10000,
    currency: "USD",
    duration: 30,
    endDate: null,
    flexibleEndDate: false,
    minimumDonation: 5,
    suggestedTiers: [
      { amount: 25, emoji: "💚", label: "Supporter" },
      { amount: 50, emoji: "🌟", label: "Champion" },
      { amount: 100, emoji: "🚀", label: "Hero" },
    ],
    enableRecurring: true,
    autoThankYou: "Thank you for your generous donation! Your support means the world to us.",
    visibility: "public",
    showInCommunityFeed: true,
  });

  // Auto-save draft every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("campaign-draft", JSON.stringify(campaignData));
    }, 10000);

    return () => clearInterval(interval);
  }, [campaignData]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("campaign-draft");
    if (draft) {
      setCampaignData(JSON.parse(draft));
    }
  }, []);

  const updateCampaignData = (updates: Partial<CampaignDraft>) => {
    setCampaignData((prev) => ({ ...prev, ...updates }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem("campaign-draft", JSON.stringify(campaignData));
    toast.success("Draft saved successfully");
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    // TODO: Implement publish logic
    localStorage.removeItem("campaign-draft");
    toast.success("🎉 Campaign launched successfully!", {
      description: "Your campaign is now live and accepting donations.",
    });
    setTimeout(() => navigate("/campaigns"), 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasics data={campaignData} updateData={updateCampaignData} onNext={handleNext} />;
      case 2:
        return (
          <StepVisualStory
            data={campaignData}
            updateData={updateCampaignData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <StepGoalDuration
            data={campaignData}
            updateData={updateCampaignData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <StepDonationSettings
            data={campaignData}
            updateData={updateCampaignData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <StepPublishVisibility
            data={campaignData}
            updateData={updateCampaignData}
            onPublish={handlePublish}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create a New Campaign</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Set up your story, goal, and visuals — preview how it'll appear to donors.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSaveDraft} className="gap-2">
              <X className="w-4 h-4" />
              Save Draft
            </Button>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={5} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1360px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Panel - Form Steps */}
          <div className="transition-all duration-300 ease-out">{renderStep()}</div>

          {/* Right Panel - Mobile Preview */}
          <div className="hidden lg:block sticky top-32 h-fit">
            <MobilePreview data={campaignData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
