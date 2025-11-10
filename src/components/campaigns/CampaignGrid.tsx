import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "./CampaignCard";
import { Campaign } from "@/pages/Campaigns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CampaignGridProps {
  title: string;
  campaigns: Campaign[];
  onSelectCampaign: (campaign: Campaign) => void;
  collapsed?: boolean;
}

export const CampaignGrid = ({
  title,
  campaigns,
  onSelectCampaign,
  collapsed = false,
}: CampaignGridProps) => {
  const [isOpen, setIsOpen] = useState(!collapsed);

  return (
    <div className="space-y-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <span className="text-sm text-muted-foreground">
                {campaigns.length} {campaigns.length === 1 ? "campaign" : "campaigns"}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onClick={() => onSelectCampaign(campaign)}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
