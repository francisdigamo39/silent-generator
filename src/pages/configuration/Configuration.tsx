import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import { SystemSettings } from "./components/SystemSettings";
import { PowerManagement } from "./components/PowerManagement";
import { NotificationsSettings } from "./components/NotificationsSettings";

type ConfigurationProps = {
  device: string;
  setDevice: (device: string) => void;
  autoMode: boolean;
  setAutoMode: (mode: boolean) => void;
  targetSoc: number[];
  setTargetSoc: (soc: number[]) => void;
  limitW: number[];
  setLimitW: (limit: number[]) => void;
};

export function Configuration({
  device,
  setDevice,
  autoMode,
  setAutoMode,
  targetSoc,
  setTargetSoc,
  limitW,
  setLimitW,
}: ConfigurationProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Manage your system settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList>
          <TabsTrigger value="system" className="gap-2">
            <Icon icon="lucide:settings" className="h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="power" className="gap-2">
            <Icon icon="lucide:zap" className="h-4 w-4" />
            Power Management
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Icon icon="lucide:bell" className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          <SystemSettings
            device={device}
            setDevice={setDevice}
          />
        </TabsContent>

        <TabsContent value="power" className="space-y-6">
          <PowerManagement
            autoMode={autoMode}
            setAutoMode={setAutoMode}
            targetSoc={targetSoc}
            setTargetSoc={setTargetSoc}
            limitW={limitW}
            setLimitW={setLimitW}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationsSettings />
        </TabsContent>
      </Tabs>
    </main>
  );
}
