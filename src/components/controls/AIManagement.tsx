import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type AIManagementProps = {
  autoMode: boolean;
  setAutoMode: (value: boolean) => void;
  targetSoc: number[];
  setTargetSoc: (value: number[]) => void;
};

export function AIManagement({ autoMode, setAutoMode, targetSoc, setTargetSoc }: AIManagementProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">AI Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon icon="lucide:cpu" className="h-4 w-4" /> Auto Mode
          </div>
          <Switch checked={autoMode} onCheckedChange={setAutoMode} />
        </div>
        <div>
          <Label className="text-xs">Target SOC</Label>
          <Slider value={targetSoc} onValueChange={setTargetSoc} max={100} step={1} className="mt-2" />
          <div className="text-xs text-muted-foreground mt-1">{targetSoc[0]}%</div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Icon icon="lucide:refresh-cw" className="h-4 w-4 mr-1" /> Recalculate
          </Button>
          <Button size="sm">
            <Icon icon="lucide:wrench" className="h-4 w-4 mr-1" /> Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
