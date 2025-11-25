import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import { PerformanceMetrics } from "./components/PerformanceMetrics";
import { EnergyBreakdown } from "./components/EnergyBreakdown";
import type { ChartData } from "@/types";

type AnalyticsProps = {
  charts: ChartData;
};

export function Analytics({ charts }: AnalyticsProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Deep insights into your solar generator performance
          </p>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance" className="gap-2">
            <Icon icon="lucide:trending-up" className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="energy" className="gap-2">
            <Icon icon="lucide:zap" className="h-4 w-4" />
            Energy Breakdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceMetrics charts={charts} />
        </TabsContent>

        <TabsContent value="energy" className="space-y-6">
          <EnergyBreakdown charts={charts} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
