// src/pages/dashboard/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Zap, Sun, Battery, TrendingUp, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LucideIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Types
type SolarLog = {
  id: number;
  piezo_voltage: number;
  solar_status: 'HIGH' | 'LOW';
  created_at: string;
};

type EnergyData = {
  piezoVoltage: number;
  solarStatus: 'HIGH' | 'LOW';
  timestamp: Date;
  energyHarvested: number;
};

// SimpleStatCard Component
function SimpleStatCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  status = 'neutral',
  subtitle 
}: {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: 'good' | 'warning' | 'error' | 'neutral';
  subtitle?: string;
}) {
  const statusColors = {
    good: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    neutral: 'text-blue-600 dark:text-blue-400'
  };

  const bgColors = {
    good: 'bg-green-100 dark:bg-green-900/20',
    warning: 'bg-yellow-100 dark:bg-yellow-900/20',
    error: 'bg-red-100 dark:bg-red-900/20',
    neutral: 'bg-blue-100 dark:bg-blue-900/20'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${bgColors[status]}`}>
          <Icon className={`h-4 w-4 ${statusColors[status]}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className={`text-2xl font-bold ${statusColors[status]}`}>
            {value}
          </div>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

// SimpleEnergyChart Component with Custom Tooltip
function SimpleEnergyChart({ data }: { data: Array<{ time: string; piezo: number; solar: number }> }) {
  // Custom Tooltip - Only show non-zero values
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
                  {entry.name}: {entry.value}V
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

  return (
    <Card>
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
// AI Insights Component (Inline)
function AIInsights({ energyData }: { energyData: EnergyData[] }) {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generateInsights = () => {
    setLoading(true);
    
    // Simple insights based on data
    setTimeout(() => {
      const avgPiezo = energyData.reduce((sum, d) => sum + d.piezoVoltage, 0) / energyData.length;
      const solarUptime = (energyData.filter(d => d.solarStatus === 'HIGH').length / energyData.length) * 100;
      
      const insight = `Based on ${energyData.length} readings: 
      
• Average piezo voltage: ${avgPiezo.toFixed(2)}V
• Solar panel uptime: ${solarUptime.toFixed(1)}%
• System efficiency: ${avgPiezo > 2 ? 'Good' : 'Needs attention'}

Recommendations:
${avgPiezo < 0.5 ? '⚠️ Check piezo sensor positioning' : '✓ Piezo performance optimal'}
${solarUptime < 10 ? '⚠️ Solar panel may need cleaning or repositioning' : '✓ Solar panel performing well'}
`;
      
      setInsights(insight);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (energyData.length > 10) {
      generateInsights();
    }
  }, [energyData.length]);

  if (energyData.length < 10) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
          <CardDescription>Collecting data... (need at least 10 readings)</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Waiting for more data to generate insights...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Insights</CardTitle>
        <CardDescription>Smart analysis of your energy system</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="whitespace-pre-line text-sm text-muted-foreground">
            {insights}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Main Dashboard Component
export function Dashboard() {
  const [latestData, setLatestData] = useState<SolarLog | null>(null);
  const [historicalData, setHistoricalData] = useState<SolarLog[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch latest data
  const fetchLatestData = async () => {
    try {
      const { data, error } = await supabase
        .from('solar_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      
      if (data) {
        setLatestData(data);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch historical data
  const fetchHistoricalData = async () => {
    try {
      const { data, error } = await supabase
        .from('solar_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      if (data) {
        setHistoricalData(data.reverse());
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  // Subscribe to real-time updates
  useEffect(() => {
    fetchLatestData();
    fetchHistoricalData();

    // Real-time subscription
    const channel = supabase
      .channel('solar_logs_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'solar_logs'
        },
        (payload) => {
          console.log('New data received:', payload.new);
          const newData = payload.new as SolarLog;
          setLatestData(newData);
          setHistoricalData(prev => [...prev.slice(-49), newData]);
          setIsConnected(true);
        }
      )
      .subscribe();

    // Refresh every 5 seconds
    const interval = setInterval(fetchLatestData, 5000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  // Calculate stats
  const avgPiezoVoltage = historicalData.length > 0
    ? historicalData.reduce((sum, log) => sum + log.piezo_voltage, 0) / historicalData.length
    : 0;

  const solarUptimePercentage = historicalData.length > 0
    ? (historicalData.filter(log => log.solar_status === 'HIGH').length / historicalData.length) * 100
    : 0;

  const totalEnergyHarvested = historicalData.reduce((total, log) => {
    return total + (log.piezo_voltage * 0.5) + (log.solar_status === 'HIGH' ? 1.0 : 0);
  }, 0);

  // Prepare data for AI insights
  const energyDataForAI: EnergyData[] = historicalData.map(log => ({
    piezoVoltage: log.piezo_voltage,
    solarStatus: log.solar_status,
    timestamp: new Date(log.created_at),
    energyHarvested: (log.piezo_voltage * 0.5) + (log.solar_status === 'HIGH' ? 1.0 : 0)
  }));

  // Chart data
  const chartData = historicalData.map(log => ({
    time: new Date(log.created_at).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    piezo: log.piezo_voltage,
    solar: log.solar_status === 'HIGH' ? 3.3 : 0
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Energy Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring from ESP8266</p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="h-5 w-5 text-green-500 animate-pulse" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                Live
              </span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-600 dark:text-red-400">
                Disconnected
              </span>
            </>
          )}
        </div>
      </div>

      {/* Connection Alert */}
      {!isConnected && (
        <Alert variant="destructive">
          <AlertDescription>
            No data received. Check: 1) ESP8266 is powered, 2) Connected to WiFi, 3) Supabase credentials are correct
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SimpleStatCard
          title="Piezo Voltage"
          value={latestData?.piezo_voltage.toFixed(1) || '0.0'}
          unit="V"
          icon={Zap}
          status={latestData && latestData.piezo_voltage > 2 ? 'good' : 'warning'}
          subtitle={`Avg: ${avgPiezoVoltage.toFixed(2)}V`}
        />

        <SimpleStatCard
          title="Solar Status"
          value={latestData?.solar_status || 'LOW'}
          icon={Sun}
          status={latestData?.solar_status === 'HIGH' ? 'good' : 'neutral'}
          subtitle={`Uptime: ${solarUptimePercentage.toFixed(1)}%`}
        />

        <SimpleStatCard
          title="Energy Harvested"
          value={totalEnergyHarvested.toFixed(2)}
          unit="Wh"
          icon={Battery}
          status="good"
          subtitle="Combined total"
        />

        <SimpleStatCard
          title="Data Points"
          value={historicalData.length}
          icon={TrendingUp}
          status="neutral"
          subtitle="Last 50 readings"
        />
      </div>

      {/* Chart */}
      <SimpleEnergyChart data={chartData} />

      {/* AI Insights */}
      <AIInsights energyData={energyDataForAI} />

      {/* Latest Reading Info */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Reading</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          {latestData ? (
            <div className="space-y-1 font-mono text-xs">
              <p>📍 ID: {latestData.id}</p>
              <p>⚡ Piezo: {latestData.piezo_voltage.toFixed(2)}V</p>
              <p>☀️ Solar: {latestData.solar_status}</p>
              <p>🕐 Time: {new Date(latestData.created_at).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Waiting for data...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}