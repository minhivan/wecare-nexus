import { ReactNode } from "react";
import { WelcomeModal } from "./WelcomeModal";
import { useOnboarding } from "@/hooks/useOnboarding";

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const { showWelcome, startTour } = useOnboarding();

  return (
    <>
      <WelcomeModal open={showWelcome} onStartTour={startTour} />
      {children}
    </>
  );
};
