import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Users, Megaphone, DollarSign, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Users",
      value: "12,483",
      change: "+12.5%",
      icon: Users,
      color: "#4ECDC4",
    },
    {
      label: "Active Campaigns",
      value: "342",
      change: "+8.2%",
      icon: Megaphone,
      color: "#FFE66D",
    },
    {
      label: "Total Donations",
      value: "$1.2M",
      change: "+23.1%",
      icon: DollarSign,
      color: "#44B9B0",
    },
    {
      label: "Pending Reviews",
      value: "28",
      change: "-5.3%",
      icon: AlertTriangle,
      color: "#FF6B6B",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-2">
            Monitor and manage your platform at a glance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="p-6 hover:shadow-lg transition-shadow duration-200 border-[#F0F0F0]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-2 font-medium ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon
                    className="w-6 h-6"
                    style={{ color: stat.color }}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border-[#F0F0F0]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent KYC Submissions
            </h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F7F7F7] transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">User #{1000 + i}</p>
                    <p className="text-sm text-gray-500">Submitted 2 hours ago</p>
                  </div>
                  <span className="px-3 py-1 bg-[#FFF3CD] text-[#FBC02D] text-xs font-medium rounded-full">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-[#F0F0F0]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Campaign Reviews Needed
            </h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F7F7F7] transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">Campaign #{5000 + i}</p>
                    <p className="text-sm text-gray-500">Awaiting approval</p>
                  </div>
                  <span className="px-3 py-1 bg-[#FFE5E5] text-[#FF6B6B] text-xs font-medium rounded-full">
                    Review
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
