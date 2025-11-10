import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PayoutsHeader } from "@/components/payouts/PayoutsHeader";
import { PayoutsFilterBar } from "@/components/payouts/PayoutsFilterBar";
import { PayoutTransactionStream } from "@/components/payouts/PayoutTransactionStream";
import { PayoutInsightsPanel } from "@/components/payouts/PayoutInsightsPanel";
import { PayoutRequestDrawer } from "@/components/payouts/PayoutRequestDrawer";

export interface Payout {
  id: string;
  recipient: string;
  bankName: string;
  accountMask: string;
  amount: number;
  currency: string;
  campaign: string;
  status: "pending" | "processing" | "completed" | "failed";
  date: string;
  referenceId: string;
  fee: number;
  processedBy?: string;
  confirmationLink?: string;
}

const mockPayouts: Payout[] = [
  {
    id: "1",
    recipient: "WeCare Foundation",
    bankName: "Chase Bank",
    accountMask: "****4532",
    amount: 15420.50,
    currency: "USD",
    campaign: "Save the Ocean",
    status: "completed",
    date: "2024-01-15T10:30:00",
    referenceId: "PO-2024-001543",
    fee: 45.50,
    processedBy: "Admin User",
    confirmationLink: "#",
  },
  {
    id: "2",
    recipient: "Hope Foundation",
    bankName: "Bank of America",
    accountMask: "****7821",
    amount: 8900.00,
    currency: "USD",
    campaign: "Education for All",
    status: "processing",
    date: "2024-01-14T14:20:00",
    referenceId: "PO-2024-001542",
    fee: 26.70,
    processedBy: "System",
  },
  {
    id: "3",
    recipient: "Community Care",
    bankName: "Wells Fargo",
    accountMask: "****2398",
    amount: 23500.00,
    currency: "USD",
    campaign: "Winter Relief",
    status: "pending",
    date: "2024-01-14T09:15:00",
    referenceId: "PO-2024-001541",
    fee: 70.50,
  },
  {
    id: "4",
    recipient: "Green Earth Org",
    bankName: "Citibank",
    accountMask: "****5621",
    amount: 5200.00,
    currency: "USD",
    campaign: "Plant Trees",
    status: "failed",
    date: "2024-01-13T16:45:00",
    referenceId: "PO-2024-001540",
    fee: 15.60,
    processedBy: "Admin User",
  },
  {
    id: "5",
    recipient: "WeCare Foundation",
    bankName: "Chase Bank",
    accountMask: "****4532",
    amount: 12800.00,
    currency: "USD",
    campaign: "Medical Support",
    status: "completed",
    date: "2024-01-10T11:00:00",
    referenceId: "PO-2024-001539",
    fee: 38.40,
    processedBy: "System",
    confirmationLink: "#",
  },
];

export default function Payouts() {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [isRequestDrawerOpen, setIsRequestDrawerOpen] = useState(false);
  const [view, setView] = useState<"transactions" | "scheduled" | "accounts">("transactions");
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    campaign: "all",
    account: "all",
    currency: "all",
    dateRange: "30d",
  });

  const filteredPayouts = mockPayouts.filter((payout) => {
    if (filters.search && !payout.recipient.toLowerCase().includes(filters.search.toLowerCase()) &&
        !payout.referenceId.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status !== "all" && payout.status !== filters.status) return false;
    if (filters.campaign !== "all" && payout.campaign !== filters.campaign) return false;
    if (filters.currency !== "all" && payout.currency !== filters.currency) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <PayoutsHeader 
          view={view}
          onViewChange={setView}
          onRequestPayout={() => setIsRequestDrawerOpen(true)}
        />

        <PayoutsFilterBar filters={filters} onFiltersChange={setFilters} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 sm:gap-6">
          <PayoutTransactionStream
            payouts={filteredPayouts}
            onSelectPayout={setSelectedPayout}
          />

          <div className="hidden lg:block">
            <PayoutInsightsPanel />
          </div>
        </div>
      </div>

      <PayoutRequestDrawer
        open={isRequestDrawerOpen}
        onOpenChange={setIsRequestDrawerOpen}
      />
    </DashboardLayout>
  );
}
