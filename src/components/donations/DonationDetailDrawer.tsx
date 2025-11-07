import { X, ExternalLink, Mail, MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Donation } from "@/pages/Donations";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface DonationDetailDrawerProps {
  donation: Donation | null;
  open: boolean;
  onClose: () => void;
}

export const DonationDetailDrawer = ({ donation, open, onClose }: DonationDetailDrawerProps) => {
  if (!donation) return null;

  const statusColors = {
    completed: "bg-emerald/10 text-emerald border-emerald/20",
    pending: "bg-amber/10 text-amber border-amber/20",
    failed: "bg-destructive/10 text-destructive border-destructive/20",
    refunded: "bg-muted text-muted-foreground border-muted",
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-br from-violet to-pink text-white">
                  {donation.donor.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-xl">{donation.donor.name}</SheetTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={cn("text-xs", statusColors[donation.status])}>
                    {donation.status}
                  </Badge>
                  {donation.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                ${donation.amount.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground capitalize">{donation.type}</div>
            </div>
          </div>
        </SheetHeader>

        <Separator className="my-6" />

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="donor">Donor</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="text-foreground font-medium">
                  {donation.date.toLocaleDateString()} at {donation.date.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="text-foreground font-mono text-xs">{donation.transactionId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Currency</span>
                <span className="text-foreground font-medium">{donation.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="text-foreground font-medium">{donation.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform</span>
                <span className="text-foreground font-medium capitalize">{donation.platform}</span>
              </div>
              <div className="flex justify-between text-sm items-start">
                <span className="text-muted-foreground">Campaign</span>
                <Button variant="link" className="h-auto p-0 text-primary" asChild>
                  <a href={`/campaigns/${donation.campaign.id}`}>
                    {donation.campaign.name} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
              {donation.receiptLink && (
                <div className="flex justify-between text-sm items-start">
                  <span className="text-muted-foreground">Receipt</span>
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <a href={donation.receiptLink} target="_blank" rel="noopener noreferrer">
                      View Receipt <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {donation.message && (
              <div className="mt-6">
                <Label className="text-sm font-semibold">Donor Message</Label>
                <div className="mt-2 p-4 rounded-lg bg-muted/50 border border-border/30">
                  <p className="text-sm text-foreground italic">"{donation.message}"</p>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Resend Receipt
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Send Thank You Message
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Refund Donation
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="donor" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{donation.donor.email}</span>
                </div>
              </div>

              {donation.donor.location && (
                <div>
                  <Label className="text-sm text-muted-foreground">Location</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{donation.donor.location}</span>
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <Label className="text-sm text-muted-foreground">Donation History</Label>
                <div className="mt-2 p-4 rounded-lg bg-gradient-to-br from-emerald/10 to-cyan/10 border border-border/50">
                  <div className="text-2xl font-bold text-foreground">
                    {donation.donor.totalDonations}
                  </div>
                  <div className="text-sm text-muted-foreground">Total donations made</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <p className="text-xs text-muted-foreground">
                  This donor has been supporting campaigns since{" "}
                  {new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4 mt-6">
            <div>
              <Label htmlFor="admin-notes">Admin Notes</Label>
              <Textarea
                id="admin-notes"
                placeholder="Add internal notes about this donation..."
                className="mt-2 min-h-[200px]"
              />
              <Button className="mt-3">Save Notes</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile Preview Card */}
        <div className="mt-8">
          <Label className="text-sm font-semibold">Campaign Preview</Label>
          <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-background to-muted/30 border border-border/50">
            <div className="aspect-video bg-gradient-to-br from-violet to-pink rounded-lg mb-3" />
            <h4 className="font-semibold text-foreground">{donation.campaign.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Donated ${donation.amount} on {donation.date.toLocaleDateString()}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
