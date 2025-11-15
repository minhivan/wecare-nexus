import { Heart, Megaphone, Building2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccountType } from "@/pages/Onboarding";

interface AccountTypeSelectorProps {
  selected: AccountType | null;
  onSelect: (type: AccountType) => void;
}

const accountTypes = [
  {
    type: "donor" as AccountType,
    icon: Heart,
    title: "Nhà hảo tâm cá nhân",
    description: "Ủng hộ các chiến dịch thiện nguyện",
    color: "from-[#4ECDC4] to-[#45b8b0]",
  },
  {
    type: "creator" as AccountType,
    icon: Megaphone,
    title: "Người tạo chiến dịch",
    description: "Khởi động chiến dịch gây quỹ riêng",
    color: "from-[#FF6B6B] to-[#ff5252]",
  },
  {
    type: "organization" as AccountType,
    icon: Building2,
    title: "Tổ chức / Doanh nghiệp",
    description: "Đơn vị pháp nhân có giấy phép",
    color: "from-[#FFE66D] to-[#ffd93d]",
  },
  {
    type: "community" as AccountType,
    icon: Users,
    title: "Nhóm cộng đồng / CLB",
    description: "Đội tình nguyện, cộng đồng địa phương",
    color: "from-[#A8E6CF] to-[#88d4ab]",
  },
];

export const AccountTypeSelector = ({ selected, onSelect }: AccountTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {accountTypes.map(({ type, icon: Icon, title, description, color }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={cn(
            "relative p-6 rounded-2xl border-2 transition-all duration-200 text-left",
            "hover:shadow-md hover:-translate-y-1",
            selected === type
              ? "border-[#4ECDC4] bg-[#4ECDC4]/5 shadow-sm"
              : "border-[#E5E7EB] bg-white hover:border-[#4ECDC4]/40"
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-xl bg-gradient-to-br", color)}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#111827] mb-1">{title}</h3>
              <p className="text-sm text-[#6B7280]">{description}</p>
            </div>
          </div>
          {selected === type && (
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#4ECDC4] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
