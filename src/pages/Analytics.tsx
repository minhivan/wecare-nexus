import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { InsightTab } from "@/components/analytics/InsightTab";
import { TrendTab } from "@/components/analytics/TrendTab";
import { ConversionTab } from "@/components/analytics/ConversionTab";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("insight");
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <AnalyticsHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedCampaign={selectedCampaign}
          onCampaignChange={setSelectedCampaign}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass w-fit mx-auto">
            <TabsTrigger 
              value="insight" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Insight
            </TabsTrigger>
            <TabsTrigger 
              value="trend"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Trend
            </TabsTrigger>
            <TabsTrigger 
              value="conversion"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Conversion
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insight" className="space-y-6 animate-slide-up">
            <InsightTab dateRange={dateRange} selectedCampaign={selectedCampaign} />
          </TabsContent>

          <TabsContent value="trend" className="space-y-6 animate-slide-up">
            <TrendTab dateRange={dateRange} selectedCampaign={selectedCampaign} />
          </TabsContent>

          <TabsContent value="conversion" className="space-y-6 animate-slide-up">
            <ConversionTab dateRange={dateRange} selectedCampaign={selectedCampaign} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
