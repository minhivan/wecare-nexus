import { useState } from "react";
import { Building2, ChevronDown, ChevronUp, ExternalLink, MoreVertical, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Payout } from "@/pages/Payouts";
import { format } from "date-fns";

interface PayoutTransactionStreamProps {
  payouts: Payout[];
  onSelectPayout: (payout: Payout) => void;
}

const statusColors = {
  pending: "bg-amber/10 text-amber border-amber/20",
  processing: "bg-cyan/10 text-cyan border-cyan/20",
  completed: "bg-emerald/10 text-emerald border-emerald/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
};

const groupPayoutsByWeek = (payouts: Payout[]) => {
  const now = new Date();
  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(now.getDate() - now.getDay());
  
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(thisWeekStart.getDate() - 7);

  const groups: Record<string, Payout[]> = {
    "This Week": [],
    "Last Week": [],
    "Earlier": [],
  };

  payouts.forEach((payout) => {
    const payoutDate = new Date(payout.date);
    if (payoutDate >= thisWeekStart) {
      groups["This Week"].push(payout);
    } else if (payoutDate >= lastWeekStart) {
      groups["Last Week"].push(payout);
    } else {
      groups["Earlier"].push(payout);
    }
  });

  return groups;
};

export const PayoutTransactionStream = ({ payouts, onSelectPayout }: PayoutTransactionStreamProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const groupedPayouts = groupPayoutsByWeek(payouts);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedPayouts).map(([period, periodPayouts]) => {
        if (periodPayouts.length === 0) return null;

        return (
          <div key={period} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {period}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
            </div>

            <div className="space-y-2">
              {periodPayouts.map((payout) => {
                const isExpanded = expandedIds.has(payout.id);

                return (
                  <Card
                    key={payout.id}
                    className="p-4 bg-card/50 border-border hover:bg-card/80 transition-all duration-200 cursor-pointer group"
                    onClick={() => toggleExpand(payout.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald/20 to-cyan/20 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-5 w-5 text-emerald" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground truncate">
                              {payout.recipient}
                            </p>
                            <Badge variant="outline" className={statusColors[payout.status]}>
                              {payout.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{payout.bankName} {payout.accountMask}</span>
                            <span>•</span>
                            <span>{payout.campaign}</span>
                            <span>•</span>
                            <span>{format(new Date(payout.date), "MMM dd, yyyy")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            ${payout.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">{payout.currency}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onSelectPayout(payout)}>
                                View Details
                              </DropdownMenuItem>
                              {payout.status === "failed" && (
                                <DropdownMenuItem>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Retry Payout
                                </DropdownMenuItem>
                              )}
                              {payout.confirmationLink && (
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Confirmation
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border space-y-2 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Reference ID</p>
                            <p className="font-mono text-foreground">{payout.referenceId}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Transaction Fee</p>
                            <p className="text-foreground">${payout.fee.toFixed(2)}</p>
                          </div>
                          {payout.processedBy && (
                            <div>
                              <p className="text-muted-foreground">Processed By</p>
                              <p className="text-foreground">{payout.processedBy}</p>
                            </div>
                          )}
                          {payout.confirmationLink && (
                            <div>
                              <p className="text-muted-foreground">Bank Confirmation</p>
                              <a href={payout.confirmationLink} className="text-cyan hover:underline flex items-center gap-1">
                                View Document <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {payouts.length === 0 && (
        <Card className="p-12 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No payouts found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or request a new payout
          </p>
        </Card>
      )}
    </div>
  );
};
