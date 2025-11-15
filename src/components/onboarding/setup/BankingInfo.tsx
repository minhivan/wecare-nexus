import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const BankingInfo = () => {
  const [statementUploaded, setStatementUploaded] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#111827] mb-2">
          Thông tin tài khoản nhận tiền
        </h2>
        <p className="text-[#6B7280]">
          Để nhận khoản đóng góp một cách minh bạch và an toàn
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="bank" className="text-[#374151] font-medium">
            Ngân hàng
          </Label>
          <Select>
            <SelectTrigger className="mt-1.5 h-11 bg-white border-[#E5E7EB]">
              <SelectValue placeholder="Chọn ngân hàng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vcb">Vietcombank</SelectItem>
              <SelectItem value="tcb">Techcombank</SelectItem>
              <SelectItem value="acb">ACB</SelectItem>
              <SelectItem value="mb">MB Bank</SelectItem>
              <SelectItem value="vib">VIB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="account-number" className="text-[#374151] font-medium">
              Số tài khoản
            </Label>
            <Input
              id="account-number"
              placeholder="1234567890"
              className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
            />
          </div>

          <div>
            <Label htmlFor="account-name" className="text-[#374151] font-medium">
              Chủ tài khoản
            </Label>
            <Input
              id="account-name"
              placeholder="NGUYEN VAN A"
              className="mt-1.5 h-11 bg-white border-[#E5E7EB] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
            />
          </div>
        </div>

        <div>
          <Label className="text-[#374151] font-medium block mb-2">
            Sao kê 1-3 tháng gần nhất
          </Label>
          {statementUploaded ? (
            <div className="border-2 border-[#4ECDC4] bg-[#4ECDC4]/5 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4ECDC4] rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#111827]">bank_statement.pdf</p>
                  <p className="text-sm text-[#10B981]">Đã tải lên thành công</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setStatementUploaded(true)}
              className="w-full border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#4ECDC4]/40 hover:bg-white rounded-2xl p-6 transition-all duration-200"
            >
              <Upload className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
              <p className="text-sm text-[#6B7280]">Tải lên sao kê (PDF)</p>
            </button>
          )}
          <p className="text-xs text-[#9CA3AF] mt-2">
            Để xác minh minh bạch và bảo mật giao dịch
          </p>
        </div>
      </div>
    </div>
  );
};
