import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { FilterBar } from "@/components/analytics/FilterBar";
import { InsightTab } from "@/components/analytics/InsightTab";
import { TrendTab } from "@/components/analytics/TrendTab";
import { ConversionTab } from "@/components/analytics/ConversionTab";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("insight");
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [filters, setFilters] = useState({
    campaign: null as string | null,
    channel: null as string | null,
    country: null as string | null,
    donorType: null as string | null,
    device: null as string | null,
  });
  const [comparePeriod, setComparePeriod] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-0 animate-fade-in">
        <AnalyticsHeader
          activeTab={activeTab}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          comparePeriod={comparePeriod}
          onComparePeriodChange={setComparePeriod}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="border-b border-border bg-transparent h-12 w-full justify-start rounded-none px-4">
            <TabsTrigger 
              value="insight" 
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium transition-all data-[state=active]:border-emerald data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground"
            >
              Insight
            </TabsTrigger>
            <TabsTrigger 
              value="trend"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium transition-all data-[state=active]:border-emerald data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground"
            >
              Trend
            </TabsTrigger>
            <TabsTrigger 
              value="conversion"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium transition-all data-[state=active]:border-emerald data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground"
            >
              Conversion
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="insight" className="mt-0 space-y-8">
              <InsightTab 
                dateRange={dateRange} 
                filters={filters}
                comparePeriod={comparePeriod}
              />
            </TabsContent>

            <TabsContent value="trend" className="mt-0 space-y-8">
              <TrendTab 
                dateRange={dateRange} 
                filters={filters}
                comparePeriod={comparePeriod}
              />
            </TabsContent>

            <TabsContent value="conversion" className="mt-0 space-y-8">
              <ConversionTab 
                dateRange={dateRange} 
                filters={filters}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
