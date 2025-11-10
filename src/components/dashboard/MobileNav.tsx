import { LayoutDashboard, Heart, Users, DollarSign, BarChart3, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0C111A]/95 backdrop-blur-lg border-t border-white/[0.06]">
      <div className="flex items-center justify-around px-2 py-2">
        <NavLink
          to="/"
          end
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[#9CA3AF] transition-all duration-180"
          activeClassName="text-cyan bg-cyan/10"
        >
          <LayoutDashboard className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Overview</span>
        </NavLink>

        <NavLink
          to="/campaigns"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[#9CA3AF] transition-all duration-180"
          activeClassName="text-emerald bg-emerald/10"
        >
          <Heart className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Campaigns</span>
        </NavLink>

        <NavLink
          to="/community"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[#9CA3AF] transition-all duration-180"
          activeClassName="text-fire-orange bg-fire-orange/10"
        >
          <Users className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Community</span>
        </NavLink>

        <NavLink
          to="/donations"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[#9CA3AF] transition-all duration-180"
          activeClassName="text-amber bg-amber/10"
        >
          <DollarSign className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Donations</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[#9CA3AF] transition-all duration-180"
          activeClassName="text-secondary bg-secondary/10"
        >
          <BarChart3 className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Analytics</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[#9CA3AF] transition-all duration-180"
          activeClassName="text-[#E5E7EB] bg-muted/30"
        >
          <Settings className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};
