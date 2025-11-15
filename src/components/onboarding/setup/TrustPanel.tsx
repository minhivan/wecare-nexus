import { Shield, CheckCircle2, FileText, Phone, Building2, CreditCard } from "lucide-react";

const checklist = [
  { icon: FileText, text: "CCCD/CMND hoặc giấy tờ tổ chức" },
  { icon: Phone, text: "Số điện thoại để xác thực OTP" },
  { icon: Building2, text: "Giấy phép kinh doanh (nếu là tổ chức)" },
  { icon: CreditCard, text: "Sao kê ngân hàng 1-3 tháng" },
];

export const TrustPanel = () => {
  return (
    <div className="sticky top-8 space-y-6">
      {/* Checklist Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
        <h3 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#4ECDC4]" />
          Bạn cần chuẩn bị gì?
        </h3>
        <ul className="space-y-3">
          {checklist.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-[#6B7280]">
              <div className="mt-0.5">
                <item.icon className="w-4 h-4 text-[#4ECDC4]" />
              </div>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Trust Badge */}
      <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#FF6B6B]/10 rounded-2xl p-6 border border-[#4ECDC4]/20">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Shield className="w-5 h-5 text-[#4ECDC4]" />
          </div>
          <div>
            <h4 className="font-semibold text-[#111827] mb-1">
              Bảo mật tuyệt đối
            </h4>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Chúng tôi cam kết mã hóa và bảo vệ mọi thông tin cá nhân của bạn theo tiêu chuẩn quốc tế.
            </p>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="bg-gradient-to-br from-[#FFE66D]/20 to-[#FF6B6B]/20 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-3">🤝</div>
        <p className="text-sm text-[#6B7280] font-medium">
          Cùng nhau xây dựng cộng đồng thiện nguyện minh bạch
        </p>
      </div>
    </div>
  );
};
