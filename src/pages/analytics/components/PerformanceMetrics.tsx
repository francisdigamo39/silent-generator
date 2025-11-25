import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartData } from "@/types";

type PerformanceMetricsProps = {
  charts: ChartData;
};

export function PerformanceMetrics({ charts }: PerformanceMetricsProps) {
  const [showInsights, setShowInsights] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  // Calculate performance metrics using 1 hour data
  const avgSolar = charts.data1Hour.reduce((acc: number, d: { Solar?: number }) => acc + (d.Solar || 0), 0) / charts.data1Hour.length;
  const avgSOC = charts.data1Hour.reduce((acc: number, d: { SOC?: number }) => acc + (d.SOC || 0), 0) / charts.data1Hour.length;
  const peakSolar = Math.max(...charts.data1Hour.map((d: { Solar?: number }) => d.Solar || 0));
  const efficiency = ((avgSolar / peakSolar) * 100) || 0;

  const handleInsightsClick = () => {
    if (showInsights) {
      setShowInsights(false);
      return;
    }

    setShowInsights(true);
    setLoading(true);
    setInsights([]);

    // Simulate AI processing with delayed insights
    setTimeout(() => {
      setInsights([
        `Peak solar generation occurred at ${peakSolar.toFixed(0)}W, suggesting optimal panel orientation during midday hours.`,
        `Average efficiency of ${efficiency.toFixed(1)}% indicates system is performing ${efficiency > 70 ? 'above' : 'within'} expected parameters.`,
        `Sound energy contribution averages 12% of total input, providing consistent baseline power during low-light conditions.`
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Solar Input</CardTitle>
            <Icon icon="lucide:sun" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSolar.toFixed(0)} W</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Solar Power</CardTitle>
            <Icon icon="lucide:trending-up" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{peakSolar.toFixed(0)} W</div>
            <p className="text-xs text-muted-foreground mt-1">Maximum recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average SOC</CardTitle>
            <Icon icon="lucide:battery" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSOC.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Battery state</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <Icon icon="lucide:activity" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{efficiency.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">System performance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Power Generation Overview</CardTitle>
              <CardDescription>Solar and sound energy harvested over time</CardDescription>
            </div>
            <div className="relative">
              <Button
                onClick={handleInsightsClick}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Icon icon="solar:magic-stick-3-bold" className="h-4 w-4" />
                AI Insights
              </Button>

              <AnimatePresence>
                {showInsights && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-96 bg-card border rounded-lg shadow-lg p-4 z-10"
                  >
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                      <Icon icon="solar:magic-stick-3-bold" className="h-4 w-4 text-accent" />
                      <span className="font-semibold text-sm">AI Analysis</span>
                    </div>

                    <div className="space-y-3">
                      {loading ? (
                        <>
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                              <div className="h-3 bg-muted rounded animate-pulse" />
                              <div className="h-3 bg-muted rounded animate-pulse w-5/6" />
                            </div>
                          ))}
                        </>
                      ) : (
                        insights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-2 text-sm"
                          >
                            <Icon icon="solar:check-circle-bold" className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                            <p className="text-muted-foreground leading-relaxed">{insight}</p>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={charts.data1Hour} margin={{ left: 8, right: 8, top: 10 }}>
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <ReTooltip />
              <Area
                type="monotone"
                dataKey="Solar"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#gradient1)"
                stroke="hsl(var(--accent))"
              />
              <Area
                type="monotone"
                dataKey="Sound"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#gradient2)"
                stroke="hsl(var(--primary))"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
