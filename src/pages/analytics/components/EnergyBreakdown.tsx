import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@iconify/react";
import type { ChartData } from "@/types";

type EnergyBreakdownProps = {
  charts: ChartData;
};

export function EnergyBreakdown({ charts }: EnergyBreakdownProps) {
  // Calculate totals using 1 hour data
  const totalSolar = charts.data1Hour.reduce((acc: number, d: { Solar?: number }) => acc + (d.Solar || 0), 0);
  const totalSound = charts.data1Hour.reduce((acc: number, d: { Sound?: number }) => acc + (d.Sound || 0), 0);
  const totalEnergy = totalSolar + totalSound;

  const solarPercentage = (totalSolar / totalEnergy) * 100;
  const soundPercentage = (totalSound / totalEnergy) * 100;

  // Calculate hourly averages
  const hourlyData = [
    {
      source: "Solar Panel",
      total: totalSolar.toFixed(0),
      avg: (totalSolar / charts.data1Hour.length).toFixed(1),
      percentage: solarPercentage.toFixed(1),
      icon: "lucide:sun",
      color: "text-accent"
    },
    {
      source: "Sound Harvesting",
      total: totalSound.toFixed(0),
      avg: (totalSound / charts.data1Hour.length).toFixed(1),
      percentage: soundPercentage.toFixed(1),
      icon: "lucide:waves",
      color: "text-primary"
    },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Energy Sources</CardTitle>
            <CardDescription>Distribution of energy generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:sun" className="h-4 w-4 text-accent" />
                  <span>Solar Panel</span>
                </div>
                <span className="font-medium">{solarPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={solarPercentage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:waves" className="h-4 w-4 text-primary" />
                  <span>Sound Harvesting</span>
                </div>
                <span className="font-medium">{soundPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={soundPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Energy Harvested</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold">{totalEnergy.toFixed(0)} Wh</div>
                <p className="text-xs text-muted-foreground mt-1">Combined sources</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Solar</p>
                  <p className="text-xl font-semibold text-accent">{totalSolar.toFixed(0)} Wh</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Sound</p>
                  <p className="text-xl font-semibold text-primary">{totalSound.toFixed(0)} Wh</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>Energy generation statistics by source</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Energy Source</TableHead>
                <TableHead>Total (Wh)</TableHead>
                <TableHead>Average (W)</TableHead>
                <TableHead>Contribution</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hourlyData.map((item) => (
                <TableRow key={item.source}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Icon icon={item.icon} className={`h-4 w-4 ${item.color}`} />
                      {item.source}
                    </div>
                  </TableCell>
                  <TableCell>{item.total} Wh</TableCell>
                  <TableCell>{item.avg} W</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16">
                        <Progress value={parseFloat(item.percentage)} className="h-1.5" />
                      </div>
                      <span className="text-sm">{item.percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="gap-1">
                      <Icon icon="lucide:check-circle" className="h-3 w-3" />
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
