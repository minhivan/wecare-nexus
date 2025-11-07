import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const donations = [
  {
    id: 1,
    donor: "Sarah Johnson",
    email: "sarah.j@email.com",
    amount: "$1,250",
    campaign: "Education for All",
    status: "completed",
    date: "2 hours ago",
  },
  {
    id: 2,
    donor: "Michael Chen",
    email: "m.chen@email.com",
    amount: "$500",
    campaign: "Medical Relief",
    status: "completed",
    date: "5 hours ago",
  },
  {
    id: 3,
    donor: "Emily Davis",
    email: "emily.d@email.com",
    amount: "$2,000",
    campaign: "Clean Water Project",
    status: "processing",
    date: "1 day ago",
  },
  {
    id: 4,
    donor: "James Wilson",
    email: "j.wilson@email.com",
    amount: "$750",
    campaign: "Community Kitchen",
    status: "completed",
    date: "1 day ago",
  },
  {
    id: 5,
    donor: "Lisa Anderson",
    email: "lisa.a@email.com",
    amount: "$3,500",
    campaign: "Emergency Response",
    status: "completed",
    date: "2 days ago",
  },
];

export const RecentDonations = () => {
  return (
    <div className="glass rounded-xl p-6 animate-slide-up">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Donations</h3>
          <p className="text-sm text-muted-foreground">Latest contributions from donors</p>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Donor</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id} className="border-border">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {donation.donor.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{donation.donor}</p>
                      <p className="text-xs text-muted-foreground">{donation.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{donation.campaign}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold">{donation.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={donation.status === "completed" ? "default" : "secondary"}
                    className={
                      donation.status === "completed"
                        ? "bg-emerald/10 text-emerald hover:bg-emerald/20"
                        : ""
                    }
                  >
                    {donation.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {donation.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
