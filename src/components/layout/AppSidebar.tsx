import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { id: "Dashboard", label: "Dashboard", icon: "lucide:layout-dashboard" },
];

type AppSidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme: string;
  setTheme: (theme: string | ((t: string) => string)) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export function AppSidebar({
  activeTab,
  onTabChange,
  theme,
  setTheme,
  collapsed,
  setCollapsed,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r bg-card transition-all duration-300",
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
                variant="ghost"
                className={cn(
                  "w-full transition-all hover:bg-muted",
                  collapsed ? "justify-center px-2" : "justify-start",
                  activeTab === item.id && "bg-[#97CE16] hover:bg-[#97CE16]/90"
                )}
                onClick={() => onTabChange(item.id)}
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
        {/* Theme Toggle */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className={cn(
                "w-full transition-all",
                collapsed ? "justify-center px-2" : "justify-start"
              )}
            >
              <Icon
                icon={theme === "dark" ? "lucide:moon" : "lucide:sun"}
                className={cn("h-4 w-4", !collapsed && "mr-3")}
              />
              {!collapsed && <span className="text-sm">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>}
            </Button>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">
              <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
            </TooltipContent>
          )}
        </Tooltip>

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
  );
}
