import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import DeveloperSettings from "./pages/DeveloperSettings";
import Donations from "./pages/Donations";
import Payouts from "./pages/Payouts";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import AdminVerification from "./pages/AdminVerification";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserList from "./pages/admin/UserList";
import KYCVerificationList from "./pages/admin/KYCVerificationList";
import PendingCampaigns from "./pages/admin/PendingCampaigns";
import ActiveCampaigns from "./pages/admin/ActiveCampaigns";
import DonationsTransactions from "./pages/admin/DonationsTransactions";
import CampaignSummary from "./pages/admin/CampaignSummary";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OnboardingProvider>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/new" element={<CreateCampaign />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/donations/payouts" element={<Payouts />} />
          <Route path="/community" element={<Community />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/developer" element={<DeveloperSettings />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/verification" element={<KYCVerificationList />} />
          <Route path="/admin/verification/:userId" element={<AdminVerification />} />
          <Route path="/admin/campaigns/pending" element={<PendingCampaigns />} />
          <Route path="/admin/campaigns/active" element={<ActiveCampaigns />} />
          <Route path="/admin/reports/campaigns" element={<CampaignSummary />} />
          <Route path="/admin/donations/transactions" element={<DonationsTransactions />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </OnboardingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
