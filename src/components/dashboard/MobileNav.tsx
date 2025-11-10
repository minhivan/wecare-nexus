import {
  LayoutDashboard,
  Heart,
  Users,
  DollarSign,
  BarChart3,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const navItems = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Campaigns", href: "/campaigns", icon: Heart },
    { name: "Community", href: "/community", icon: Users },
    { name: "Donations", href: "/donations", icon: DollarSign },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111827] border-t border-[#1F2937] backdrop-blur-lg bg-opacity-95">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
            )}
            activeClassName="text-emerald font-medium"
          >
            <item.icon className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[10px]">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
