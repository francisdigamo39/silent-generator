import { useState } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConnectionModal } from "@/components/device/ConnectionModal";

type DashboardSettingsProps = {
  device: string;
  setDevice: (device: string) => void;
};

export function DashboardSettings({ device, setDevice }: DashboardSettingsProps) {
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionType, setConnectionType] = useState<"wifi" | "bluetooth">("wifi");

  const handleConnect = (deviceId: string, type: "wifi" | "bluetooth") => {
    setDevice(deviceId);
    setConnectionType(type);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-4 pb-4 px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon icon="lucide:cpu" className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Connected Device</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{device}</span>
                  <Badge variant="secondary" className="gap-1 h-5">
                    <Icon
                      icon={connectionType === "wifi" ? "lucide:wifi" : "lucide:bluetooth"}
                      className="h-3 w-3"
                    />
                    {connectionType === "wifi" ? "WiFi" : "Bluetooth"}
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConnectionModal(true)}
              className="gap-2"
            >
              <Icon icon="lucide:radio" className="h-4 w-4" />
              Change Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConnectionModal
        open={showConnectionModal}
        onOpenChange={setShowConnectionModal}
        device={device}
        onConnect={handleConnect}
      />
    </>
  );
}
