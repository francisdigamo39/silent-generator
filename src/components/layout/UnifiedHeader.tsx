import { LiveDot } from "./LiveDot";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: "lucide:layout-dashboard" },
  { label: "Analytics", icon: "lucide:bar-chart-3" },
  { label: "Configuration", icon: "lucide:settings" },
];

type UnifiedHeaderProps = {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  live: boolean;
  setLive: (live: boolean) => void;
};

export function UnifiedHeader({
  activeTab = "Dashboard",
  onTabChange,
  live,
  setLive,
}: UnifiedHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="Silent Generator" className="h-6 w-6" />
          <span className="font-semibold text-lg hidden sm:inline">Silent Generator</span>
          <span className="font-semibold text-lg sm:hidden">SG</span>
        </div>

        {/* Navigation Pills Container */}
        <nav className="hidden md:flex items-center gap-2 bg-muted rounded-full px-2 py-1.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "px-4 py-1.5 rounded-full transition-colors text-sm font-medium",
                activeTab === item.label
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              )}
              onClick={() => onTabChange?.(item.label)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Live Indicator */}
          <button
            onClick={() => setLive(!live)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <LiveDot live={live} />
            <span className="hidden sm:inline text-sm font-medium">
              {live ? "Live" : "Paused"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
