import { Calendar, RefreshCw, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface AnalyticsHeaderProps {
  activeTab: string;
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export const AnalyticsHeader = ({
  activeTab,
  dateRange,
  onDateRangeChange,
}: AnalyticsHeaderProps) => {
  const tabNames = {
    insight: "Insight",
    trend: "Trend",
    conversion: "Conversion",
  };

  return (
    <div className="border-b border-border bg-background px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Analytics</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">
              {tabNames[activeTab as keyof typeof tabNames]}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-sm">
                  {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 border-b border-border space-y-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    const end = new Date();
                    const start = new Date();
                    start.setDate(end.getDate() - 7);
                    onDateRangeChange({ from: start, to: end });
                  }}
                >
                  Last 7 days
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    const end = new Date();
                    const start = new Date();
                    start.setDate(end.getDate() - 30);
                    onDateRangeChange({ from: start, to: end });
                  }}
                >
                  Last 30 days
                </Button>
              </div>
              <CalendarComponent
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    onDateRangeChange({ from: range.from, to: range.to });
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" className="h-9">
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
};
