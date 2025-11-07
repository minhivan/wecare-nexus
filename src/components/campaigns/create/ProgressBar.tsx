import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: "Basics" },
  { number: 2, label: "Story" },
  { number: 3, label: "Goal" },
  { number: 4, label: "Donations" },
  { number: 5, label: "Publish" },
];

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-2 relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  currentStep >= step.number
                    ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-card border-2 border-border text-muted-foreground"
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors absolute -bottom-6",
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-1 mx-2 rounded-full bg-border overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500 ease-out",
                    currentStep > step.number
                      ? "w-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      : "w-0 bg-border"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
