import { Plus, Download, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DonationsHeaderProps {
  view: "transactions" | "analytics";
  onViewChange: (view: "transactions" | "analytics") => void;
}

export const DonationsHeader = ({ view, onViewChange }: DonationsHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Donations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor all incoming contributions and donor activity across campaigns.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant={view === "analytics" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewChange(view === "analytics" ? "transactions" : "analytics")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {view === "analytics" ? "Transactions" : "Analytics View"}
          </Button>
          <Button size="sm" className="bg-emerald hover:bg-emerald/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Donation
          </Button>
        </div>
      </div>
    </div>
  );
};
