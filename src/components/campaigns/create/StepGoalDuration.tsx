import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, ArrowLeft, TrendingUp } from "lucide-react";
import { CampaignDraft } from "@/pages/CreateCampaign";

interface StepGoalDurationProps {
  data: CampaignDraft;
  updateData: (updates: Partial<CampaignDraft>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepGoalDuration = ({ data, updateData, onNext, onPrevious }: StepGoalDurationProps) => {
  const canProceed = data.targetAmount > 0 && data.duration > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Goal & Duration</h2>
          <p className="text-sm text-muted-foreground">Set your fundraising target and timeline.</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Target Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10000"
                  value={data.targetAmount}
                  onChange={(e) => updateData({ targetAmount: parseInt(e.target.value) || 0 })}
                  className="pl-7 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={data.currency} onValueChange={(value) => updateData({ currency: value })}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="VND">VND (₫)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Campaign Duration (days) *</Label>
            <Input
              id="duration"
              type="number"
              placeholder="30"
              value={data.duration}
              onChange={(e) => updateData({ duration: parseInt(e.target.value) || 0 })}
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              Recommended: 30-60 days for optimal engagement
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
            <div className="space-y-0.5">
              <Label htmlFor="flexible-date" className="text-sm font-medium">
                Allow Flexible End Date
              </Label>
              <p className="text-xs text-muted-foreground">Campaign can continue if goal is not met</p>
            </div>
            <Switch
              id="flexible-date"
              checked={data.flexibleEndDate}
              onCheckedChange={(checked) => updateData({ flexibleEndDate: checked })}
            />
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-500">Success Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                Campaigns with clear goals and 30-45 day timelines have 2x higher success rates.
              </p>
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

export default StepGoalDuration;
