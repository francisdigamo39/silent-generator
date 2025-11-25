import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import type { ChartData } from "@/types";

type HistoricalTrendsProps = {
  charts: ChartData;
};

export function HistoricalTrends({ charts }: HistoricalTrendsProps) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Battery State of Charge (SOC)</CardTitle>
          <CardDescription>24-hour battery level trends</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={charts.data24Hour}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <ReTooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="SOC"
                name="Battery SOC (%)"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Power Generation Comparison</CardTitle>
            <CardDescription>Solar vs Sound energy over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.data1Hour}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <ReTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Solar"
                  name="Solar (W)"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Sound"
                  name="Sound (W)"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Efficiency Trends</CardTitle>
            <CardDescription>System performance over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={charts.data1Hour.map((d: { Solar?: number; [key: string]: unknown }) => ({
                  ...d,
                  efficiency: ((d.Solar || 0) / Math.max(...charts.data1Hour.map((x: { Solar?: number }) => x.Solar || 1))) * 100
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <ReTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  name="Efficiency (%)"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
