import { X, CreditCard, AlertTriangle, MapPin, Smartphone, Download, Flag, ShieldCheck, User, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

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

interface TransactionDetailDrawerProps {
  transaction: Transaction;
  open: boolean;
  onClose: () => void;
}

const statusConfig = {
  successful: { label: "Successful", className: "bg-green-50 text-green-700 border-green-200" },
  pending: { label: "Pending", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  failed: { label: "Failed", className: "bg-red-50 text-red-700 border-red-200" },
  refunded: { label: "Refunded", className: "bg-gray-50 text-gray-700 border-gray-200" },
  flagged: { label: "Flagged", className: "bg-orange-50 text-orange-700 border-orange-200" },
};

const auditEvents = [
  { action: "Created", timestamp: "2024-01-15 14:32:01", user: "System" },
  { action: "Verified", timestamp: "2024-01-15 14:32:15", user: "Payment Gateway" },
  { action: "Completed", timestamp: "2024-01-15 14:32:20", user: "System" },
];

export function TransactionDetailDrawer({
  transaction,
  open,
  onClose,
}: TransactionDetailDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[460px] bg-white z-50 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Transaction Details</h2>
            <p className="text-sm text-[#6B7280] mt-0.5">{transaction.id}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Transaction Summary */}
          <section>
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Transaction Summary</h3>
            <div className="space-y-3 bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Transaction ID</p>
                  <p className="text-sm font-medium text-[#111827] mt-1">{transaction.id}</p>
                </div>
                <Badge
                  variant="outline"
                  className={statusConfig[transaction.status].className}
                >
                  {statusConfig[transaction.status].label}
                </Badge>
              </div>
              <Separator className="bg-[#E5E7EB]" />
              <div>
                <p className="text-sm text-[#6B7280]">Timestamp</p>
                <p className="text-sm font-medium text-[#111827] mt-1">{transaction.timestamp}</p>
              </div>
              <Separator className="bg-[#E5E7EB]" />
              <div>
                <p className="text-sm text-[#6B7280]">Donor</p>
                <p className="text-sm font-medium text-[#111827] mt-1">{transaction.donor.name}</p>
                <p className="text-sm text-[#6B7280] mt-0.5">{transaction.donor.email}</p>
              </div>
              <Separator className="bg-[#E5E7EB]" />
              <div>
                <p className="text-sm text-[#6B7280]">Campaign</p>
                <p className="text-sm font-medium text-[#111827] mt-1">{transaction.campaign.title}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {transaction.campaign.category}
                </Badge>
              </div>
              <Separator className="bg-[#E5E7EB]" />
              <div>
                <p className="text-sm text-[#6B7280]">Payment Method</p>
                <div className="flex items-center gap-2 mt-1">
                  <CreditCard className="h-4 w-4 text-[#6B7280]" />
                  <p className="text-sm font-medium text-[#111827] capitalize">
                    {transaction.paymentMethod}
                  </p>
                </div>
              </div>
              <Separator className="bg-[#E5E7EB]" />
              <div>
                <p className="text-sm text-[#6B7280]">Amount</p>
                <p className="text-lg font-semibold text-[#111827] mt-1">
                  {transaction.amount.toLocaleString()} {transaction.currency}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">
                  Fee: {(transaction.amount * 0.03).toLocaleString()} {transaction.currency}
                </p>
              </div>
            </div>
          </section>

          {/* Payment Metadata */}
          <section>
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Payment Metadata</h3>
            <div className="space-y-3 bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#6B7280]">Card Digits</p>
                  <p className="text-sm font-medium text-[#111827] mt-1">**** **** **** 4242</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Card Type</p>
                  <p className="text-sm font-medium text-[#111827] mt-1">Visa</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Issuing Country</p>
                  <p className="text-sm font-medium text-[#111827] mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Vietnam
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Device</p>
                  <p className="text-sm font-medium text-[#111827] mt-1 flex items-center gap-1">
                    <Smartphone className="h-3 w-3" />
                    Mobile
                  </p>
                </div>
              </div>
              <Separator className="bg-[#E5E7EB]" />
              <div>
                <p className="text-xs text-[#6B7280]">IP Address</p>
                <p className="text-sm font-medium text-[#111827] mt-1">192.168.1.100</p>
              </div>
              <Separator className="bg-[#E5E7EB]" />
              <div>
                <p className="text-xs text-[#6B7280]">Payment Provider Response</p>
                <p className="text-sm font-medium text-[#10B981] mt-1">Approved</p>
              </div>
              <Separator className="bg-[#E5E7EB]" />
              <div>
                <p className="text-xs text-[#6B7280]">Fraud Score</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-[#E5E7EB] rounded-full h-2">
                    <div className="bg-[#10B981] h-2 rounded-full" style={{ width: "15%" }} />
                  </div>
                  <p className="text-sm font-medium text-[#10B981]">Low (15%)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Signals */}
          {transaction.riskSignals.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                Risk Signals
              </h3>
              <div className="space-y-2">
                {transaction.riskSignals.map((signal, index) => (
                  <div
                    key={index}
                    className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-3 flex items-start gap-3"
                  >
                    <AlertTriangle className="h-4 w-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#9A3412] capitalize">{signal}</p>
                      <p className="text-xs text-[#9A3412] mt-1">
                        {signal === "velocity" && "Multiple transactions in short time period"}
                        {signal === "mismatch" && "Payment details mismatch detected"}
                        {signal === "region" && "Unusual transaction location"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Donor Notes */}
          <section>
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Donor Notes / Message</h3>
            <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
              <p className="text-sm text-[#6B7280] italic">
                "Hope this helps make a difference. Keep up the great work!"
              </p>
            </div>
          </section>

          {/* Audit Trail */}
          <section>
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Audit Trail</h3>
            <div className="space-y-3">
              {auditEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-[#2563EB]" />
                  </div>
                  <div className="flex-1 pb-3 border-b border-[#E5E7EB] last:border-0">
                    <p className="text-sm font-medium text-[#111827]">{event.action}</p>
                    <p className="text-xs text-[#6B7280] mt-1">{event.timestamp}</p>
                    <p className="text-xs text-[#6B7280]">by {event.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Admin Notes */}
          <section>
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Admin Notes</h3>
            <Textarea
              placeholder="Add admin note..."
              className="bg-white border-[#E5E7EB] min-h-[100px]"
            />
            <Button size="sm" className="mt-2 bg-[#2563EB] hover:bg-[#2563EB]/90">
              Add Note
            </Button>
          </section>
        </div>

        {/* Sticky Action Bar */}
        <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2 flex-1">
              <Download className="h-4 w-4" />
              Refund
            </Button>
            <Button variant="outline" size="sm" className="gap-2 flex-1">
              <Flag className="h-4 w-4" />
              Flag
            </Button>
            <Button variant="outline" size="sm" className="gap-2 flex-1">
              <ShieldCheck className="h-4 w-4" />
              Mark Safe
            </Button>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="gap-2 flex-1">
              <Download className="h-4 w-4" />
              Receipt
            </Button>
            <Button variant="outline" size="sm" className="gap-2 flex-1">
              <User className="h-4 w-4" />
              Donor
            </Button>
            <Button variant="outline" size="sm" className="gap-2 flex-1">
              <BarChart3 className="h-4 w-4" />
              Campaign
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
