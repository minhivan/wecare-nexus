import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const PersonalInfoForm = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#111827] mb-2">
          Thông tin cá nhân
        </h2>
        <p className="text-[#6B7280]">
          Cung cấp thông tin chính xác để xác minh danh tính
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullname" className="text-[#374151] font-medium">
            Họ và tên đầy đủ
          </Label>
          <Input
            id="fullname"
            placeholder="Nguyễn Văn A"
            className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-[#374151] font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-[#374151] font-medium flex items-center gap-2">
              Số điện thoại
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 h-4 text-[#9CA3AF]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sẽ được xác thực qua OTP</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="phone"
              placeholder="0912345678"
              className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="idcard" className="text-[#374151] font-medium flex items-center gap-2">
            Số CCCD/CMND
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="w-4 h-4 text-[#9CA3AF]" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sẽ được mã hóa & lưu trữ an toàn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="idcard"
            placeholder="001234567890"
            className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
          />
        </div>

        <div>
          <Label htmlFor="address" className="text-[#374151] font-medium">
            Địa chỉ thường trú
          </Label>
          <Input
            id="address"
            placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
            className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
          />
        </div>
      </div>
    </div>
  );
};
