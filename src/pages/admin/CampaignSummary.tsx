import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit3,
  User,
  RefreshCw,
  Download,
  MoreHorizontal,
  Pause,
  Flag,
  MessageSquare,
  DollarSign,
  Archive,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  Shield,
  FileText,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data
const campaignData = {
  id: "camp_001",
  title: "Building Hope School in Rural Vietnam",
  tagline: "Education infrastructure for 500 children in remote areas",
  creator: {
    name: "Hope Foundation",
    email: "contact@hopefoundation.org",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=HF",
    type: "Organization",
  },
  coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
  category: "Education",
  country: "Vietnam",
  tags: ["Education", "Infrastructure", "Children"],
  startDate: "2024-01-15",
  endDate: "2024-12-31",
  goal: 150000,
  raised: 98750,
  currency: "USD",
  status: "Live",
  totalDonors: 1247,
  newDonors: 89,
  returningDonors: 1158,
  conversion: 12.4,
  riskLevel: "Low",
};

const metricsData = {
  totalDonations: 98750,
  deltaDonations: 12.5,
  activeDonors: 1247,
  deltaDonors: 8.3,
  conversion: 12.4,
  deltaConversion: -2.1,
};

const donationTimelineData = [
  { date: "Mon", amount: 12000 },
  { date: "Tue", amount: 15000 },
  { date: "Wed", amount: 18000, event: "Creator Update" },
  { date: "Thu", amount: 14000 },
  { date: "Fri", amount: 22000, event: "Livestream" },
  { date: "Sat", amount: 19000 },
  { date: "Sun", amount: 16000 },
];

const trafficSourcesData = [
  { name: "Social", value: 45, color: "#2563EB" },
  { name: "Direct", value: 30, color: "#10B981" },
  { name: "Email", value: 15, color: "#F59E0B" },
  { name: "Livestream", value: 10, color: "#EF4444" },
];

const recentTransactions = [
  {
    id: "txn_001",
    donor: "Nguyen Van A",
    amount: 500,
    method: "Card",
    status: "Success",
    timestamp: "2 hours ago",
  },
  {
    id: "txn_002",
    donor: "Tran Thi B",
    amount: 1000,
    method: "Momo",
    status: "Success",
    timestamp: "3 hours ago",
  },
  {
    id: "txn_003",
    donor: "Le Van C",
    amount: 250,
    method: "Bank",
    status: "Pending",
    timestamp: "5 hours ago",
  },
  {
    id: "txn_004",
    donor: "Pham Thi D",
    amount: 2000,
    method: "Card",
    status: "Success",
    timestamp: "6 hours ago",
  },
];

const adminLogs = [
  {
    id: "log_001",
    action: "Campaign Approved",
    user: "Admin John",
    timestamp: "2024-01-15 10:00",
    type: "approval",
  },
  {
    id: "log_002",
    action: "Note Added: Verified organization documents",
    user: "Admin Sarah",
    timestamp: "2024-01-14 15:30",
    type: "note",
  },
  {
    id: "log_003",
    action: "Risk Assessment: Low",
    user: "System",
    timestamp: "2024-01-14 14:00",
    type: "system",
  },
  {
    id: "log_004",
    action: "Campaign Created",
    user: "Hope Foundation",
    timestamp: "2024-01-14 09:00",
    type: "creation",
  },
];

export default function CampaignSummary() {
  const [note, setNote] = useState("");
  const [activeTab, setActiveTab] = useState("24h");

  const percentReached = (campaignData.raised / campaignData.goal) * 100;
  const daysRemaining = Math.ceil(
    (new Date(campaignData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <AdminLayout>
      <div className="h-full overflow-auto bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="max-w-[1360px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Campaign Summary – {campaignData.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Overview of performance, compliance, risk, and operational activity.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Campaign
                </Button>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Creator Profile
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto px-6 py-6 space-y-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                    <p className="text-3xl font-semibold mt-2">
                      ${metricsData.totalDonations.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">
                        +{metricsData.deltaDonations}%
                      </span>
                      <span className="text-sm text-muted-foreground">vs last period</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Donors</p>
                    <p className="text-3xl font-semibold mt-2">{metricsData.activeDonors}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">
                        +{metricsData.deltaDonors}%
                      </span>
                      <span className="text-sm text-muted-foreground">7d trend</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-cyan/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-cyan" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conversion</p>
                    <p className="text-3xl font-semibold mt-2">{metricsData.conversion}%</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingDown className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">
                        {metricsData.deltaConversion}%
                      </span>
                      <span className="text-sm text-muted-foreground">vs last period</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-amber/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-amber" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Campaign Status</p>
                    <Badge className="mt-2 bg-success/10 text-success hover:bg-success/20">
                      {campaignData.status}
                    </Badge>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{daysRemaining} days left</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Snapshot Block */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <img
                    src={campaignData.coverImage}
                    alt="Campaign cover"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{campaignData.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{campaignData.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={campaignData.creator.avatar}
                      alt={campaignData.creator.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{campaignData.creator.name}</p>
                      <p className="text-xs text-muted-foreground">{campaignData.creator.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{campaignData.category}</Badge>
                    <Badge variant="secondary">{campaignData.country}</Badge>
                    {campaignData.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium">{campaignData.startDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium">{campaignData.endDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Goal Amount</p>
                      <p className="font-medium">
                        ${campaignData.goal.toLocaleString()} {campaignData.currency}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount Raised</p>
                      <p className="font-medium text-success">
                        ${campaignData.raised.toLocaleString()} ({percentReached.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Operational Flags</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span className="text-sm">Risk Level: Low</span>
                        </div>
                        <Badge className="bg-success/10 text-success hover:bg-success/20">Clear</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">No pending review items</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-success" />
                          <span className="text-sm">Compliance: Complete</span>
                        </div>
                        <Badge className="bg-success/10 text-success hover:bg-success/20">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-semibold mb-3">Status Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Campaign
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Flag className="h-4 w-4 mr-2" />
                        Mark as Flagged
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Escalate to Compliance
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Section */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Donation Timeline</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={activeTab === "24h" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("24h")}
                    >
                      24h
                    </Button>
                    <Button
                      variant={activeTab === "7d" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("7d")}
                    >
                      7d
                    </Button>
                    <Button
                      variant={activeTab === "30d" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("30d")}
                    >
                      30d
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={donationTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#2563EB"
                      strokeWidth={2}
                      dot={{ fill: "#2563EB", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={trafficSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {trafficSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {trafficSourcesData.map((source) => (
                    <div key={source.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="text-sm">{source.name}</span>
                      </div>
                      <span className="text-sm font-medium">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donor Segmentation */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Donor Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>New Donors</span>
                      <span className="font-medium">{campaignData.newDonors}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(campaignData.newDonors / campaignData.totalDonors) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Returning Donors</span>
                      <span className="font-medium">{campaignData.returningDonors}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-success"
                        style={{
                          width: `${(campaignData.returningDonors / campaignData.totalDonors) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vietnam</span>
                    <span className="text-sm font-medium">62%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">United States</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Singapore</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Others</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mobile</span>
                    <span className="text-sm font-medium">58%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Desktop</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tablet</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Total Collected</p>
                  <p className="text-2xl font-semibold mt-1">
                    ${campaignData.raised.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net After Fees</p>
                  <p className="text-2xl font-semibold mt-1 text-success">
                    ${(campaignData.raised * 0.95).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">5% platform + payment fees</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Payouts</p>
                  <p className="text-2xl font-semibold mt-1 text-amber">$2,500</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h4 className="text-sm font-semibold mb-3">Recent Transactions</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">
                          Donor
                        </th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">
                          Amount
                        </th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">
                          Method
                        </th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">
                          Status
                        </th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((txn) => (
                        <tr key={txn.id} className="border-t hover:bg-muted/50">
                          <td className="p-3 text-sm">{txn.donor}</td>
                          <td className="p-3 text-sm font-medium">${txn.amount}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{txn.method}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={txn.status === "Success" ? "default" : "secondary"}
                              className={
                                txn.status === "Success"
                                  ? "bg-success/10 text-success hover:bg-success/20"
                                  : ""
                              }
                            >
                              {txn.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{txn.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Financial Flags
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm">No chargeback risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm">Normal velocity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm">No bot indicators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm">Anonymous donations within limits</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Verification */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Content & Compliance Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm">Mission Statement Quality</span>
                    </div>
                    <Badge className="bg-success/10 text-success hover:bg-success/20">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm">Media Quality</span>
                    </div>
                    <Badge className="bg-success/10 text-success hover:bg-success/20">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm">Legitimacy Indicators</span>
                    </div>
                    <Badge className="bg-success/10 text-success hover:bg-success/20">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm">Required Documents</span>
                    </div>
                    <Badge className="bg-success/10 text-success hover:bg-success/20">Complete</Badge>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="text-sm font-semibold mb-3">KYB Verification</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Organization Status</span>
                      <Badge className="bg-success/10 text-success hover:bg-success/20">Verified</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Business License</span>
                      <Button variant="link" className="h-auto p-0 text-primary">
                        View Document
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tax ID</span>
                      <Button variant="link" className="h-auto p-0 text-primary">
                        View Document
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk & Fraud Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-4 bg-success/10 rounded-lg border-l-4 border-success">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-success" />
                    <span className="font-semibold text-success">Low Risk Profile</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All indicators show normal behavior patterns
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Device/IP Anomalies</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">Clear</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Multiple Accounts</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">Clear</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suspicious Text Patterns</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">Clear</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Velocity Anomalies</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">Normal</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Flagged Comments</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">None</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operational History */}
          <Card>
            <CardHeader>
              <CardTitle>Operational History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminLogs.map((log) => (
                  <div key={log.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          log.type === "approval"
                            ? "bg-success/10"
                            : log.type === "note"
                              ? "bg-primary/10"
                              : log.type === "system"
                                ? "bg-amber/10"
                                : "bg-muted"
                        }`}
                      >
                        {log.type === "approval" ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : log.type === "note" ? (
                          <FileText className="h-4 w-4 text-primary" />
                        ) : log.type === "system" ? (
                          <Shield className="h-4 w-4 text-amber" />
                        ) : (
                          <Activity className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      {log.id !== "log_004" && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium">{log.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{log.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes & Internal Communication */}
          <Card>
            <CardHeader>
              <CardTitle>Notes & Internal Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add internal note or comment... Use @ to mention team members"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end mt-3">
                <Button>Add Note</Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <img
                      src="https://api.dicebear.com/7.x/initials/svg?seed=AS"
                      alt="Admin"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Admin Sarah</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Verified all organization documents. Everything looks legitimate and properly
                        registered.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 bg-background border-t border-border shadow-lg">
          <div className="max-w-[1360px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Campaign
                </Button>
                <Button variant="outline">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag Campaign
                </Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Creator
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Issue Refunds
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="destructive">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
