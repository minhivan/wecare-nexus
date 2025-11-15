import { Heart } from "lucide-react";

export const OnboardingHeader = () => {
  return (
    <header className="bg-white border-b border-[#E5E7EB]">
      <div className="container mx-auto px-4 py-6 max-w-[1360px]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B6B] rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[#111827]">
              Hoàn tất hồ sơ để bắt đầu hành trình thiện nguyện 💛
            </h1>
            <p className="text-sm text-[#6B7280]">
              Vui lòng cung cấp thông tin cần thiết để hệ thống xác minh danh tính của bạn
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
