import { ReactNode, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/30">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
      <div className={cn(
        "transition-all duration-200",
        "ml-0 md:ml-20 lg:ml-[260px]",
        sidebarCollapsed ? "lg:ml-20" : "lg:ml-[260px]"
      )}>
        <DashboardHeader sidebarCollapsed={sidebarCollapsed} />
        <main className="mx-auto max-w-[1360px] p-4 sm:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
};
