import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Heart, GraduationCap, Leaf, Dog, AlertCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedCause: string | null;
  onCauseChange: (cause: string | null) => void;
  showNetworkOnly: boolean;
  onNetworkToggle: (value: boolean) => void;
}

const causes = [
  { id: "health", label: "Health", icon: Heart, color: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20" },
  { id: "education", label: "Education", icon: GraduationCap, color: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20" },
  { id: "environment", label: "Environment", icon: Leaf, color: "bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20" },
  { id: "animals", label: "Animals", icon: Dog, color: "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border-amber-500/20" },
  { id: "emergency", label: "Emergency", icon: AlertCircle, color: "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border-orange-500/20" },
  { id: "innovation", label: "Innovation", icon: Lightbulb, color: "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/20" },
];

export const FilterBar = ({
  selectedCause,
  onCauseChange,
  showNetworkOnly,
  onNetworkToggle,
}: FilterBarProps) => {
  return (
    <div className="space-y-4">
      {/* Chip Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer transition-all duration-200 px-4 py-2 border",
            !selectedCause && "bg-cyan/10 text-cyan border-cyan/30"
          )}
          onClick={() => onCauseChange(null)}
        >
          All
        </Badge>
        {causes.map((cause) => {
          const Icon = cause.icon;
          return (
            <Badge
              key={cause.id}
              variant="outline"
              className={cn(
                "cursor-pointer transition-all duration-200 px-4 py-2 border",
                cause.color,
                selectedCause === cause.id && "ring-2 ring-offset-2 ring-offset-background"
              )}
              onClick={() => onCauseChange(cause.id)}
            >
              <Icon className="h-3.5 w-3.5 mr-1.5" />
              {cause.label}
            </Badge>
          );
        })}
      </div>

      {/* Search & Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, people, or causes..."
            className="pl-10 bg-card/50 border-border/50 focus:bg-card transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/50">
          <Switch
            id="network-toggle"
            checked={showNetworkOnly}
            onCheckedChange={onNetworkToggle}
          />
          <Label htmlFor="network-toggle" className="cursor-pointer text-sm">
            Show my network only
          </Label>
        </div>
      </div>
    </div>
  );
};
