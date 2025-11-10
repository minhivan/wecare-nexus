import { ReactNode, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/30">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
      <div className={cn("transition-all duration-200", sidebarCollapsed ? "ml-20" : "ml-[260px]")}>
        <DashboardHeader sidebarCollapsed={sidebarCollapsed} />
        <main className="mx-auto max-w-[1360px] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
