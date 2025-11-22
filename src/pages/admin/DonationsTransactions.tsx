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

        {/* Metrics Overview Widgets */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Today's Volume</p>
                <p className="text-2xl font-semibold text-[#111827] mt-1">
                  875,000 VND
                </p>
                <p className="text-xs text-[#10B981] mt-1">+12.5% vs yesterday</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-[#2563EB]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Transactions</p>
                <p className="text-2xl font-semibold text-[#111827] mt-1">342</p>
                <p className="text-xs text-[#10B981] mt-1">+8.2% vs yesterday</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                <Receipt className="h-6 w-6 text-[#10B981]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Avg. Donation</p>
                <p className="text-2xl font-semibold text-[#111827] mt-1">
                  125,000 VND
                </p>
                <p className="text-xs text-[#6B7280] mt-1">↔ stable</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-[#F59E0B]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Failed</p>
                <p className="text-2xl font-semibold text-[#111827] mt-1">3</p>
                <p className="text-xs text-[#EF4444] mt-1">Needs attention</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-[#EF4444]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Flagged</p>
                <p className="text-2xl font-semibold text-[#111827] mt-1">1</p>
                <p className="text-xs text-[#F59E0B] mt-1">Review required</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                <Flag className="h-6 w-6 text-[#F59E0B]" />
              </div>
            </div>
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

        {/* Transactions Table - Compact & Intelligent */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                <TableHead className="text-[#6B7280] font-medium w-[35%]">Transaction & Donor</TableHead>
                <TableHead className="text-[#6B7280] font-medium w-[30%]">Campaign & Payment</TableHead>
                <TableHead className="text-[#6B7280] font-medium w-[15%]">Amount</TableHead>
                <TableHead className="text-[#6B7280] font-medium w-[20%]">Status & Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="hover:bg-[#F3F4F6] cursor-pointer transition-colors group relative"
                  onClick={() => handleViewTransaction(transaction)}
                >
                  <TableCell className="py-4">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="space-y-2">
                      {/* Transaction Info */}
                      <div className="flex items-center gap-2">
                        <div className="font-mono text-sm font-medium text-[#2563EB]">
                          {transaction.id}
                        </div>
                        <div className="text-xs text-[#6B7280]">
                          {transaction.timestamp}
                        </div>
                      </div>
                      {/* Donor Info */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-medium">
                          {transaction.donor.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-[#111827] text-sm">
                            {transaction.donor.name}
                          </div>
                          <div className="text-xs text-[#6B7280]">
                            {transaction.donor.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-2">
                      {/* Campaign Info */}
                      <div>
                        <div className="font-medium text-[#111827] text-sm line-clamp-1">
                          {transaction.campaign.title}
                        </div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {transaction.campaign.category}
                        </Badge>
                      </div>
                      {/* Payment Method */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#F3F4F6]">
                          {paymentMethodIcons[transaction.paymentMethod]}
                          <span className="text-xs text-[#6B7280] capitalize font-medium">
                            {transaction.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-[#111827] text-base">
                        {transaction.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-[#6B7280] font-medium">
                        {transaction.currency}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-2">
                      {/* Status Badge */}
                      <Badge
                        variant="outline"
                        className={statusConfig[transaction.status].className}
                      >
                        {statusConfig[transaction.status].label}
                      </Badge>
                      {/* Risk Signals & Quick Actions */}
                      <div className="flex items-center gap-2">
                        {transaction.riskSignals.length > 0 && (
                          <div className="flex items-center gap-1">
                            {transaction.riskSignals.map((signal) => (
                              <div key={signal} title={signal}>
                                {riskSignalIcons[signal as keyof typeof riskSignalIcons]}
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Quick Actions - appear on hover */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewTransaction(transaction);
                            }}
                            title="View Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={(e) => e.stopPropagation()}
                            title="Refund"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={(e) => e.stopPropagation()}
                            title="Flag"
                          >
                            <Flag className="h-3.5 w-3.5" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <MoreVertical className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                              <DropdownMenuItem>Open Donor Profile</DropdownMenuItem>
                              <DropdownMenuItem>Open Campaign</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
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
