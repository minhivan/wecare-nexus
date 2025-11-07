import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DonationsHeader } from "@/components/donations/DonationsHeader";
import { DonationsFilterBar } from "@/components/donations/DonationsFilterBar";
import { TransactionStream } from "@/components/donations/TransactionStream";
import { InsightsPanel } from "@/components/donations/InsightsPanel";
import { DonationDetailDrawer } from "@/components/donations/DonationDetailDrawer";

export interface Donation {
  id: string;
  donor: {
    name: string;
    email: string;
    avatar?: string;
    location?: string;
    totalDonations: number;
  };
  amount: number;
  currency: string;
  campaign: {
    id: string;
    name: string;
  };
  date: Date;
  status: "completed" | "pending" | "failed" | "refunded";
  type: "one-time" | "recurring" | "refund";
  paymentMethod: string;
  platform: "stripe" | "paypal" | "manual";
  message?: string;
  receiptLink?: string;
  tags: string[];
  transactionId: string;
}

// Mock data
const mockDonations: Donation[] = [
  {
    id: "1",
    donor: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "SJ",
      location: "San Francisco, CA",
      totalDonations: 5,
    },
    amount: 150,
    currency: "USD",
    campaign: { id: "c1", name: "Education for All" },
    date: new Date(),
    status: "completed",
    type: "one-time",
    paymentMethod: "Visa ****4242",
    platform: "stripe",
    message: "Happy to support this cause!",
    tags: ["High-value"],
    transactionId: "txn_1234567890",
  },
  {
    id: "2",
    donor: {
      name: "Michael Chen",
      email: "m.chen@email.com",
      avatar: "MC",
      location: "New York, NY",
      totalDonations: 12,
    },
    amount: 50,
    currency: "USD",
    campaign: { id: "c2", name: "Clean Water Initiative" },
    date: new Date(Date.now() - 3600000),
    status: "completed",
    type: "recurring",
    paymentMethod: "PayPal",
    platform: "paypal",
    tags: ["Recurring"],
    transactionId: "txn_0987654321",
  },
  {
    id: "3",
    donor: {
      name: "Emma Williams",
      email: "emma.w@email.com",
      avatar: "EW",
      location: "London, UK",
      totalDonations: 3,
    },
    amount: 200,
    currency: "USD",
    campaign: { id: "c3", name: "Healthcare Access" },
    date: new Date(Date.now() - 7200000),
    status: "pending",
    type: "one-time",
    paymentMethod: "Mastercard ****8888",
    platform: "stripe",
    message: "Keep up the great work!",
    tags: ["High-value"],
    transactionId: "txn_1122334455",
  },
];

const Donations = () => {
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [view, setView] = useState<"transactions" | "analytics">("transactions");
  const [filters, setFilters] = useState({
    search: "",
    campaign: "",
    type: "",
    status: "",
    currency: "",
    dateRange: "30D",
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DonationsHeader view={view} onViewChange={setView} />
        
        <DonationsFilterBar filters={filters} onFiltersChange={setFilters} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          <TransactionStream
            donations={mockDonations}
            onSelectDonation={setSelectedDonation}
          />
          <InsightsPanel donations={mockDonations} />
        </div>
      </div>

      <DonationDetailDrawer
        donation={selectedDonation}
        open={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
      />
    </DashboardLayout>
  );
};

export default Donations;
