import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CampaignsHeader } from "@/components/campaigns/CampaignsHeader";
import { FilterBar } from "@/components/campaigns/FilterBar";
import { MetricsSnapshot } from "@/components/campaigns/MetricsSnapshot";
import { CampaignGrid } from "@/components/campaigns/CampaignGrid";
import { CampaignDrawer } from "@/components/campaigns/CampaignDrawer";

export interface Campaign {
  id: string;
  title: string;
  organizer: string;
  thumbnail: string;
  goal: number;
  raised: number;
  donations: number;
  donors: number;
  engagement: number;
  status: "active" | "scheduled" | "draft" | "ended";
  startDate?: string;
  endDate?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Clean Water Initiative 2025",
    organizer: "Global Impact Foundation",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=240&fit=crop",
    goal: 30000,
    raised: 24500,
    donations: 156,
    donors: 89,
    engagement: 342,
    status: "active",
  },
  {
    id: "2",
    title: "Education for Rural Communities",
    organizer: "Learn Together",
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=240&fit=crop",
    goal: 50000,
    raised: 47200,
    donations: 298,
    donors: 165,
    engagement: 892,
    status: "active",
  },
  {
    id: "3",
    title: "Medical Relief Fund",
    organizer: "HealthCare Heroes",
    thumbnail: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=240&fit=crop",
    goal: 75000,
    raised: 38900,
    donations: 203,
    donors: 127,
    engagement: 567,
    status: "active",
  },
  {
    id: "4",
    title: "Wildlife Conservation Project",
    organizer: "Earth Guardians",
    thumbnail: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=240&fit=crop",
    goal: 40000,
    raised: 15600,
    donations: 87,
    donors: 56,
    engagement: 234,
    status: "active",
  },
  {
    id: "5",
    title: "Food Security Initiative",
    organizer: "Hunger Relief Network",
    thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=240&fit=crop",
    goal: 25000,
    raised: 0,
    donations: 0,
    donors: 0,
    engagement: 0,
    status: "scheduled",
    startDate: "2025-12-01",
  },
  {
    id: "6",
    title: "Youth Empowerment Program",
    organizer: "Future Leaders",
    thumbnail: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=240&fit=crop",
    goal: 20000,
    raised: 0,
    donations: 0,
    donors: 0,
    engagement: 0,
    status: "draft",
  },
  {
    id: "7",
    title: "Community Garden Project",
    organizer: "Green Neighbors",
    thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=240&fit=crop",
    goal: 15000,
    raised: 15200,
    donations: 124,
    donors: 78,
    engagement: 456,
    status: "ended",
    endDate: "2025-10-31",
  },
];

const Campaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    status: "all",
    dateRange: null,
  });

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    if (filters.status !== "all" && campaign.status !== filters.status) {
      return false;
    }
    if (filters.search && !campaign.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const activeCampaigns = filteredCampaigns.filter((c) => c.status === "active");
  const scheduledCampaigns = filteredCampaigns.filter((c) => c.status === "scheduled");
  const draftCampaigns = filteredCampaigns.filter((c) => c.status === "draft");
  const endedCampaigns = filteredCampaigns.filter((c) => c.status === "ended");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 animate-fade-in">
        <CampaignsHeader />
        
        <FilterBar filters={filters} onFiltersChange={setFilters} />
        
        <MetricsSnapshot campaigns={mockCampaigns} />
        
        <div className="space-y-6 sm:space-y-8">
          {activeCampaigns.length > 0 && (
            <CampaignGrid
              title="Active Campaigns"
              campaigns={activeCampaigns}
              onSelectCampaign={setSelectedCampaign}
            />
          )}
          
          {(scheduledCampaigns.length > 0 || draftCampaigns.length > 0) && (
            <CampaignGrid
              title="Scheduled & Draft"
              campaigns={[...scheduledCampaigns, ...draftCampaigns]}
              onSelectCampaign={setSelectedCampaign}
              collapsed
            />
          )}
          
          {endedCampaigns.length > 0 && (
            <CampaignGrid
              title="Ended Campaigns"
              campaigns={endedCampaigns}
              onSelectCampaign={setSelectedCampaign}
              collapsed
            />
          )}
        </div>
      </div>

      <CampaignDrawer
        campaign={selectedCampaign}
        open={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </DashboardLayout>
  );
};

export default Campaigns;
