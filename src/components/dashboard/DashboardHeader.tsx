import {
  Search,
  Bell,
  RefreshCw,
  Moon,
  Sun,
  HelpCircle,
  User,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle2,
  WifiOff,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  sidebarCollapsed: boolean;
}

const breadcrumbMap: Record<string, string> = {
  "/": "Overview",
  "/campaigns": "Campaigns",
  "/campaigns/new": "Create New",
  "/campaigns/drafts": "Drafts",
  "/campaigns/templates": "Templates",
  "/community": "Community",
  "/community/donors": "Donors",
  "/community/messages": "Messages",
  "/livestreams": "Livestreams",
  "/donations": "Donations",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

const notifications = [
  {
    id: 1,
    title: "New donation received",
    description: "John Doe donated $500 to Clean Water 2025",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    title: "Campaign milestone reached",
    description: "Clean Water 2025 reached 75% of goal",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    title: "New comment on campaign",
    description: "Sarah left a comment on your campaign",
    time: "3h ago",
    unread: false,
  },
];

export const DashboardHeader = ({ sidebarCollapsed }: DashboardHeaderProps) => {
  const location = useLocation();
  const [syncStatus, setSyncStatus] = useState<"live" | "syncing" | "offline">("live");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = [
    { label: "WeCare", path: "/" },
    ...pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      return {
        label: breadcrumbMap[path] || segment,
        path,
      };
    }),
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getSyncIcon = () => {
    switch (syncStatus) {
      case "live":
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      case "syncing":
        return <Loader2 className="h-3.5 w-3.5 animate-spin" />;
      case "offline":
        return <WifiOff className="h-3.5 w-3.5" />;
    }
  };

  const getSyncColor = () => {
    switch (syncStatus) {
      case "live":
        return "bg-emerald/10 text-emerald border-emerald/20";
      case "syncing":
        return "bg-amber/10 text-amber border-amber/20";
      case "offline":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/50 glass">
      <div className="mx-auto max-w-[1360px] flex h-[72px] items-center justify-between px-6">
        {/* Left Zone - Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              )}
              <Link
                to={crumb.path}
                className={cn(
                  "transition-colors hover:text-foreground",
                  index === breadcrumbs.length - 1
                    ? "text-cyan font-medium"
                    : "text-muted-foreground"
                )}
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Center Zone - Command Palette */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.5}
            />
            <Input
              placeholder="Search or type a command..."
              className="w-full pl-9 pr-12 bg-muted/30 border-border/50 focus:border-cyan/50 transition-smooth"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Zone - Status & Utilities */}
        <div className="flex items-center gap-2">
          {/* Sync Status */}
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 px-2.5 py-1 text-xs font-medium transition-smooth",
              getSyncColor()
            )}
          >
            {getSyncIcon()}
            <span className="capitalize">{syncStatus}</span>
          </Badge>

          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" strokeWidth={1.5} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-fire-orange text-white text-[10px] font-semibold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>Stay updated with your latest activities</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 rounded-lg border transition-smooth hover:bg-muted/50 cursor-pointer",
                      notification.unread ? "bg-cyan/5 border-cyan/20" : "border-border"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="h-2 w-2 rounded-full bg-cyan ml-2 flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Sun className="h-5 w-5" strokeWidth={1.5} />
            )}
          </Button>

          {/* Help */}
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" strokeWidth={1.5} />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet to-pink text-white text-xs font-semibold">
                  AD
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@wecare.org</p>
              </div>
              <DropdownMenuSeparator />
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
        </div>
      </div>
    </header>
  );
};
