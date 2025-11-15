import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { AccountType } from "@/pages/Onboarding";

interface OrganizationInfoFormProps {
  accountType: AccountType;
}

export const OrganizationInfoForm = ({ accountType }: OrganizationInfoFormProps) => {
  const isOrganization = accountType === "organization";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#111827] mb-2">
          {isOrganization ? "Thông tin tổ chức" : "Thông tin nhóm"}
        </h2>
        <p className="text-[#6B7280]">
          Cung cấp thông tin chính xác để xác minh
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="orgname" className="text-[#374151] font-medium">
            {isOrganization ? "Tên tổ chức / Doanh nghiệp" : "Tên nhóm / CLB"}
          </Label>
          <Input
            id="orgname"
            placeholder={isOrganization ? "Công ty TNHH ABC" : "Nhóm Tình Nguyện XYZ"}
            className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
          />
        </div>

        {isOrganization && (
          <div>
            <Label htmlFor="taxcode" className="text-[#374151] font-medium flex items-center gap-2">
              Mã số thuế
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 h-4 text-[#9CA3AF]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Giúp xác minh tổ chức nhanh hơn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="taxcode"
              placeholder="0123456789"
              className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
            />
          </div>
        )}

        <div>
          <Label htmlFor="purpose" className="text-[#374151] font-medium">
            Mục đích gây quỹ / Giới thiệu
          </Label>
          <Textarea
            id="purpose"
            placeholder="Mô tả ngắn gọn về mục đích hoạt động..."
            rows={4}
            className="mt-1.5 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
          />
        </div>

        <div className="border-t border-[#E5E7EB] pt-6">
          <h3 className="font-semibold text-[#111827] mb-4">
            Người đại diện pháp lý
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rep-name" className="text-[#374151] font-medium">
                Họ tên đại diện
              </Label>
              <Input
                id="rep-name"
                placeholder="Nguyễn Văn B"
                className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
              />
            </div>

            <div>
              <Label htmlFor="rep-id" className="text-[#374151] font-medium">
                CCCD/CMND
              </Label>
              <Input
                id="rep-id"
                placeholder="001234567890"
                className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
              />
            </div>

            <div>
              <Label htmlFor="rep-phone" className="text-[#374151] font-medium">
                Số điện thoại
              </Label>
              <Input
                id="rep-phone"
                placeholder="0912345678"
                className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
              />
            </div>

            <div>
              <Label htmlFor="rep-email" className="text-[#374151] font-medium">
                Email
              </Label>
              <Input
                id="rep-email"
                type="email"
                placeholder="email@example.com"
                className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
