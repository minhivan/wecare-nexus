import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { OrganizationTab } from "@/components/settings/OrganizationTab";
import { TeamRolesTab } from "@/components/settings/TeamRolesTab";
import { BillingTab } from "@/components/settings/BillingTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { IntegrationsTab } from "@/components/settings/IntegrationsTab";
import { SecurityTab } from "@/components/settings/SecurityTab";
import { AuditLogsTab } from "@/components/settings/AuditLogsTab";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    toast.success("Settings saved successfully");
    setHasUnsavedChanges(false);
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <SettingsHeader />
        
        <div className="mx-auto max-w-[960px] mt-6 sm:mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-1 bg-[#111827] border border-[#1F2937] p-1">
              <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
              <TabsTrigger value="organization" className="text-xs sm:text-sm">Organization</TabsTrigger>
              <TabsTrigger value="team" className="text-xs sm:text-sm">Team</TabsTrigger>
              <TabsTrigger value="billing" className="text-xs sm:text-sm">Billing</TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
              <TabsTrigger value="integrations" className="text-xs sm:text-sm">Integrations</TabsTrigger>
              <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
              <TabsTrigger value="audit" className="text-xs sm:text-sm">Audit</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 sm:space-y-8">
              <ProfileTab onChangeDetected={() => setHasUnsavedChanges(true)} />
            </TabsContent>

            <TabsContent value="organization" className="space-y-6 sm:space-y-8">
              <OrganizationTab onChangeDetected={() => setHasUnsavedChanges(true)} />
            </TabsContent>

            <TabsContent value="team" className="space-y-6 sm:space-y-8">
              <TeamRolesTab />
            </TabsContent>

            <TabsContent value="billing" className="space-y-6 sm:space-y-8">
              <BillingTab />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 sm:space-y-8">
              <NotificationsTab onChangeDetected={() => setHasUnsavedChanges(true)} />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6 sm:space-y-8">
              <IntegrationsTab />
            </TabsContent>

            <TabsContent value="security" className="space-y-6 sm:space-y-8">
              <SecurityTab />
            </TabsContent>

            <TabsContent value="audit" className="space-y-6 sm:space-y-8">
              <AuditLogsTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Save Button */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 animate-slide-up">
            <Button
              onClick={handleSave}
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all duration-200 group bg-emerald hover:bg-emerald/90 text-white"
            >
              <Save className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Save Changes</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
