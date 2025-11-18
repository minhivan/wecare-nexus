import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";

export default function UserList() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              User List
            </h1>
            <p className="text-gray-500 mt-2">Manage all registered users</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        <Card className="p-6 border-[#F0F0F0]">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users by name, email, or ID..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#44B9B0] flex items-center justify-center text-white font-medium">
                    U{i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">User #{1000 + i}</p>
                    <p className="text-sm text-gray-500">user{i + 1}@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-[#EFFFFC] text-[#4ECDC4] text-xs font-medium rounded-full">
                    Verified
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
