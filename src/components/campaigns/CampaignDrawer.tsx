import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Edit, 
  Copy, 
  Archive, 
  Heart, 
  Users, 
  Share2, 
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
} from "lucide-react";
import { Campaign } from "@/pages/Campaigns";

interface CampaignDrawerProps {
  campaign: Campaign | null;
  open: boolean;
  onClose: () => void;
}

export const CampaignDrawer = ({ campaign, open, onClose }: CampaignDrawerProps) => {
  if (!campaign) return null;

  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <SheetTitle className="text-2xl">{campaign.title}</SheetTitle>
              <SheetDescription className="text-base mt-1">
                {campaign.organizer}
              </SheetDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Archive className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={campaign.thumbnail}
              alt={campaign.title}
              className="w-full h-64 object-cover"
            />
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Progress Section */}
            <div className="glass rounded-xl p-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Raised</p>
                  <h3 className="text-3xl font-bold">
                    ${(campaign.raised / 1000).toFixed(1)}K
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Goal</p>
                  <h3 className="text-2xl font-semibold text-muted-foreground">
                    ${(campaign.goal / 1000).toFixed(0)}K
                  </h3>
                </div>
              </div>
              
              <Progress value={progress} className="h-3" />
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{progress.toFixed(1)}% funded</span>
                <span className="text-emerald-500 font-semibold">
                  ${((campaign.goal - campaign.raised) / 1000).toFixed(1)}K remaining
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <Heart className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{campaign.donations}</p>
                    <p className="text-sm text-muted-foreground">Donations</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-cyan-500/10">
                    <Users className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{campaign.donors}</p>
                    <p className="text-sm text-muted-foreground">Donors</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="glass rounded-xl p-6">
              <h4 className="font-semibold mb-4">Top Contributors</h4>
              <div className="space-y-3">
                {[
                  { name: "Anonymous Donor", amount: 5000, avatar: "👤" },
                  { name: "Sarah Johnson", amount: 2500, avatar: "👩" },
                  { name: "Tech Corp Foundation", amount: 2000, avatar: "🏢" },
                ].map((contributor, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{contributor.avatar}</span>
                      <span className="font-medium">{contributor.name}</span>
                    </div>
                    <span className="font-bold text-primary">
                      ${contributor.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6 mt-6">
            <div className="glass rounded-xl p-6 space-y-4">
              <h4 className="font-semibold">Engagement Metrics</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Share2 className="h-5 w-5 text-violet-500" />
                    <span>Total Shares</span>
                  </div>
                  <span className="font-bold">{campaign.engagement}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <span>Growth Rate</span>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600">+24%</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6 mt-6">
            <div className="glass rounded-xl p-6 space-y-4">
              <h4 className="font-semibold">Financial Overview</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                    <span>Total Inflow</span>
                  </div>
                  <span className="font-bold">${campaign.raised.toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-cyan-500" />
                    <span>Avg. Donation</span>
                  </div>
                  <span className="font-bold">
                    ${campaign.donations > 0 ? (campaign.raised / campaign.donations).toFixed(0) : 0}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6 mt-6">
            <div className="glass rounded-xl p-6">
              <h4 className="font-semibold mb-4">Growth Signals</h4>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Growth chart visualization would go here
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
