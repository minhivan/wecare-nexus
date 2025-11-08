import { Calendar, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface AnalyticsHeaderProps {
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  selectedCampaign: string | null;
  onCampaignChange: (campaign: string | null) => void;
}

export const AnalyticsHeader = ({
  dateRange,
  onDateRangeChange,
  selectedCampaign,
  onCampaignChange,
}: AnalyticsHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Track impact, measure engagement, and optimize your campaign strategy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="glass gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => date && onDateRangeChange({ ...dateRange, from: date })}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Campaign Filter */}
          <Select value={selectedCampaign || "all"} onValueChange={(value) => onCampaignChange(value === "all" ? null : value)}>
            <SelectTrigger className="w-[200px] glass">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="campaign1">Hope for Tomorrow</SelectItem>
              <SelectItem value="campaign2">Education First</SelectItem>
              <SelectItem value="campaign3">Clean Water Initiative</SelectItem>
            </SelectContent>
          </Select>

          {/* Export Button */}
          <Button className="glass gap-2 hover:bg-primary hover:text-primary-foreground transition-all">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};
