import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  filters: {
    search: string;
    category: string;
    status: string;
    dateRange: any;
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterBar = ({ filters, onFiltersChange }: FilterBarProps) => {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
    { value: "scheduled", label: "Scheduled", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    { value: "draft", label: "Draft", color: "bg-muted text-muted-foreground" },
    { value: "ended", label: "Ended", color: "bg-muted text-muted-foreground" },
  ];

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or tag..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-9 bg-background/50"
          />
        </div>

        {/* Category */}
        <Select
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
        >
          <SelectTrigger className="w-[180px] bg-background/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="community">Community</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {statusOptions.map((option) => (
            <Badge
              key={option.value}
              variant={filters.status === option.value ? "default" : "outline"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                filters.status === option.value
                  ? "bg-primary text-primary-foreground"
                  : option.color || ""
              }`}
              onClick={() => onFiltersChange({ ...filters, status: option.value })}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
