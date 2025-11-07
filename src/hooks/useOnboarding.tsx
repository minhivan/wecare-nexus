import { useState, useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const ONBOARDING_KEY = "wecare_onboarding_completed";

export const useOnboarding = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY);
    if (!hasCompletedOnboarding) {
      setShowWelcome(true);
    }
  }, []);

  const startTour = () => {
    setShowWelcome(false);

    const driverObj = driver({
      showProgress: true,
      showButtons: ["next", "previous", "close"],
      progressText: "{{current}} of {{total}}",
      nextBtnText: "Next →",
      prevBtnText: "← Previous",
      doneBtnText: "✓ Done",
      popoverClass: "wecare-tour-popover",
      steps: [
        {
          element: "[data-tour='sidebar']",
          popover: {
            title: "Your Navigation Hub",
            description:
              "This is your main navigation — where every journey begins. Access all modules from here.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "[data-tour='header']",
          popover: {
            title: "Global Command Center",
            description:
              "Access notifications, profile, and help center from here. Use the search to quickly navigate anywhere.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "[data-tour='create-campaign']",
          popover: {
            title: "Create Your First Campaign",
            description:
              "Launch your first fund in just a few steps. Click here whenever you're ready to start making an impact.",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: "[data-tour='analytics']",
          popover: {
            title: "Track Your Impact",
            description:
              "Monitor the growth and impact of your campaigns here. Real-time insights help you make better decisions.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "[data-tour='community']",
          popover: {
            title: "Connect & Learn",
            description:
              "Connect with other fund creators and learn from their stories. Together, we create more impact.",
            side: "right",
            align: "start",
          },
        },
      ],
      onDestroyStarted: () => {
        localStorage.setItem(ONBOARDING_KEY, "true");
        driverObj.destroy();
      },
    });

    driverObj.drive();
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setShowWelcome(true);
  };

  return {
    showWelcome,
    startTour,
    resetOnboarding,
  };
};
