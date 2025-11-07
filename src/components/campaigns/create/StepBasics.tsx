import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from "lucide-react";
import { CampaignDraft } from "@/pages/CreateCampaign";

interface StepBasicsProps {
  data: CampaignDraft;
  updateData: (updates: Partial<CampaignDraft>) => void;
  onNext: () => void;
}

const categories = [
  "Healthcare",
  "Education",
  "Environment",
  "Community",
  "Emergency Relief",
  "Animal Welfare",
  "Arts & Culture",
  "Other",
];

const StepBasics = ({ data, updateData, onNext }: StepBasicsProps) => {
  const canProceed = data.title.trim() !== "" && data.tagline.trim() !== "" && data.category !== "";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Campaign Basics</h2>
          <p className="text-sm text-muted-foreground">Let's start with the essentials of your campaign.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Clean Water for Rural Communities"
              value={data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">{data.title.length} / 80 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Short Tagline *</Label>
            <Textarea
              id="tagline"
              placeholder="One compelling sentence that captures your mission"
              value={data.tagline}
              onChange={(e) => updateData({ tagline: e.target.value })}
              className="text-base resize-none"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">{data.tagline.length} / 120 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={data.category} onValueChange={(value) => updateData({ category: value })}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
            <div className="space-y-0.5">
              <Label htmlFor="team-collab" className="text-sm font-medium">
                Enable Team Collaboration
              </Label>
              <p className="text-xs text-muted-foreground">Allow others to help manage this campaign</p>
            </div>
            <Switch
              id="team-collab"
              checked={data.enableTeamCollaboration}
              onCheckedChange={(checked) => updateData({ enableTeamCollaboration: checked })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canProceed}
          className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StepBasics;
