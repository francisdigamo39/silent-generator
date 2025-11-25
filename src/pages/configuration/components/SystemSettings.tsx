import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";

type SystemSettingsProps = {
  device: string;
  setDevice: (device: string) => void;
};

export function SystemSettings({ device, setDevice }: SystemSettingsProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Device Information</CardTitle>
          <CardDescription>View and manage your device settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="device-select">Active Device</Label>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger id="device-select">
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="silentgen-001">silentgen-001</SelectItem>
                <SelectItem value="silentgen-002">silentgen-002</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="device-name">Device Name</Label>
            <Input id="device-name" defaultValue={device} placeholder="Enter device name" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Firmware Version</Label>
              <div className="text-sm text-muted-foreground">v2.4.1</div>
            </div>
            <div className="space-y-2">
              <Label>Hardware Revision</Label>
              <div className="text-sm text-muted-foreground">Rev C</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Network Settings</CardTitle>
          <CardDescription>Configure network and connectivity options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wifi-ssid">WiFi Network</Label>
            <Input id="wifi-ssid" placeholder="Network name" defaultValue="HomeNetwork" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wifi-password">WiFi Password</Label>
            <Input id="wifi-password" type="password" placeholder="••••••••" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>IP Address</Label>
              <div className="text-sm text-muted-foreground">192.168.1.42</div>
            </div>
            <div className="space-y-2">
              <Label>MAC Address</Label>
              <div className="text-sm text-muted-foreground">A4:CF:12:34:56:78</div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Icon icon="lucide:save" className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>Manage system operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">Restart Device</div>
              <div className="text-sm text-muted-foreground">
                Perform a soft restart of the system
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon icon="lucide:refresh-cw" className="h-4 w-4" />
              Restart
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">Factory Reset</div>
              <div className="text-sm text-muted-foreground">
                Reset all settings to factory defaults
              </div>
            </div>
            <Button variant="destructive" className="gap-2">
              <Icon icon="lucide:alert-triangle" className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
