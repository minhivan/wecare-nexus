import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles, TrendingUp, Users, CreditCard, Video, MessageSquare } from "lucide-react";
import { useState } from "react";

interface Feature {
  id: string;
  name: string;
  description: string;
  version: string;
  icon: React.ReactNode;
  enabled: boolean;
  tooltip: string;
}

export const ExperimentalFeatures = () => {
  const [campaignFeatures, setCampaignFeatures] = useState<Feature[]>([
    {
      id: "campaign-builder",
      name: "New Campaign Builder",
      description: "Structured flow with enhanced UX",
      version: "v1.2-beta",
      icon: <Sparkles className="w-4 h-4" />,
      enabled: false,
      tooltip: "Improved step-by-step campaign creation with real-time validation"
    },
    {
      id: "ai-analytics",
      name: "AI-generated Analytics Summary",
      description: "Smart insights from campaign data",
      version: "v1.3-beta",
      icon: <TrendingUp className="w-4 h-4" />,
      enabled: false,
      tooltip: "Automatic analysis and recommendations based on campaign performance"
    },
    {
      id: "collab-mode",
      name: "Realtime Collaboration Mode",
      description: "Multi-user editing support",
      version: "v1.4-alpha",
      icon: <Users className="w-4 h-4" />,
      enabled: false,
      tooltip: "See team members editing campaigns in real-time"
    },
  ]);

  const [donationFeatures, setDonationFeatures] = useState<Feature[]>([
    {
      id: "new-payment",
      name: "New Payment Gateway SDK",
      description: "Enhanced payment processing",
      version: "v2.0-beta",
      icon: <CreditCard className="w-4 h-4" />,
      enabled: false,
      tooltip: "Support for multiple payment providers with unified API"
    },
    {
      id: "crypto",
      name: "Crypto Donations",
      description: "Accept cryptocurrency contributions",
      version: "v2.1-alpha",
      icon: <CreditCard className="w-4 h-4" />,
      enabled: false,
      tooltip: "Bitcoin, Ethereum, and stablecoin support"
    },
  ]);

  const [communityFeatures, setCommunityFeatures] = useState<Feature[]>([
    {
      id: "livestream",
      name: "Livestream Campaign Preview",
      description: "Real-time campaign broadcasting",
      version: "v1.5-beta",
      icon: <Video className="w-4 h-4" />,
      enabled: false,
      tooltip: "Stream live updates and engage with supporters"
    },
    {
      id: "comment-rank",
      name: "Smart Comment Ranking",
      description: "AI-powered relevance sorting",
      version: "v1.6-alpha",
      icon: <MessageSquare className="w-4 h-4" />,
      enabled: false,
      tooltip: "Automatically highlight most valuable community feedback"
    },
  ]);

  const toggleFeature = (category: string, id: string) => {
    const setters: Record<string, React.Dispatch<React.SetStateAction<Feature[]>>> = {
      campaign: setCampaignFeatures,
      donation: setDonationFeatures,
      community: setCommunityFeatures,
    };

    setters[category]((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const FeatureGroup = ({ 
    title, 
    features, 
    category 
  }: { 
    title: string; 
    features: Feature[]; 
    category: string;
  }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <div className="space-y-2">
        {features.map((feature) => (
          <TooltipProvider key={feature.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-between p-3 rounded-lg bg-input-bg/50 border border-border/50 hover:border-accent/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-accent">{feature.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground truncate">
                          {feature.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {feature.version}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={() => toggleFeature(category, feature.id)}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{feature.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="p-6 bg-surface border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Experimental Features
      </h2>
      
      <div className="space-y-6">
        <FeatureGroup title="Campaigns Module" features={campaignFeatures} category="campaign" />
        <FeatureGroup title="Donations System" features={donationFeatures} category="donation" />
        <FeatureGroup title="Community Layer" features={communityFeatures} category="community" />
      </div>
    </Card>
  );
};
