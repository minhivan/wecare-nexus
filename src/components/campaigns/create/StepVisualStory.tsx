import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Upload, Image } from "lucide-react";
import { CampaignDraft } from "@/pages/CreateCampaign";

interface StepVisualStoryProps {
  data: CampaignDraft;
  updateData: (updates: Partial<CampaignDraft>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepVisualStory = ({ data, updateData, onNext, onPrevious }: StepVisualStoryProps) => {
  const canProceed = data.story.trim() !== "";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Visual & Story</h2>
          <p className="text-sm text-muted-foreground">
            Share your story and add compelling visuals that inspire donors.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors cursor-pointer">
              {data.coverImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img src={data.coverImage} alt="Cover" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Drop your image here</p>
                    <p className="text-xs text-muted-foreground">or click to browse</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateData({
                        coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
                      })
                    }
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Use Sample Image
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">About This Campaign *</Label>
            <Textarea
              id="story"
              placeholder="Tell your story... Why does this campaign matter? What impact will donations make?"
              value={data.story}
              onChange={(e) => updateData({ story: e.target.value })}
              className="min-h-[240px] text-base"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{data.story.length} / 2000 characters</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-cyan-500 hover:text-cyan-400">
                ✨ AI Tone Suggest
              </Button>
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

export default StepVisualStory;
