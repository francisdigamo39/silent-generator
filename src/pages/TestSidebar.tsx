import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "lucide:layout-dashboard" },
  { id: "analytics", label: "Analytics", icon: "lucide:bar-chart-3" },
  { id: "configuration", label: "Configuration", icon: "lucide:settings" },
  { id: "devices", label: "Devices", icon: "lucide:cpu" },
];

const footerItems = [
  { id: "theme", label: "Toggle Theme", icon: "lucide:moon" },
  { id: "settings", label: "Settings", icon: "lucide:cog" },
  { id: "user", label: "User Profile", icon: "lucide:user" },
];

export function TestSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <aside
          className={cn(
            "flex flex-col border-r bg-card transition-all duration-300",
            collapsed ? "w-16" : "w-60"
          )}
        >
          {/* Header/Branding */}
          <div className="h-16 flex items-center px-4 border-b">
            {collapsed ? (
              <img src="/icon.png" alt="SG" className="h-8 w-8" />
            ) : (
              <div className="flex items-center gap-2">
                <img src="/icon.png" alt="Silent Generator" className="h-8 w-8" />
                <span className="font-semibold text-lg">Silent Generator</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Tooltip key={item.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeItem === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full transition-all",
                      collapsed ? "justify-center px-2" : "justify-start"
                    )}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <Icon icon={item.icon} className={cn("h-5 w-5", !collapsed && "mr-3")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-3 space-y-1 border-t">
            {footerItems.map((item) => (
              <Tooltip key={item.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full transition-all",
                      collapsed ? "justify-center px-2" : "justify-start"
                    )}
                  >
                    <Icon icon={item.icon} className={cn("h-4 w-4", !collapsed && "mr-3")} />
                    {!collapsed && <span className="text-sm">{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}

            {/* Collapse Toggle */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCollapsed(!collapsed)}
                  className={cn(
                    "w-full transition-all",
                    collapsed ? "justify-center px-2" : "justify-start"
                  )}
                >
                  <Icon
                    icon={collapsed ? "lucide:panel-left-open" : "lucide:panel-left-close"}
                    className={cn("h-4 w-4", !collapsed && "mr-3")}
                  />
                  {!collapsed && <span className="text-sm">Collapse</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>Expand Sidebar</p>
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sidebar Test Page</h1>
              <p className="text-muted-foreground">
                Testing collapsible sidebar with icon rail mode
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sidebar Features</CardTitle>
                <CardDescription>
                  This demo showcases the proposed sidebar layout for Silent Generator
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Icon icon="lucide:check-circle" className="h-5 w-5 text-green-500" />
                      Expanded Mode (240px)
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                      <li>• Full navigation labels visible</li>
                      <li>• Clear branding with logo + text</li>
                      <li>• Easy to scan and navigate</li>
                      <li>• Organized sections with footer</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Icon icon="lucide:check-circle" className="h-5 w-5 text-green-500" />
                      Collapsed Mode (64px)
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                      <li>• Icon rail for maximum space</li>
                      <li>• Tooltips on hover</li>
                      <li>• Logo-only branding</li>
                      <li>• Same functionality, less width</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Try It Out</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the "Collapse" button at the bottom of the sidebar to toggle between
                    expanded and icon rail modes. Notice how:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2 ml-4">
                    <li>• Smooth 300ms transition animation</li>
                    <li>• Tooltips appear in collapsed mode</li>
                    <li>• Active state persists across modes</li>
                    <li>• Icons remain visible and accessible</li>
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Comparison with Current Design</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                    <p><strong>Current:</strong> Floating top navigation bar</p>
                    <p><strong>Proposed:</strong> Fixed left sidebar with collapse</p>
                    <div className="pt-2 space-y-1 text-muted-foreground">
                      <p>✅ More professional/enterprise feel</p>
                      <p>✅ Better for many navigation items</p>
                      <p>✅ Saves vertical space (no top bar)</p>
                      <p>✅ Icon rail mode maximizes content area</p>
                      <p>✅ Familiar pattern from apps like Slack, Notion</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Option 1: Replace Top Nav (Recommended)</h4>
                    <p className="text-muted-foreground mt-1">
                      Remove the floating top navigation and use this sidebar as the primary
                      navigation. Branding moves to sidebar top.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold">Option 2: Hybrid Approach</h4>
                    <p className="text-muted-foreground mt-1">
                      Keep minimal top bar for branding + quick actions, use sidebar for
                      navigation. Best of both worlds but more UI elements.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Option 3: Context-Aware</h4>
                    <p className="text-muted-foreground mt-1">
                      Sidebar for desktop/tablet, hamburger menu for mobile. Responsive design
                      that adapts to screen size.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Current State</h3>
              <div className="text-sm text-muted-foreground">
                <p>Sidebar Mode: <span className="font-medium text-foreground">{collapsed ? "Collapsed (Icon Rail)" : "Expanded (Full)"}</span></p>
                <p>Active Page: <span className="font-medium text-foreground">{navItems.find(item => item.id === activeItem)?.label}</span></p>
                <p>Width: <span className="font-medium text-foreground">{collapsed ? "64px" : "240px"}</span></p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
