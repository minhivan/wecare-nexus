import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Users } from "lucide-react";
import { CampaignDraft } from "@/pages/CreateCampaign";

interface MobilePreviewProps {
  data: CampaignDraft;
}

const MobilePreview = ({ data }: MobilePreviewProps) => {
  const progress = (15000 / data.targetAmount) * 100; // Mock current amount

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 blur-3xl -z-10 animate-pulse" />
      
      {/* iPhone Frame */}
      <div className="bg-card/80 backdrop-blur-xl border-2 border-border rounded-[3rem] p-3 shadow-2xl">
        <div className="bg-background rounded-[2.5rem] overflow-hidden h-[720px] flex flex-col">
          {/* Mobile Status Bar */}
          <div className="h-12 bg-card/50 flex items-center justify-between px-6 text-xs text-muted-foreground">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>100%</span>
              <div className="w-5 h-3 border border-current rounded-sm" />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Image */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 overflow-hidden">
              {data.coverImage ? (
                <img src={data.coverImage} alt="Campaign" className="w-full h-full object-cover animate-fade-in" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-card/50 rounded-2xl mx-auto mb-2" />
                    <p className="text-xs">Cover image preview</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <Badge className="absolute top-4 right-4 bg-emerald-500 text-white border-0">
                {data.category || "Category"}
              </Badge>
            </div>

            {/* Campaign Content */}
            <div className="p-5 space-y-4 -mt-12 relative z-10">
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-foreground animate-fade-in">
                  {data.title || "Campaign Title"}
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {data.tagline || "Your compelling tagline will appear here..."}
                </p>
              </div>

              {/* Progress Section */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 space-y-3 border border-border">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">$15,000</p>
                    <p className="text-xs text-muted-foreground">
                      raised of ${data.targetAmount.toLocaleString()} goal
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-emerald-500">{Math.round(progress)}%</p>
                    <p className="text-xs text-muted-foreground">{data.duration} days left</p>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>234 donors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    <span>89 shares</span>
                  </div>
                </div>
              </div>

              {/* Donation Tiers */}
              {data.suggestedTiers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Support this campaign</p>
                  <div className="grid grid-cols-3 gap-2">
                    {data.suggestedTiers.map((tier, index) => (
                      <button
                        key={index}
                        className="bg-card/50 border border-border hover:border-primary/50 rounded-lg p-3 text-center transition-all hover:scale-105"
                      >
                        <div className="text-2xl mb-1">{tier.emoji}</div>
                        <p className="text-sm font-semibold text-foreground">${tier.amount}</p>
                        <p className="text-xs text-muted-foreground truncate">{tier.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Story Preview */}
              {data.story && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">About</p>
                  <p className="text-sm text-muted-foreground line-clamp-4">{data.story}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg py-3 font-semibold text-sm shadow-lg shadow-emerald-500/20">
                  Donate Now
                </button>
                <button className="bg-card border border-border rounded-lg p-3 hover:bg-accent transition-colors">
                  <Heart className="w-5 h-5 text-muted-foreground" />
                </button>
                <button className="bg-card border border-border rounded-lg p-3 hover:bg-accent transition-colors">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">Live Preview • Updates in real-time</p>
    </div>
  );
};

export default MobilePreview;
