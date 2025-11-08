import { TrendingUp, DollarSign, Clock, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface PayoutsFilterBarProps {
  filters: {
    search: string;
    status: string;
    campaign: string;
    account: string;
    currency: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const PayoutsFilterBar = ({ filters, onFiltersChange }: PayoutsFilterBarProps) => {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={filters.status}
          onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
        >
          <SelectTrigger className="w-[160px] bg-card/50 border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.campaign}
          onValueChange={(value) => onFiltersChange({ ...filters, campaign: value })}
        >
          <SelectTrigger className="w-[200px] bg-card/50 border-border">
            <SelectValue placeholder="Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="Save the Ocean">Save the Ocean</SelectItem>
            <SelectItem value="Education for All">Education for All</SelectItem>
            <SelectItem value="Winter Relief">Winter Relief</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.account}
          onValueChange={(value) => onFiltersChange({ ...filters, account: value })}
        >
          <SelectTrigger className="w-[200px] bg-card/50 border-border">
            <SelectValue placeholder="Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            <SelectItem value="chase">Chase Bank ****4532</SelectItem>
            <SelectItem value="boa">Bank of America ****7821</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.currency}
          onValueChange={(value) => onFiltersChange({ ...filters, currency: value })}
        >
          <SelectTrigger className="w-[120px] bg-card/50 border-border">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="VND">VND</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.dateRange}
          onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value })}
        >
          <SelectTrigger className="w-[140px] bg-card/50 border-border">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-emerald/10 to-transparent border-emerald/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold text-foreground mt-1">$47,892</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-emerald/20 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-cyan/10 to-transparent border-cyan/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Payouts</p>
              <p className="text-2xl font-bold text-foreground mt-1">$65,820</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-cyan/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-cyan" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber/10 to-transparent border-amber/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Pending Requests</p>
              <p className="text-2xl font-bold text-foreground mt-1">2</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-amber/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-violet/10 to-transparent border-violet/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Last Settlement</p>
              <p className="text-sm font-medium text-foreground mt-1">Jan 15, 2024</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-violet/20 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-violet" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
