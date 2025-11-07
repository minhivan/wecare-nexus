import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Donation } from "@/pages/Donations";
import { cn } from "@/lib/utils";

interface TransactionStreamProps {
  donations: Donation[];
  onSelectDonation: (donation: Donation) => void;
}

export const TransactionStream = ({ donations, onSelectDonation }: TransactionStreamProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const groupedDonations = {
    today: donations.filter((d) => {
      const today = new Date();
      return d.date.toDateString() === today.toDateString();
    }),
    thisWeek: donations.filter((d) => {
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return d.date > weekAgo && d.date.toDateString() !== today.toDateString();
    }),
    earlier: donations.filter((d) => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return d.date <= weekAgo;
    }),
  };

  const statusColors = {
    completed: "bg-emerald/10 text-emerald border-emerald/20",
    pending: "bg-amber/10 text-amber border-amber/20",
    failed: "bg-destructive/10 text-destructive border-destructive/20",
    refunded: "bg-muted text-muted-foreground border-muted",
  };

  const renderDonationCard = (donation: Donation) => {
    const isExpanded = expandedId === donation.id;

    return (
      <div
        key={donation.id}
        className={cn(
          "p-4 rounded-xl backdrop-blur-sm border transition-all duration-200 hover:shadow-lg cursor-pointer",
          "bg-background/50 border-border/50",
          isExpanded && "ring-2 ring-primary/20 shadow-xl"
        )}
        onClick={() => onSelectDonation(donation)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-violet to-pink text-white text-sm">
                {donation.donor.avatar}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">{donation.donor.name}</h4>
                <Badge className={cn("text-xs", statusColors[donation.status])}>
                  {donation.status}
                </Badge>
                {donation.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{donation.donor.email}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-muted-foreground">
                  Campaign: <span className="text-foreground">{donation.campaign.name}</span>
                </span>
                <span className="text-muted-foreground">
                  {donation.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                {donation.currency === "USD" ? "$" : donation.currency}
                {donation.amount.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">{donation.type}</div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedId(isExpanded ? null : donation.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Resend Receipt</DropdownMenuItem>
                <DropdownMenuItem>Thank Donor</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Refund</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border/50 space-y-3 animate-in fade-in-50 duration-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="ml-2 text-foreground font-medium">{donation.paymentMethod}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Platform:</span>
                <span className="ml-2 text-foreground font-medium capitalize">{donation.platform}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="ml-2 text-foreground font-mono text-xs">{donation.transactionId}</span>
              </div>
              {donation.receiptLink && (
                <div>
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <a href={donation.receiptLink} target="_blank" rel="noopener noreferrer">
                      View Receipt <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {donation.message && (
              <div className="p-3 rounded-lg bg-muted/50 border border-border/30">
                <p className="text-sm text-muted-foreground italic">"{donation.message}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {groupedDonations.today.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Today
          </h3>
          <div className="space-y-3">
            {groupedDonations.today.map(renderDonationCard)}
          </div>
        </div>
      )}

      {groupedDonations.thisWeek.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            This Week
          </h3>
          <div className="space-y-3">
            {groupedDonations.thisWeek.map(renderDonationCard)}
          </div>
        </div>
      )}

      {groupedDonations.earlier.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Earlier
          </h3>
          <div className="space-y-3">
            {groupedDonations.earlier.map(renderDonationCard)}
          </div>
        </div>
      )}

      <Button variant="outline" className="w-full">
        Load Older Donations
      </Button>
    </div>
  );
};
