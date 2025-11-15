import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "Thông tin cơ bản" },
  { number: 2, title: "Xác minh giấy tờ" },
  { number: 3, title: "Hoàn tất" },
];

export const ProgressTracker = ({ currentStep }: ProgressTrackerProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
                currentStep > step.number
                  ? "bg-[#4ECDC4] text-white"
                  : currentStep === step.number
                  ? "bg-[#4ECDC4] text-white ring-4 ring-[#4ECDC4]/20"
                  : "bg-[#F3F4F6] text-[#9CA3AF]"
              )}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="font-semibold">{step.number}</span>
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-2 font-medium",
                currentStep >= step.number ? "text-[#111827]" : "text-[#9CA3AF]"
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-16 h-1 mx-4 rounded transition-all duration-200",
                currentStep > step.number ? "bg-[#4ECDC4]" : "bg-[#E5E7EB]"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
