// src/components/charts/SimpleEnergyChart.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type ChartData = {
  time: string;
  piezo: number;
  solar: number;
};

type SimpleEnergyChartProps = {
  data: ChartData[];
};

// Custom Tooltip Component - Only show non-zero values
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          // Only show if value is greater than 0
          if (entry.value > 0) {
            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.name}: {entry.value}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

export function SimpleEnergyChart({ data }: SimpleEnergyChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Energy Production Over Time</CardTitle>
        <CardDescription>Real-time voltage readings from sensors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                label={{ value: 'Voltage (V)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="piezo" 
                stroke="#8b5cf6" 
                name="Piezo Voltage"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="solar" 
                stroke="#f59e0b" 
                name="Solar (HIGH=3.3V)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}