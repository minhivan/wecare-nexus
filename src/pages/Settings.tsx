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
        
        <div className="mx-auto max-w-[960px] mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="glass w-full justify-start overflow-x-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="team">Team & Roles</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-8">
              <ProfileTab onChangeDetected={() => setHasUnsavedChanges(true)} />
            </TabsContent>

            <TabsContent value="organization" className="space-y-8">
              <OrganizationTab onChangeDetected={() => setHasUnsavedChanges(true)} />
            </TabsContent>

            <TabsContent value="team" className="space-y-8">
              <TeamRolesTab />
            </TabsContent>

            <TabsContent value="billing" className="space-y-8">
              <BillingTab />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-8">
              <NotificationsTab onChangeDetected={() => setHasUnsavedChanges(true)} />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-8">
              <IntegrationsTab />
            </TabsContent>

            <TabsContent value="security" className="space-y-8">
              <SecurityTab />
            </TabsContent>

            <TabsContent value="audit" className="space-y-8">
              <AuditLogsTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Save Button */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-8 right-8 animate-slide-up">
            <Button
              onClick={handleSave}
              size="lg"
              className="glass shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <Save className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
