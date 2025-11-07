import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Rocket, Globe, Lock, EyeOff } from "lucide-react";
import { CampaignDraft } from "@/pages/CreateCampaign";

interface StepPublishVisibilityProps {
  data: CampaignDraft;
  updateData: (updates: Partial<CampaignDraft>) => void;
  onPublish: () => void;
  onPrevious: () => void;
}

const StepPublishVisibility = ({ data, updateData, onPublish, onPrevious }: StepPublishVisibilityProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Publish & Visibility</h2>
          <p className="text-sm text-muted-foreground">Choose how your campaign appears to the world.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Visibility Settings</Label>
            <RadioGroup
              value={data.visibility}
              onValueChange={(value: "public" | "unlisted" | "private") => updateData({ visibility: value })}
              className="space-y-2"
            >
              <div className="flex items-start space-x-3 p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="public" id="public" className="mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <Label htmlFor="public" className="text-sm font-medium cursor-pointer">
                      Public
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Visible to everyone, searchable, and shareable on social media
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="unlisted" id="unlisted" className="mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <EyeOff className="w-4 h-4 text-amber-500" />
                    <Label htmlFor="unlisted" className="text-sm font-medium cursor-pointer">
                      Unlisted
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Only people with the link can view and donate
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="private" id="private" className="mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-red-500" />
                    <Label htmlFor="private" className="text-sm font-medium cursor-pointer">
                      Private
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hidden from all feeds, invite-only access
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
            <div className="space-y-0.5">
              <Label htmlFor="community-feed" className="text-sm font-medium">
                Show in Community Feed
              </Label>
              <p className="text-xs text-muted-foreground">Let others discover your campaign</p>
            </div>
            <Switch
              id="community-feed"
              checked={data.showInCommunityFeed}
              onCheckedChange={(checked) => updateData({ showInCommunityFeed: checked })}
              disabled={data.visibility !== "public"}
            />
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-cyan-500 mb-2">Social Preview</p>
            <div className="bg-background/80 rounded-lg p-3 space-y-2">
              <p className="text-sm font-semibold text-foreground line-clamp-1">{data.title || "Your Campaign Title"}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{data.tagline || "Your campaign tagline..."}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>🎯 ${data.targetAmount.toLocaleString()} Goal</span>
                <span>•</span>
                <span>⏱️ {data.duration} Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" size="lg" onClick={onPrevious} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          size="lg"
          onClick={onPublish}
          className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20"
        >
          <Rocket className="w-4 h-4" />
          Launch Campaign
        </Button>
      </div>
    </div>
  );
};

export default StepPublishVisibility;
