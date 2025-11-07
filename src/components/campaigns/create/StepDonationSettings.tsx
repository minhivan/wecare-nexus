import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react";
import { CampaignDraft } from "@/pages/CreateCampaign";

interface StepDonationSettingsProps {
  data: CampaignDraft;
  updateData: (updates: Partial<CampaignDraft>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepDonationSettings = ({ data, updateData, onNext, onPrevious }: StepDonationSettingsProps) => {
  const updateTier = (index: number, field: string, value: string | number) => {
    const newTiers = [...data.suggestedTiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    updateData({ suggestedTiers: newTiers });
  };

  const removeTier = (index: number) => {
    const newTiers = data.suggestedTiers.filter((_, i) => i !== index);
    updateData({ suggestedTiers: newTiers });
  };

  const addTier = () => {
    updateData({
      suggestedTiers: [...data.suggestedTiers, { amount: 0, emoji: "💙", label: "New Tier" }],
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Donation Settings</h2>
          <p className="text-sm text-muted-foreground">Configure how people can support your campaign.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="min-donation">Minimum Donation</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="min-donation"
                type="number"
                value={data.minimumDonation}
                onChange={(e) => updateData({ minimumDonation: parseInt(e.target.value) || 0 })}
                className="pl-7 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Suggested Donation Tiers</Label>
              <Button variant="ghost" size="sm" onClick={addTier} className="gap-1 h-auto p-1 text-xs">
                <Plus className="w-3 h-3" />
                Add Tier
              </Button>
            </div>
            <div className="space-y-2">
              {data.suggestedTiers.map((tier, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <Input
                    placeholder="💚"
                    value={tier.emoji}
                    onChange={(e) => updateTier(index, "emoji", e.target.value)}
                    className="w-16 text-center"
                  />
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={tier.amount}
                      onChange={(e) => updateTier(index, "amount", parseInt(e.target.value) || 0)}
                      className="pl-7"
                    />
                  </div>
                  <Input
                    placeholder="Label"
                    value={tier.label}
                    onChange={(e) => updateTier(index, "label", e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTier(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
            <div className="space-y-0.5">
              <Label htmlFor="recurring" className="text-sm font-medium">
                Enable Recurring Donations
              </Label>
              <p className="text-xs text-muted-foreground">Allow donors to set up monthly contributions</p>
            </div>
            <Switch
              id="recurring"
              checked={data.enableRecurring}
              onCheckedChange={(checked) => updateData({ enableRecurring: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thank-you">Auto Thank-You Message</Label>
            <Textarea
              id="thank-you"
              placeholder="Personalized message sent to donors after contribution"
              value={data.autoThankYou}
              onChange={(e) => updateData({ autoThankYou: e.target.value })}
              className="text-base resize-none"
              rows={3}
            />
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
          onClick={onNext}
          className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StepDonationSettings;
