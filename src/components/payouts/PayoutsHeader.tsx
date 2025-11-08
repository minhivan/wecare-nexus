import { Download, Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PayoutsHeaderProps {
  view: "transactions" | "scheduled" | "accounts";
  onViewChange: (view: "transactions" | "scheduled" | "accounts") => void;
  onRequestPayout: () => void;
}

export const PayoutsHeader = ({ view, onViewChange, onRequestPayout }: PayoutsHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payouts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage your fund withdrawals and settlement history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Building2 className="h-4 w-4 mr-2" />
            Bank Accounts
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="bg-emerald hover:bg-emerald/90 text-white shadow-lg hover:shadow-emerald/25"
            onClick={onRequestPayout}
          >
            <Plus className="h-4 w-4 mr-2" />
            Request Payout
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by reference, campaign, or recipient..."
            className="bg-card/50 border-border"
          />
        </div>
        <Select value={view} onValueChange={(v: any) => onViewChange(v)}>
          <SelectTrigger className="w-[180px] bg-card/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transactions">Transactions</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="accounts">Accounts</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
