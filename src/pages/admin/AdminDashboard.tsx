import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Megaphone, 
  DollarSign, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  CreditCard,
  Webhook,
  Shield,
  Flag,
  Activity,
  ExternalLink,
  ArrowUpRight,
  Search,
  Bell,
  FileText,
  RefreshCw,
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const kpis = [
    {
      label: "KYC Pending",
      value: "28",
      icon: Users,
      color: "#FFE66D",
      bgColor: "#FFF9E6",
    },
    {
      label: "Campaigns Pending",
      value: "15",
      icon: Megaphone,
      color: "#FFE66D",
      bgColor: "#FFF9E6",
    },
    {
      label: "Donations Today",
      value: "$24.8K",
      icon: DollarSign,
      color: "#4ECDC4",
      bgColor: "#E6FFFC",
    },
    {
      label: "Payment Failures",
      value: "3",
      icon: CreditCard,
      color: "#FF6B6B",
      bgColor: "#FFE5E5",
    },
    {
      label: "Fraud Alerts",
      value: "2",
      icon: Shield,
      color: "#FF6B6B",
      bgColor: "#FFE5E5",
    },
  ];

  const kycQueue = [
    { id: 1, name: "Nguyễn Văn A", type: "Individual", time: "5 mins ago", risk: "low", avatar: "NA" },
    { id: 2, name: "Công ty TNHH ABC", type: "Organization", time: "12 mins ago", risk: "medium", avatar: "CA" },
    { id: 3, name: "Trần Thị B", type: "Individual", time: "1 hour ago", risk: "low", avatar: "TB" },
    { id: 4, name: "Quỹ từ thiện XYZ", type: "Organization", time: "2 hours ago", risk: "high", avatar: "QX" },
    { id: 5, name: "Lê Văn C", type: "Individual", time: "3 hours ago", risk: "low", avatar: "LC" },
  ];

  const campaignQueue = [
    { id: 1, title: "Help Children in Need", creator: "Nguyễn A", time: "10 mins ago", thumbnail: "🎯" },
    { id: 2, title: "Medical Emergency Fund", creator: "Trần B", time: "45 mins ago", thumbnail: "🏥" },
    { id: 3, title: "School Building Project", creator: "Lê C", time: "1 hour ago", thumbnail: "🏫" },
    { id: 4, title: "Disaster Relief Support", creator: "Phạm D", time: "2 hours ago", thumbnail: "🌊" },
    { id: 5, title: "Animal Rescue Center", creator: "Hoàng E", time: "4 hours ago", thumbnail: "🐾" },
  ];

  const donations = [
    { id: 1, donor: "Anonymous", amount: "$500", campaign: "Medical Fund", method: "card", status: "success", time: "Just now" },
    { id: 2, donor: "Nguyễn Văn A", amount: "$200", campaign: "School Project", method: "bank", status: "success", time: "2 mins ago" },
    { id: 3, donor: "Trần Thị B", amount: "$1,000", campaign: "Disaster Relief", method: "card", status: "pending", time: "5 mins ago" },
    { id: 4, donor: "Anonymous", amount: "$150", campaign: "Animal Rescue", method: "momo", status: "success", time: "8 mins ago" },
    { id: 5, donor: "Lê Văn C", amount: "$750", campaign: "Children Fund", method: "card", status: "failed", time: "12 mins ago" },
  ];

  const alerts = [
    { severity: "high", type: "Fraud", title: "Duplicate donation pattern detected", description: "User #2453 made 15 donations in 2 minutes", icon: Shield },
    { severity: "medium", type: "Report", title: "Campaign reported by 3 users", description: "Campaign #5821 flagged for misleading content", icon: Flag },
    { severity: "low", type: "System", title: "Payment gateway latency spike", description: "Stripe response time increased to 2.3s", icon: Activity },
  ];

  const topCampaigns = [
    { title: "Medical Emergency Fund", progress: 85, raised: "$42,500", target: "$50,000", trend: "+12%", image: "🏥" },
    { title: "School Building Project", progress: 67, raised: "$33,500", target: "$50,000", trend: "+8%", image: "🏫" },
    { title: "Disaster Relief Support", progress: 92, raised: "$91,800", target: "$100,000", trend: "+15%", image: "🌊" },
  ];

  const quickActions = [
    { label: "KYC Center", icon: Users, color: "#4ECDC4" },
    { label: "Campaign Reviews", icon: Megaphone, color: "#FFE66D" },
    { label: "Failed Payments", icon: CreditCard, color: "#FF6B6B" },
    { label: "Retry Webhooks", icon: RefreshCw, color: "#4ECDC4" },
    { label: "Export Summary", icon: Download, color: "#FFE66D" },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-[#FFE5E5] text-[#FF6B6B]";
      case "medium": return "bg-[#FFF9E6] text-[#FFE66D]";
      default: return "bg-[#E6FFFC] text-[#4ECDC4]";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-[#4ECDC4]";
      case "failed": return "text-[#FF6B6B]";
      default: return "text-[#FFE66D]";
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Operations Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time platform monitoring and control
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users, campaigns..."
              className="pl-10 pr-4 py-2 w-[280px] rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#FF6B6B]" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#4ECDC4]/10 text-[#4ECDC4]">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-6 border-border hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {kpi.label}
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {kpi.value}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: kpi.bgColor }}
              >
                <kpi.icon className="w-6 h-6" style={{ color: kpi.color }} strokeWidth={1.5} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content: Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (70%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Required: Review Queues */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KYC Review Queue */}
            <Card className="p-6 border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">KYC Review Queue</h2>
                <Badge variant="secondary" className="bg-[#FFF9E6] text-[#FFE66D] hover:bg-[#FFF9E6]">
                  {kycQueue.length} pending
                </Badge>
              </div>
              <div className="space-y-3">
                {kycQueue.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-xs">{item.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{item.type}</span>
                        <span className="text-xs text-muted-foreground">• {item.time}</span>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getRiskColor(item.risk)}`}>
                      {item.risk}
                    </Badge>
                    <Button size="sm" variant="ghost" className="h-8">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Campaign Review Queue */}
            <Card className="p-6 border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Campaign Review Queue</h2>
                <Badge variant="secondary" className="bg-[#FFF9E6] text-[#FFE66D] hover:bg-[#FFF9E6]">
                  {campaignQueue.length} pending
                </Badge>
              </div>
              <div className="space-y-3">
                {campaignQueue.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xl">
                      {item.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{item.creator}</span>
                        <span className="text-xs text-muted-foreground">• {item.time}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Financial Monitor: Donation Timeline */}
          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Real-Time Donations</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span>Live</span>
              </div>
            </div>
            <div className="space-y-2">
              {donations.map((donation, index) => (
                <div 
                  key={donation.id} 
                  className={`flex items-center justify-between p-4 rounded-xl border border-border transition-all duration-300 ${
                    index === 0 ? 'bg-[#E6FFFC] border-[#4ECDC4]/30 animate-fade-in' : 'bg-background'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{donation.donor}</span>
                      <span className="text-xs text-muted-foreground">{donation.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs">
                      {donation.campaign}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {donation.method === "card" && <CreditCard className="h-4 w-4 text-muted-foreground" />}
                      {donation.method === "bank" && <DollarSign className="h-4 w-4 text-muted-foreground" />}
                      {donation.method === "momo" && <Webhook className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <span className="text-sm font-semibold text-foreground min-w-[70px] text-right">
                      {donation.amount}
                    </span>
                    {donation.status === "success" && <CheckCircle2 className={`h-5 w-5 ${getStatusColor(donation.status)}`} />}
                    {donation.status === "pending" && <Clock className={`h-5 w-5 ${getStatusColor(donation.status)}`} />}
                    {donation.status === "failed" && <AlertTriangle className={`h-5 w-5 ${getStatusColor(donation.status)}`} />}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (30%) */}
        <div className="space-y-6">
          {/* Alerts & Risk Panel */}
          <Card className="p-6 border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Alerts & Risks</h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      alert.severity === "high" ? "bg-[#FFE5E5]" : 
                      alert.severity === "medium" ? "bg-[#FFF9E6]" : "bg-[#E6FFFC]"
                    }`}>
                      <alert.icon className={`h-5 w-5 ${
                        alert.severity === "high" ? "text-[#FF6B6B]" : 
                        alert.severity === "medium" ? "text-[#FFE66D]" : "text-[#4ECDC4]"
                      }`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                        <Badge className={`text-xs ${
                          alert.severity === "high" ? "bg-[#FFE5E5] text-[#FF6B6B]" :
                          alert.severity === "medium" ? "bg-[#FFF9E6] text-[#FFE66D]" : 
                          "bg-[#E6FFFC] text-[#4ECDC4]"
                        }`}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        Investigate <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Active Campaigns */}
          <Card className="p-6 border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Top Active Campaigns</h2>
            <div className="space-y-4">
              {topCampaigns.map((campaign, index) => (
                <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-border">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shadow-sm">
                      {campaign.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{campaign.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{campaign.raised} / {campaign.target}</span>
                        <Badge className="bg-[#E6FFFC] text-[#4ECDC4] text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {campaign.trend}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">{campaign.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#4ECDC4] to-[#44B9B0] transition-all duration-500"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="p-6 border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-all duration-200 hover:scale-105 flex flex-col items-center gap-2 text-center"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <action.icon className="h-5 w-5" style={{ color: action.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
