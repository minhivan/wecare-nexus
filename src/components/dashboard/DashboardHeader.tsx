import { Search, Plus, Download, RefreshCw, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  sidebarCollapsed: boolean;
}

export const DashboardHeader = ({ title, subtitle, sidebarCollapsed }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Title Section */}
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <Input
              placeholder="Search... (⌘K)"
              className="w-64 pl-9 bg-muted/50"
            />
          </div>

          {/* Quick Actions */}
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
            <Download className="h-4 w-4" strokeWidth={1.5} />
            <span>Export</span>
          </Button>
          
          <Button size="sm" className="flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden md:inline">Add Campaign</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-fire-orange"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <RefreshCw className="h-5 w-5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </header>
  );
};
