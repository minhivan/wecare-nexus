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
      <div className="space-y-6">
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

        <div className="flex gap-6">
          {/* Main Feed - 70% */}
          <div className="flex-1 w-[70%]">
            <FeedStream 
              filterCause={filterCause}
              sortBy={sortBy}
              showNetworkOnly={showNetworkOnly}
            />
          </div>

          {/* Discovery Sidebar - 30% */}
          <div className="w-[30%]">
            <DiscoverySidebar />
          </div>
        </div>

        {/* Floating Quick Actions */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-lg bg-emerald hover:bg-emerald/90 text-white h-14 px-6 hover:shadow-emerald/25 transition-all duration-200 hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            Start Campaign
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full shadow-lg h-12 px-6 animate-pulse hover:scale-105 transition-all duration-200"
          >
            <Users className="h-5 w-5 mr-2" />
            Invite Friends
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
