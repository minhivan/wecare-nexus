import {
  LayoutDashboard,
  Heart,
  Users,
  Video,
  DollarSign,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  HelpCircle,
  Moon,
  Sun,
  User,
  LogOut,
  Building2,
  MessageSquare,
  Activity,
  FileText,
  PenTool,
  Calendar,
  Radio,
  Clock,
  CreditCard,
  Repeat,
  TrendingUp,
  Target,
  Shield,
  UserCog,
  Link as LinkIcon,
} from "lucide-react";
import wecareIcon from "@/assets/wecare-icon.png";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigationGroups = [
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Heart,
    accent: "emerald",
    items: [
      { name: "All Campaigns", href: "/campaigns", icon: Heart },
      { name: "Create New", href: "/campaigns/new", icon: Plus },
      { name: "Drafts", href: "/campaigns/drafts", icon: FileText },
      { name: "Templates", href: "/campaigns/templates", icon: PenTool },
    ],
  },
  {
    id: "community",
    label: "Community",
    icon: Users,
    accent: "fire-orange",
    dataTour: "community",
    items: [
      { name: "Donors", href: "/community/donors", icon: Users },
      { name: "Messages", href: "/community/messages", icon: MessageSquare },
      { name: "Comments", href: "/community/comments", icon: MessageSquare },
      { name: "Activities", href: "/community/activities", icon: Activity },
    ],
  },
  {
    id: "livestreams",
    label: "Livestreams",
    icon: Video,
    accent: "violet",
    items: [
      { name: "Schedule", href: "/livestreams/schedule", icon: Calendar },
      { name: "Stream Studio", href: "/livestreams/studio", icon: Radio },
      { name: "Past Streams", href: "/livestreams/past", icon: Clock },
    ],
  },
  {
    id: "donations",
    label: "Donations",
    icon: DollarSign,
    accent: "amber",
    items: [
      { name: "Transactions", href: "/donations/transactions", icon: CreditCard },
      { name: "Payouts", href: "/donations/payouts", icon: DollarSign },
      { name: "Recurring", href: "/donations/recurring", icon: Repeat },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    accent: "secondary",
    items: [
      { name: "Insights", href: "/analytics/insights", icon: TrendingUp },
      { name: "Trends", href: "/analytics/trends", icon: BarChart3 },
      { name: "Conversion", href: "/analytics/conversion", icon: Target },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    accent: "muted",
    items: [
      { name: "Profile", href: "/settings/profile", icon: User },
      { name: "Team", href: "/settings/team", icon: UserCog },
      { name: "Integrations", href: "/settings/integrations", icon: LinkIcon },
      { name: "Security", href: "/settings/security", icon: Shield },
    ],
  },
];

const accentColors: Record<string, string> = {
  cyan: "hover:bg-cyan/10 data-[active=true]:border-l-4 data-[active=true]:border-cyan data-[active=true]:bg-cyan/10",
  emerald: "hover:bg-emerald/10 data-[active=true]:border-l-4 data-[active=true]:border-emerald data-[active=true]:bg-emerald/10",
  "fire-orange": "hover:bg-fire-orange/10 data-[active=true]:border-l-4 data-[active=true]:border-fire-orange data-[active=true]:bg-fire-orange/10",
  violet: "hover:bg-violet/10 data-[active=true]:border-l-4 data-[active=true]:border-violet data-[active=true]:bg-violet/10",
  amber: "hover:bg-amber/10 data-[active=true]:border-l-4 data-[active=true]:border-amber data-[active=true]:bg-amber/10",
  secondary: "hover:bg-secondary/10 data-[active=true]:border-l-4 data-[active=true]:border-secondary data-[active=true]:bg-secondary/10",
  muted: "hover:bg-muted/30 data-[active=true]:border-l-4 data-[active=true]:border-muted-foreground data-[active=true]:bg-muted/30",
};

interface DashboardSidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export const DashboardSidebar = ({ collapsed, onCollapsedChange }: DashboardSidebarProps) => {
  const [openGroups, setOpenGroups] = useState<string[]>(["campaigns"]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  return (
    <aside
      data-tour="sidebar"
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-200 flex flex-col",
        "bg-gradient-to-b from-[#0C111A] to-[#101722] text-[#E5E7EB]",
        collapsed ? "w-20" : "w-[260px]"
      )}
      style={{
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Top Section - Brand & Quick Action */}
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          {!collapsed && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden shadow-md">
                      <img src={wecareIcon} alt="WeCare" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-bold bg-gradient-to-r from-violet to-pink bg-clip-text text-transparent block">
                        WeCare
                      </span>
                      <span className="text-[10px] text-[#9CA3AF]">Organization</span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Building2 className="mr-2 h-4 w-4" />
                  Organization Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Personal Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapsedChange(!collapsed)}
            className="h-8 w-8 text-[#E5E7EB] hover:bg-white/10"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Quick Create Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              data-tour="create-campaign"
              className={cn(
                "w-full bg-emerald hover:bg-emerald/90 text-white shadow-lg transition-all",
                "hover:shadow-emerald/25",
                collapsed && "px-0"
              )}
            >
              <Plus className="h-5 w-5" />
              {!collapsed && <span className="ml-2">Create</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              New Campaign
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              New Event
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Video className="mr-2 h-4 w-4" />
              New Livestream
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Core Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Overview - Single Link */}
        <NavLink
          to="/"
          end
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-180",
            "text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-cyan/10",
            collapsed && "justify-center"
          )}
          activeClassName="text-[#E5E7EB] font-semibold border-l-4 border-cyan bg-cyan/10"
        >
          <LayoutDashboard className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>Overview</span>}
        </NavLink>

        {/* Grouped Navigation */}
        {navigationGroups.map((group) => (
          <Collapsible
            key={group.id}
            open={openGroups.includes(group.id)}
            onOpenChange={() => toggleGroup(group.id)}
          >
            <CollapsibleTrigger
              data-tour={(group as any).dataTour}
              className={cn(
                "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-180",
                "text-[#E5E7EB] hover:bg-white/5",
                collapsed && "justify-center"
              )}
            >
              <group.icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left font-semibold">{group.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openGroups.includes(group.id) && "transform rotate-90"
                    )}
                  />
                </>
              )}
            </CollapsibleTrigger>

            {!collapsed && (
              <CollapsibleContent className="space-y-0.5 mt-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === "/"}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-180 ml-8",
                      "text-[#9CA3AF] hover:text-[#E5E7EB]",
                      accentColors[group.accent]
                    )}
                    activeClassName="text-[#E5E7EB] font-medium"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        ))}
      </nav>

      {/* Bottom Utility Zone */}
      <div className="border-t border-white/[0.06] p-3 space-y-2">
        {/* Command Search */}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-white/5",
            collapsed && "justify-center px-0"
          )}
        >
          <Search className="h-4 w-4" />
          {!collapsed && <span className="ml-2 text-xs">Search (⌘K)</span>}
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-white/5",
            collapsed && "justify-center px-0"
          )}
        >
          <HelpCircle className="h-4 w-4" />
          {!collapsed && <span className="ml-2 text-xs">Help</span>}
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={cn(
            "w-full justify-start text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-white/5",
            collapsed && "justify-center px-0"
          )}
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {!collapsed && <span className="ml-2 text-xs">Theme</span>}
        </Button>

        {/* User Menu */}
        {!collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-white/5 p-2 h-auto"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet to-pink text-white text-xs font-semibold">
                    AD
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs font-medium text-[#E5E7EB] truncate">Admin User</p>
                    <p className="text-[10px] text-[#9CA3AF] truncate">admin@wecare.org</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </aside>
  );
};
