import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Filter, TrendingUp, Clock, Users as UsersIcon, Building2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CommunityHeaderProps {
  sortBy: "trending" | "recent" | "following";
  onSortChange: (sort: "trending" | "recent" | "following") => void;
}

export const CommunityHeader = ({ sortBy, onSortChange }: CommunityHeaderProps) => {
  const [showDiscoverModal, setShowDiscoverModal] = useState(false);

  const sortOptions = [
    { value: "trending", label: "Trending", icon: TrendingUp },
    { value: "recent", label: "Recent", icon: Clock },
    { value: "following", label: "Following", icon: UsersIcon },
  ] as const;

  const CurrentSortIcon = sortOptions.find(opt => opt.value === sortBy)?.icon || TrendingUp;

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Community</h1>
          <p className="text-muted-foreground">
            Explore stories, support causes, and connect with changemakers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-border/50 hover:bg-accent/50"
            onClick={() => setShowDiscoverModal(true)}
          >
            <Building2 className="h-4 w-4 mr-2" />
            Discover Organizations
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-border/50 hover:bg-accent/50">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Cause
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>All Causes</DropdownMenuItem>
              <DropdownMenuItem>Health</DropdownMenuItem>
              <DropdownMenuItem>Education</DropdownMenuItem>
              <DropdownMenuItem>Environment</DropdownMenuItem>
              <DropdownMenuItem>Animals</DropdownMenuItem>
              <DropdownMenuItem>Emergency</DropdownMenuItem>
              <DropdownMenuItem>Innovation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-border/50 hover:bg-accent/50">
                <CurrentSortIcon className="h-4 w-4 mr-2" />
                Sort by {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                >
                  <option.icon className="h-4 w-4 mr-2" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-emerald hover:bg-emerald/90 text-white shadow-lg hover:shadow-emerald/25">
            <Plus className="h-4 w-4 mr-2" />
            Start a Post
          </Button>
        </div>
      </div>

      <Dialog open={showDiscoverModal} onOpenChange={setShowDiscoverModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Discover Organizations</DialogTitle>
            <DialogDescription>
              Find and follow organizations making a difference
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {[1, 2, 3, 4].map((org) => (
              <div
                key={org}
                className="p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald to-cyan flex items-center justify-center text-white font-bold">
                    O{org}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">Organization {org}</h4>
                    <p className="text-sm text-muted-foreground">Making impact in education</p>
                    <Button size="sm" className="mt-2 bg-cyan hover:bg-cyan/90 text-white">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
