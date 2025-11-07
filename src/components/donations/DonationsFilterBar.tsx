import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DonationsFilterBarProps {
  filters: {
    search: string;
    campaign: string;
    type: string;
    status: string;
    currency: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const DonationsFilterBar = ({ filters, onFiltersChange }: DonationsFilterBarProps) => {
  const statuses = ["completed", "pending", "failed", "refunded"];
  const dateRanges = ["Today", "7D", "30D", "Custom"];

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by donor name, campaign, or reference ID..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
          />
        </div>

        <Select value={filters.campaign} onValueChange={(value) => onFiltersChange({ ...filters, campaign: value })}>
          <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm border-border/50">
            <SelectValue placeholder="Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="education">Education for All</SelectItem>
            <SelectItem value="water">Clean Water</SelectItem>
            <SelectItem value="health">Healthcare Access</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.type} onValueChange={(value) => onFiltersChange({ ...filters, type: value })}>
          <SelectTrigger className="w-[160px] bg-background/50 backdrop-blur-sm border-border/50">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="one-time">One-time</SelectItem>
            <SelectItem value="recurring">Recurring</SelectItem>
            <SelectItem value="refund">Refund</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.currency} onValueChange={(value) => onFiltersChange({ ...filters, currency: value })}>
          <SelectTrigger className="w-[120px] bg-background/50 backdrop-blur-sm border-border/50">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="vnd">VND</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          {dateRanges.map((range) => (
            <Button
              key={range}
              variant={filters.dateRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, dateRange: range })}
              className="h-9"
            >
              {range === "Custom" && <Calendar className="h-4 w-4 mr-1" />}
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Chips */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Status:</span>
        {statuses.map((status) => (
          <Badge
            key={status}
            variant={filters.status === status ? "default" : "outline"}
            className="cursor-pointer capitalize"
            onClick={() => onFiltersChange({ ...filters, status: filters.status === status ? "" : status })}
          >
            {status}
          </Badge>
        ))}
      </div>

      {/* KPI Chips */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald/10 to-emerald/5 border border-emerald/20">
          <div className="text-2xl font-bold text-foreground">$12,450</div>
          <div className="text-sm text-muted-foreground">Total Donations</div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan/10 to-cyan/5 border border-cyan/20">
          <div className="text-2xl font-bold text-foreground">$156</div>
          <div className="text-sm text-muted-foreground">Avg. Donation</div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-violet/10 to-violet/5 border border-violet/20">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet to-pink text-white text-xs flex items-center justify-center font-semibold">
              SJ
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Sarah Johnson</div>
              <div className="text-xs text-muted-foreground">$850 donated</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber/10 to-amber/5 border border-amber/20">
          <div className="text-2xl font-bold text-foreground">8</div>
          <div className="text-sm text-muted-foreground">Active Campaigns</div>
        </div>
      </div>
    </div>
  );
};
