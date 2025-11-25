import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ConnectivityCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Connectivity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon icon="lucide:wifi" className="h-4 w-4" /> Wi‑Fi
          </div>
          <Badge variant="secondary">Good</Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon icon="lucide:signal" className="h-4 w-4" /> Signal
          </div>
          <div className="text-sm font-medium">-62 dBm</div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Icon icon="lucide:refresh-cw" className="h-4 w-4 mr-1" /> Ping
          </Button>
          <Button size="sm">
            <Icon icon="lucide:upload" className="h-4 w-4 mr-1" /> Sync
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
