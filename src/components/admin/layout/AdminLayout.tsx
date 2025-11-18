import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <AdminSidebar />
      <div className="ml-[280px]">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
