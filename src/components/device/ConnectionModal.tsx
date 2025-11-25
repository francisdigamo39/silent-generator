import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

type ConnectionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: string;
  onConnect: (deviceId: string, connectionType: "wifi" | "bluetooth") => void;
};

export function ConnectionModal({ open, onOpenChange, device, onConnect }: ConnectionModalProps) {
  const [connectionType, setConnectionType] = useState<"wifi" | "bluetooth">("wifi");
  const [deviceId, setDeviceId] = useState(device);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      onConnect(deviceId, connectionType);
      setConnecting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon icon="lucide:radio" className="h-5 w-5 text-accent" />
            Device Connection
          </DialogTitle>
          <DialogDescription>
            Connect to your Silent Generator via WiFi or Bluetooth
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Connection Status */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon icon="lucide:check-circle" className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-medium">Current Device</div>
                <div className="text-xs text-muted-foreground">{device}</div>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Connected
            </Badge>
          </div>

          {/* Connection Type Selection */}
          <div className="space-y-3">
            <Label>Connection Method</Label>
            <RadioGroup
              value={connectionType}
              onValueChange={(value) => setConnectionType(value as "wifi" | "bluetooth")}
            >
              <div className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="wifi" id="wifi" />
                <Label htmlFor="wifi" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon icon="lucide:wifi" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">WiFi Connection</div>
                      <div className="text-xs text-muted-foreground">
                        Connect via local network
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="bluetooth" id="bluetooth" />
                <Label htmlFor="bluetooth" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon icon="lucide:bluetooth" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Bluetooth Connection</div>
                      <div className="text-xs text-muted-foreground">
                        Direct wireless connection
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Device ID Input */}
          <div className="space-y-2">
            <Label htmlFor="deviceId">Device ID</Label>
            <div className="relative">
              <Icon icon="lucide:cpu" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="deviceId"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                placeholder="Enter device ID"
                className="pl-9"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your device's unique identifier (e.g., silentgen-001)
            </p>
          </div>

          {/* Connection Info */}
          {connectionType === "wifi" && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Icon icon="lucide:info" className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-900 dark:text-blue-200">
                  Make sure your device and computer are on the same WiFi network.
                </div>
              </div>
            </div>
          )}

          {connectionType === "bluetooth" && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Icon icon="lucide:info" className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-900 dark:text-blue-200">
                  Enable Bluetooth on your device and keep it within 10 meters range.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={connecting}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={connecting || !deviceId} className="gap-2">
            {connecting ? (
              <>
                <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Icon icon="lucide:plug" className="h-4 w-4" />
                Connect Device
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
