import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DeveloperHeader } from "@/components/developer/DeveloperHeader";
import { EnvironmentConfig } from "@/components/developer/EnvironmentConfig";
import { ExperimentalFeatures } from "@/components/developer/ExperimentalFeatures";
import { ApiSandbox } from "@/components/developer/ApiSandbox";
import { LogsDiagnostics } from "@/components/developer/LogsDiagnostics";
import { FeatureRollout } from "@/components/developer/FeatureRollout";

const DeveloperSettings = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1360px] mx-auto space-y-6">
        <DeveloperHeader />
        
        <div className="space-y-6">
          <EnvironmentConfig />
          <ExperimentalFeatures />
          <ApiSandbox />
          <LogsDiagnostics />
          <FeatureRollout />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeveloperSettings;
