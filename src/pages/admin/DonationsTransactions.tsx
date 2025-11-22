import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Calendar,
  RefreshCw,
  Download,
  SlidersHorizontal,
  MoreVertical,
  CreditCard,
  AlertTriangle,
  Eye,
  RotateCcw,
  Flag,
  Receipt,
  MapPin,
  Wallet,
  Bitcoin,
} from "lucide-react";
import { TransactionDetailDrawer } from "@/components/admin/TransactionDetailDrawer";

interface Transaction {
  id: string;
  timestamp: string;
  donor: { name: string; email: string };
  campaign: { title: string; category: string };
  paymentMethod: "card" | "bank" | "wallet" | "crypto";
  amount: number;
  currency: string;
  status: "successful" | "pending" | "failed" | "refunded" | "flagged";
  riskSignals: string[];
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-2024-001234",
    timestamp: "2024-01-15 14:32:01",
    donor: { name: "John Smith", email: "john.smith@email.com" },
    campaign: { title: "Build Clean Water Wells", category: "Environment" },
    paymentMethod: "card",
    amount: 50000,
    currency: "VND",
    status: "successful",
    riskSignals: [],
  },
  {
    id: "TXN-2024-001235",
    timestamp: "2024-01-15 14:28:15",
    donor: { name: "Sarah Johnson", email: "sarah.j@email.com" },
    campaign: { title: "Education for Children", category: "Education" },
    paymentMethod: "wallet",
    amount: 100000,
    currency: "VND",
    status: "successful",
    riskSignals: [],
  },
  {
    id: "TXN-2024-001236",
    timestamp: "2024-01-15 14:15:42",
    donor: { name: "Michael Chen", email: "m.chen@email.com" },
    campaign: { title: "Medical Support Fund", category: "Healthcare" },
    paymentMethod: "bank",
    amount: 200000,
    currency: "VND",
    status: "pending",
    riskSignals: [],
  },
  {
    id: "TXN-2024-001237",
    timestamp: "2024-01-15 13:55:23",
    donor: { name: "Anonymous Donor", email: "anon_8234@temp.com" },
    campaign: { title: "Emergency Relief", category: "Disaster Relief" },
    paymentMethod: "crypto",
    amount: 500000,
    currency: "VND",
    status: "flagged",
    riskSignals: ["velocity", "region"],
  },
  {
    id: "TXN-2024-001238",
    timestamp: "2024-01-15 13:42:10",
    donor: { name: "Emily Davis", email: "emily.davis@email.com" },
    campaign: { title: "Animal Shelter Support", category: "Animals" },
    paymentMethod: "card",
    amount: 75000,
    currency: "VND",
    status: "failed",
    riskSignals: ["mismatch"],
  },
  {
    id: "TXN-2024-001239",
    timestamp: "2024-01-15 13:30:55",
    donor: { name: "David Wilson", email: "d.wilson@email.com" },
    campaign: { title: "Community Library", category: "Education" },
    paymentMethod: "wallet",
    amount: 150000,
    currency: "VND",
    status: "refunded",
    riskSignals: [],
  },
];

const statusConfig = {
  successful: { label: "Successful", className: "bg-green-50 text-green-700 border-green-200" },
  pending: { label: "Pending", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  failed: { label: "Failed", className: "bg-red-50 text-red-700 border-red-200" },
  refunded: { label: "Refunded", className: "bg-gray-50 text-gray-700 border-gray-200" },
  flagged: { label: "Flagged", className: "bg-orange-50 text-orange-700 border-orange-200" },
};

const paymentMethodIcons = {
  card: <CreditCard className="h-4 w-4" />,
  bank: <Wallet className="h-4 w-4" />,
  wallet: <Wallet className="h-4 w-4" />,
  crypto: <Bitcoin className="h-4 w-4" />,
};

const riskSignalIcons = {
  velocity: <AlertTriangle className="h-4 w-4 text-orange-500" />,
  mismatch: <AlertTriangle className="h-4 w-4 text-red-500" />,
  region: <MapPin className="h-4 w-4 text-yellow-500" />,
};

export default function DonationsTransactions() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDrawerOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#111827]">
              Donation Transactions
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Track, validate, and manage all donation activity across the platform.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
              <Input
                placeholder="Search transactions..."
                className="pl-9 w-[240px] bg-white border-[#E5E7EB]"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            {["all", "successful", "pending", "failed", "refunded", "flagged"].map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
                className={
                  selectedStatus === status
                    ? "bg-[#2563EB] text-white hover:bg-[#2563EB]/90"
                    : "text-[#6B7280] hover:bg-[#F3F4F6]"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
          <div className="h-6 w-px bg-[#E5E7EB]" />
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  Payment Method
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Card</DropdownMenuItem>
                <DropdownMenuItem>Bank</DropdownMenuItem>
                <DropdownMenuItem>eWallet</DropdownMenuItem>
                <DropdownMenuItem>Crypto</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  Campaign
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Campaigns</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  Donor Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Guest</DropdownMenuItem>
                <DropdownMenuItem>Registered</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  Country
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Vietnam</DropdownMenuItem>
                <DropdownMenuItem>United States</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="h-6 w-px bg-[#E5E7EB]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                Sort: Newest
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>Highest Amount</DropdownMenuItem>
              <DropdownMenuItem>Most Flagged</DropdownMenuItem>
              <DropdownMenuItem>Chargeback Risk</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                <TableHead className="text-[#6B7280] font-medium">Transaction</TableHead>
                <TableHead className="text-[#6B7280] font-medium">Donor</TableHead>
                <TableHead className="text-[#6B7280] font-medium">Campaign</TableHead>
                <TableHead className="text-[#6B7280] font-medium">Payment</TableHead>
                <TableHead className="text-[#6B7280] font-medium">Amount</TableHead>
                <TableHead className="text-[#6B7280] font-medium">Status</TableHead>
                <TableHead className="text-[#6B7280] font-medium">Risk</TableHead>
                <TableHead className="text-[#6B7280] font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="hover:bg-[#F3F4F6] cursor-pointer transition-colors group relative"
                  onClick={() => handleViewTransaction(transaction)}
                >
                  <TableCell>
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <div className="font-medium text-[#111827]">{transaction.id}</div>
                      <div className="text-sm text-[#6B7280]">{transaction.timestamp}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-[#111827]">{transaction.donor.name}</div>
                      <div className="text-sm text-[#6B7280]">{transaction.donor.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-[#111827]">{transaction.campaign.title}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {transaction.campaign.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {paymentMethodIcons[transaction.paymentMethod]}
                      <span className="text-sm text-[#6B7280] capitalize">
                        {transaction.paymentMethod}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-[#111827]">
                      {transaction.amount.toLocaleString()} {transaction.currency}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[transaction.status].className}
                    >
                      {statusConfig[transaction.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {transaction.riskSignals.map((signal) => (
                        <div key={signal} title={signal}>
                          {riskSignalIcons[signal as keyof typeof riskSignalIcons]}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewTransaction(transaction);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Flag className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Receipt className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Refund</DropdownMenuItem>
                          <DropdownMenuItem>Flag Transaction</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                          <DropdownMenuItem>Open Donor Profile</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedTransaction && (
        <TransactionDetailDrawer
          transaction={selectedTransaction}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </AdminLayout>
  );
}
