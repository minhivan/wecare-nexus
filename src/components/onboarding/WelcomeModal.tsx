import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface WelcomeModalProps {
  open: boolean;
  onStartTour: () => void;
}

export const WelcomeModal = ({ open, onStartTour }: WelcomeModalProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[540px] border-0 bg-gradient-to-br from-[hsl(var(--onboarding-bg-start))] to-[hsl(var(--onboarding-bg-end))] backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col items-center text-center space-y-6 py-8">
          {/* Logo */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--onboarding-accent-start))] to-[hsl(var(--onboarding-accent-end))] flex items-center justify-center shadow-lg animate-scale-in">
            <img src="/src/assets/wecare-icon.png" alt="WeCare" className="w-12 h-12" />
          </div>

          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-bold text-[hsl(var(--onboarding-text-primary))]">
              Welcome to WeCare Dashboard
            </DialogTitle>
            <DialogDescription className="text-lg text-[hsl(var(--onboarding-text-secondary))] leading-relaxed">
              Let's create your first act of kindness together.
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={onStartTour}
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold bg-gradient-to-r from-[hsl(var(--onboarding-accent-start))] to-[hsl(var(--onboarding-accent-end))] text-white hover:shadow-lg hover:shadow-purple-200/50 hover:scale-105 transition-all duration-300 border-0"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Guided Tour
          </Button>

          <p className="text-xs text-[hsl(var(--onboarding-text-secondary))] mt-4">
            You can access this tour anytime from the Help Center
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
