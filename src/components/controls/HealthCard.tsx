import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Telemetry } from "@/types";

type HealthCardProps = {
  tele: Telemetry;
};

export function HealthCard({ tele }: HealthCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Icon icon="lucide:thermometer" className="h-4 w-4" /> Battery Temp
          </span>
          <span className="font-medium">{tele.batteryTemp.toFixed(1)} °C</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Icon icon="lucide:sun" className="h-4 w-4" /> MPPT Voltage
          </span>
          <span className="font-medium">{tele.solarVoltage.toFixed(1)} V</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Icon icon="lucide:waves" className="h-4 w-4" /> Piezo Voltage
          </span>
          <span className="font-medium">{tele.piezoVoltage.toFixed(2)} V</span>
        </div>
        <Button size="sm" variant="outline">
          <Icon icon="lucide:info" className="h-4 w-4 mr-1" /> Diagnostics
        </Button>
      </CardContent>
    </Card>
  );
}
