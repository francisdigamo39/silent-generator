import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export function NotificationsSettings() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Receive alerts and updates via email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                defaultValue="user@example.com"
                className="flex-1"
              />
              <Button variant="outline">Verify</Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-critical">Critical Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  System failures and urgent issues
                </div>
              </div>
              <Switch id="email-critical" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-battery">Battery Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Low battery and charging notifications
                </div>
              </div>
              <Switch id="email-battery" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-reports">Daily Reports</Label>
                <div className="text-sm text-muted-foreground">
                  Energy generation and usage summaries
                </div>
              </div>
              <Switch id="email-reports" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Instant alerts on your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="push-enabled">Enable Push Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive real-time alerts
              </div>
            </div>
            <Switch id="push-enabled" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="push-sound">Sound</Label>
              <div className="text-sm text-muted-foreground">
                Play sound for notifications
              </div>
            </div>
            <Switch id="push-sound" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="push-vibrate">Vibration</Label>
              <div className="text-sm text-muted-foreground">
                Vibrate on notification
              </div>
            </div>
            <Switch id="push-vibrate" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alert Thresholds</CardTitle>
          <CardDescription>Configure when to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="battery-low">Low Battery Threshold</Label>
            <div className="flex items-center gap-4">
              <Input
                id="battery-low"
                type="number"
                defaultValue="20"
                min="5"
                max="50"
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Alert when battery drops below this level
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="temp-high">High Temperature Threshold</Label>
            <div className="flex items-center gap-4">
              <Input
                id="temp-high"
                type="number"
                defaultValue="60"
                min="40"
                max="80"
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">°C</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Alert when temperature exceeds this value
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="power-threshold">Power Output Threshold</Label>
            <div className="flex items-center gap-4">
              <Input
                id="power-threshold"
                type="number"
                defaultValue="250"
                min="100"
                max="300"
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">W</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Alert when output exceeds this wattage
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>Recent alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 text-sm">
              <Icon icon="lucide:check-circle" className="h-5 w-5 text-accent mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-medium">Battery fully charged</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 text-sm">
              <Icon icon="lucide:info" className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-medium">Daily report generated</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 text-sm">
              <Icon icon="lucide:alert-triangle" className="h-5 w-5 text-destructive mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-medium">Low battery warning (15%)</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Icon icon="lucide:history" className="h-4 w-4" />
                View All History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
