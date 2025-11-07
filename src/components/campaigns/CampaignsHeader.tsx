import { Button } from "@/components/ui/button";
import { Plus, Download, RefreshCw } from "lucide-react";

export const CampaignsHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground mt-1">
          Monitor performance, growth, and health of your fundraising campaigns.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Save View
        </Button>
        
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        
        <Button size="sm" className="gap-2" data-tour="create-campaign">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>
    </div>
  );
};
