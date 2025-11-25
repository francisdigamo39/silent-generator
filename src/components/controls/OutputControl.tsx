import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Telemetry } from "@/types";

type OutputControlProps = {
  tele: Telemetry;
  limitW: number[];
  setLimitW: (value: number[]) => void;
};

export function OutputControl({ tele, limitW, setLimitW }: OutputControlProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Output</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon icon="lucide:power" className="h-4 w-4" /> Output Power
          </div>
          <Switch checked={tele.outputOn} onCheckedChange={() => { /* demo only */ }} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon icon="lucide:plug-zap" className="h-4 w-4" /> Mode
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">{tele.outputMode}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>AC</DropdownMenuItem>
              <DropdownMenuItem>DC</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Label className="text-xs">Output Limit (W)</Label>
          <Slider value={limitW} onValueChange={setLimitW} max={300} step={10} className="mt-2" />
          <div className="text-xs text-muted-foreground mt-1">{limitW[0]} W</div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Icon icon="lucide:play" className="h-4 w-4 mr-1" /> Start
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Icon icon="lucide:pause" className="h-4 w-4 mr-1" /> Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
