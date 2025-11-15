import { useState } from "react";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccountType } from "@/pages/Onboarding";

interface DocumentVerificationProps {
  accountType: AccountType;
}

export const DocumentVerification = ({ accountType }: DocumentVerificationProps) => {
  const [uploads, setUploads] = useState<Record<string, boolean>>({});

  const handleUpload = (key: string) => {
    setUploads((prev) => ({ ...prev, [key]: true }));
  };

  const removeUpload = (key: string) => {
    setUploads((prev) => {
      const newUploads = { ...prev };
      delete newUploads[key];
      return newUploads;
    });
  };

  const isPersonal = accountType === "donor" || accountType === "creator";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#111827] mb-2">
          Xác minh giấy tờ
        </h2>
        <p className="text-[#6B7280]">
          Tải lên các tài liệu cần thiết để hoàn tất xác minh
        </p>
      </div>

      <div className="space-y-4">
        {isPersonal ? (
          <>
            <UploadZone
              title="CCCD/CMND - Mặt trước"
              isUploaded={uploads["id-front"]}
              onUpload={() => handleUpload("id-front")}
              onRemove={() => removeUpload("id-front")}
            />
            <UploadZone
              title="CCCD/CMND - Mặt sau"
              isUploaded={uploads["id-back"]}
              onUpload={() => handleUpload("id-back")}
              onRemove={() => removeUpload("id-back")}
            />
          </>
        ) : (
          <>
            <UploadZone
              title="Giấy phép hoạt động / ĐKKD"
              isUploaded={uploads["license"]}
              onUpload={() => handleUpload("license")}
              onRemove={() => removeUpload("license")}
            />
            <UploadZone
              title="Thư giới thiệu / Tài liệu minh chứng"
              isUploaded={uploads["intro"]}
              onUpload={() => handleUpload("intro")}
              onRemove={() => removeUpload("intro")}
            />
            <UploadZone
              title="CCCD/CMND người đại diện - Mặt trước"
              isUploaded={uploads["rep-front"]}
              onUpload={() => handleUpload("rep-front")}
              onRemove={() => removeUpload("rep-front")}
            />
            <UploadZone
              title="CCCD/CMND người đại diện - Mặt sau"
              isUploaded={uploads["rep-back"]}
              onUpload={() => handleUpload("rep-back")}
              onRemove={() => removeUpload("rep-back")}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface UploadZoneProps {
  title: string;
  isUploaded: boolean;
  onUpload: () => void;
  onRemove: () => void;
}

const UploadZone = ({ title, isUploaded, onUpload, onRemove }: UploadZoneProps) => {
  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-6 transition-all duration-200",
        isUploaded
          ? "border-[#4ECDC4] bg-[#4ECDC4]/5"
          : "border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#4ECDC4]/40 hover:bg-white"
      )}
    >
      {isUploaded ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4ECDC4] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-[#111827]">{title}</p>
              <p className="text-sm text-[#10B981] flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
                Đã tải lên - đang kiểm tra AI
              </p>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="w-8 h-8 rounded-lg hover:bg-[#F3F4F6] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
      ) : (
        <button onClick={onUpload} className="w-full text-center">
          <Upload className="w-8 h-8 text-[#9CA3AF] mx-auto mb-3" />
          <p className="font-medium text-[#374151] mb-1">{title}</p>
          <p className="text-sm text-[#6B7280]">
            Kéo thả hoặc click để tải lên (JPG, PNG, PDF)
          </p>
        </button>
      )}
    </div>
  );
};
