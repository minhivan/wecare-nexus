import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CommunityHeader } from "@/components/community/CommunityHeader";
import { FilterBar } from "@/components/community/FilterBar";
import { FeedStream } from "@/components/community/FeedStream";
import { DiscoverySidebar } from "@/components/community/DiscoverySidebar";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useState } from "react";

export default function Community() {
  const [filterCause, setFilterCause] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "following">("trending");
  const [showNetworkOnly, setShowNetworkOnly] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <CommunityHeader 
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        
        <FilterBar
          selectedCause={filterCause}
          onCauseChange={setFilterCause}
          showNetworkOnly={showNetworkOnly}
          onNetworkToggle={setShowNetworkOnly}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 sm:gap-6">
          {/* Main Feed */}
          <div>
            <FeedStream 
              filterCause={filterCause}
              sortBy={sortBy}
              showNetworkOnly={showNetworkOnly}
            />
          </div>

          {/* Discovery Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <DiscoverySidebar />
          </div>
        </div>

        {/* Floating Quick Actions */}
        <div className="fixed bottom-20 md:bottom-8 right-4 sm:right-8 flex flex-col gap-3 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-lg bg-emerald hover:bg-emerald/90 text-white h-12 sm:h-14 px-4 sm:px-6 hover:shadow-emerald/25 transition-all duration-200 hover:scale-105"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" />
            <span className="hidden sm:inline">Start Campaign</span>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full shadow-lg h-10 sm:h-12 px-4 sm:px-6 animate-pulse hover:scale-105 transition-all duration-200"
          >
            <Users className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" />
            <span className="hidden sm:inline">Invite Friends</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
