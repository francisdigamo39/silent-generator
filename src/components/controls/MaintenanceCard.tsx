import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type MaintenanceCardProps = {
  limitW: number[];
};

export function MaintenanceCard({ limitW }: MaintenanceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Maintenance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline">
            <Icon icon="lucide:wrench" className="h-4 w-4 mr-2" /> Calibrate Sensors
          </Button>
          <Button variant="outline">
            <Icon icon="lucide:settings" className="h-4 w-4 mr-2" /> System Settings
          </Button>
          <Button variant="outline">
            <Icon icon="lucide:refresh-cw" className="h-4 w-4 mr-2" /> Reboot Device
          </Button>
          <Button variant="destructive">
            <Icon icon="lucide:power" className="h-4 w-4 mr-2" /> Emergency Stop
          </Button>
        </div>
        <Alert>
          <Icon icon="lucide:info" className="h-4 w-4" />
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription className="text-sm">
            Use Auto Mode so AI prioritizes charging to reach your target SOC while capping output to {limitW[0]} W.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
