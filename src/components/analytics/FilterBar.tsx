import { Filter, Save, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  filters: {
    campaign: string | null;
    channel: string | null;
    country: string | null;
    donorType: string | null;
    device: string | null;
  };
  onFiltersChange: (filters: any) => void;
  comparePeriod: boolean;
  onComparePeriodChange: (value: boolean) => void;
}

export const FilterBar = ({
  filters,
  onFiltersChange,
  comparePeriod,
  onComparePeriodChange,
}: FilterBarProps) => {
  return (
    <div className="border-b border-border bg-secondary/20 px-6 py-4">
      <div className="flex items-center justify-between gap-4 max-w-[1360px] mx-auto">
        <div className="flex items-center gap-3 flex-1">
          <Filter className="h-4 w-4 stroke-[1.5px] text-muted-foreground" />
          
          <Select 
            value={filters.campaign || ""} 
            onValueChange={(value) => onFiltersChange({ ...filters, campaign: value })}
          >
            <SelectTrigger className="w-[160px] h-9 bg-background">
              <SelectValue placeholder="Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.channel || ""} 
            onValueChange={(value) => onFiltersChange({ ...filters, channel: value })}
          >
            <SelectTrigger className="w-[140px] h-9 bg-background">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.country || ""} 
            onValueChange={(value) => onFiltersChange({ ...filters, country: value })}
          >
            <SelectTrigger className="w-[140px] h-9 bg-background">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="vn">Vietnam</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.donorType || ""} 
            onValueChange={(value) => onFiltersChange({ ...filters, donorType: value })}
          >
            <SelectTrigger className="w-[150px] h-9 bg-background">
              <SelectValue placeholder="Donor Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Donors</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="returning">Returning</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.device || ""} 
            onValueChange={(value) => onFiltersChange({ ...filters, device: value })}
          >
            <SelectTrigger className="w-[130px] h-9 bg-background">
              <SelectValue placeholder="Device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Devices</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch 
              id="compare-period" 
              checked={comparePeriod}
              onCheckedChange={onComparePeriodChange}
            />
            <Label htmlFor="compare-period" className="text-sm cursor-pointer flex items-center gap-1.5">
              <GitCompare className="h-3.5 w-3.5" />
              Compare Period
            </Label>
          </div>

          <Button variant="outline" size="sm" className="h-9">
            <Save className="mr-2 h-3.5 w-3.5" />
            Save View
          </Button>
        </div>
      </div>
    </div>
  );
};
