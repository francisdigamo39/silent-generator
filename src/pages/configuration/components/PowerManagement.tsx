import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from "@iconify/react";

type PowerManagementProps = {
  autoMode: boolean;
  setAutoMode: (mode: boolean) => void;
  targetSoc: number[];
  setTargetSoc: (soc: number[]) => void;
  limitW: number[];
  setLimitW: (limit: number[]) => void;
};

export function PowerManagement({
  autoMode,
  setAutoMode,
  targetSoc,
  setTargetSoc,
  limitW,
  setLimitW,
}: PowerManagementProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Power Management</CardTitle>
          <CardDescription>Configure intelligent power optimization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="auto-mode" className="text-base">Auto Mode</Label>
              <div className="text-sm text-muted-foreground">
                Let AI optimize power distribution automatically
              </div>
            </div>
            <Switch
              id="auto-mode"
              checked={autoMode}
              onCheckedChange={setAutoMode}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Target State of Charge</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={targetSoc}
                  onValueChange={setTargetSoc}
                  min={20}
                  max={100}
                  step={5}
                  className="flex-1"
                  disabled={!autoMode}
                />
                <div className="min-w-[3rem] text-right font-medium">{targetSoc[0]}%</div>
              </div>
              <p className="text-xs text-muted-foreground">
                AI will optimize charging to maintain this battery level
              </p>
            </div>

            <div className="space-y-2">
              <Label>Power Output Limit</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={limitW}
                  onValueChange={setLimitW}
                  min={50}
                  max={300}
                  step={10}
                  className="flex-1"
                />
                <div className="min-w-[3rem] text-right font-medium">{limitW[0]} W</div>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum power output to connected devices
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Charging Settings</CardTitle>
          <CardDescription>Configure battery charging behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Charging Mode</Label>
            <RadioGroup defaultValue="balanced">
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="fast" id="fast" />
                <Label htmlFor="fast" className="font-normal cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:zap" className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Fast Charge</div>
                      <div className="text-xs text-muted-foreground">
                        Prioritize charging speed
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced" className="font-normal cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:gauge" className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Balanced</div>
                      <div className="text-xs text-muted-foreground">
                        Balance speed and battery health
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="longevity" id="longevity" />
                <Label htmlFor="longevity" className="font-normal cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:heart" className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Longevity</div>
                      <div className="text-xs text-muted-foreground">
                        Maximize battery lifespan
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="charge-protection">Overcharge Protection</Label>
              <div className="text-sm text-muted-foreground">
                Stop charging at 95% to protect battery
              </div>
            </div>
            <Switch id="charge-protection" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="discharge-protection">Deep Discharge Protection</Label>
              <div className="text-sm text-muted-foreground">
                Prevent discharge below 10%
              </div>
            </div>
            <Switch id="discharge-protection" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Energy Optimization</CardTitle>
          <CardDescription>Advanced power management features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="eco-mode">Eco Mode</Label>
              <div className="text-sm text-muted-foreground">
                Reduce power consumption during low usage
              </div>
            </div>
            <Switch id="eco-mode" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="peak-shaving">Peak Shaving</Label>
              <div className="text-sm text-muted-foreground">
                Reduce load during peak hours
              </div>
            </div>
            <Switch id="peak-shaving" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="priority-charging">Priority Charging</Label>
              <div className="text-sm text-muted-foreground">
                Charge battery before powering loads
              </div>
            </div>
            <Switch id="priority-charging" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
