import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Megaphone,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  CreditCard,
  AlertTriangle,
  Bell,
  Webhook,
  FileText,
  Download,
  TrendingUp,
  Settings,
  UserCog,
  Sliders,
  Lock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavSection {
  label: string;
  items: {
    title: string;
    icon: any;
    href: string;
  }[];
}

const navigationSections: NavSection[] = [
  {
    label: "USERS",
    items: [
      { title: "User List", icon: Users, href: "/admin/users" },
      { title: "KYC Verification", icon: ShieldCheck, href: "/admin/verification" },
    ],
  },
  {
    label: "CAMPAIGNS",
    items: [
      { title: "Pending Review", icon: Clock, href: "/admin/campaigns/pending" },
      { title: "Active Campaigns", icon: CheckCircle2, href: "/admin/campaigns/active" },
      { title: "Rejected / Need Changes", icon: XCircle, href: "/admin/campaigns/rejected" },
    ],
  },
  {
    label: "DONATIONS",
    items: [
      { title: "Transactions", icon: DollarSign, href: "/admin/donations/transactions" },
      { title: "Failed Payments", icon: CreditCard, href: "/admin/donations/failed" },
      { title: "Suspicious Activity", icon: AlertTriangle, href: "/admin/donations/suspicious" },
    ],
  },
  {
    label: "ALERTS",
    items: [
      { title: "Fraud Alerts", icon: AlertTriangle, href: "/admin/alerts/fraud" },
      { title: "System Notifications", icon: Bell, href: "/admin/alerts/system" },
      { title: "Webhook Issues", icon: Webhook, href: "/admin/alerts/webhooks" },
    ],
  },
  {
    label: "REPORTS",
    items: [
      { title: "Export Data", icon: Download, href: "/admin/reports/export" },
      { title: "Donation Summary", icon: TrendingUp, href: "/admin/reports/donations" },
      { title: "Campaign Summary", icon: FileText, href: "/admin/reports/campaigns" },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { title: "Admin Profile", icon: UserCog, href: "/admin/settings/profile" },
      { title: "Platform Settings", icon: Sliders, href: "/admin/settings/platform" },
      { title: "Permissions", icon: Lock, href: "/admin/settings/permissions" },
    ],
  },
];

export const AdminSidebar = () => {
  const [openSections, setOpenSections] = useState<string[]>(
    navigationSections.map((section) => section.label)
  );

  const toggleSection = (label: string) => {
    setOpenSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-[#F0F0F0] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#44B9B0] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-[17px] font-semibold text-gray-900 tracking-tight">
              WeCare Admin
            </h1>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">
              Control Center
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Link */}
      <div className="px-5 mb-7">
        <NavLink
          to="/admin"
          end
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#F7F7F7] transition-all duration-200 group"
          activeClassName="bg-[#EFFFFC] text-[#4ECDC4] border-l-[3px] border-[#4ECDC4] -ml-[3px] pl-[19px]"
        >
          <LayoutDashboard className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" strokeWidth={1.5} />
          <span className="text-[15px] font-medium">Dashboard</span>
        </NavLink>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-5 space-y-7">
        {navigationSections.map((section) => {
          const isOpen = openSections.includes(section.label);
          return (
            <Collapsible
              key={section.label}
              open={isOpen}
              onOpenChange={() => toggleSection(section.label)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors duration-200">
                <span>{section.label}</span>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#F7F7F7] transition-all duration-200 group"
                    activeClassName="bg-[#EFFFFC] text-[#4ECDC4] border-l-[3px] border-[#4ECDC4] -ml-[3px] pl-[19px]"
                  >
                    <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" strokeWidth={1.5} />
                    <span className="text-[15px] font-medium">{item.title}</span>
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-5 pt-6 border-t border-[#F0F0F0]">
        <div className="px-4 py-3 bg-[#F9FAFB] rounded-xl">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-1">
            Admin Session
          </p>
          <p className="text-[13px] text-gray-600 font-medium">admin@wecare.com</p>
        </div>
      </div>
    </aside>
  );
};
