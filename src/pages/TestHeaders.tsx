import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TestHeaders() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Top Menu Bar Options</h1>
          <p className="text-muted-foreground">Modern header designs for your dashboard</p>
        </div>

        {/* Option 1: Pill-Style Navigation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">Option 1:</span>
            <span className="text-neutral-600">Pill-Style Navigation (Current Screenshot Style)</span>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <header className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:sun" className="h-6 w-6" />
                <span className="font-semibold text-lg">Solnest</span>
              </div>

              <nav className="flex items-center gap-2 bg-neutral-100 rounded-full px-2 py-1.5">
                <button className="px-4 py-1.5 rounded-full hover:bg-white transition-colors text-sm font-medium">
                  Dashboard
                </button>
                <button className="px-4 py-1.5 rounded-full hover:bg-white transition-colors text-sm font-medium">
                  Chart
                </button>
                <button className="px-4 py-1.5 rounded-full hover:bg-white transition-colors text-sm font-medium">
                  Totals
                </button>
                <button className="px-4 py-1.5 rounded-full hover:bg-white transition-colors text-sm font-medium">
                  Power
                </button>
                <button className="px-4 py-1.5 rounded-full hover:bg-white transition-colors text-sm font-medium">
                  Configuration
                </button>
              </nav>

              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Other services
                      <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Service 1</DropdownMenuItem>
                    <DropdownMenuItem>Service 2</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="bg-neutral-700 hover:bg-neutral-800 rounded-full">
                  Add New Solar
                </Button>
              </div>
            </header>
          </div>
        </div>

        {/* Option 2: Borderless Flat Navigation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">Option 2:</span>
            <span className="text-neutral-600">Borderless Flat Navigation</span>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <header className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:sun" className="h-6 w-6" />
                <span className="font-semibold text-lg">Solnest</span>
              </div>

              <nav className="flex items-center gap-1">
                <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-500">
                  Dashboard
                </button>
                <button className="px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition-colors border-b-2 border-transparent">
                  Chart
                </button>
                <button className="px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition-colors border-b-2 border-transparent">
                  Totals
                </button>
                <button className="px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition-colors border-b-2 border-transparent">
                  Power
                </button>
                <button className="px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition-colors border-b-2 border-transparent">
                  Configuration
                </button>
              </nav>

              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Other services
                      <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Service 1</DropdownMenuItem>
                    <DropdownMenuItem>Service 2</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">Add New Solar</Button>
              </div>
            </header>
          </div>
        </div>

        {/* Option 3: Segmented Control Style */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">Option 3:</span>
            <span className="text-neutral-600">Segmented Control Style</span>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <header className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:sun" className="h-6 w-6" />
                <span className="font-semibold text-lg">Solnest</span>
              </div>

              <div className="flex items-center border border-neutral-200 rounded-lg p-1">
                <button className="px-3 py-1.5 text-sm font-medium bg-white rounded-md shadow-sm">
                  Dashboard
                </button>
                <button className="px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 rounded-md">
                  Chart
                </button>
                <button className="px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 rounded-md">
                  Totals
                </button>
                <button className="px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 rounded-md">
                  Power
                </button>
                <button className="px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 rounded-md">
                  Config
                </button>
              </div>

              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Other services
                      <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Service 1</DropdownMenuItem>
                    <DropdownMenuItem>Service 2</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">Add New Solar</Button>
              </div>
            </header>
          </div>
        </div>

        {/* Option 4: Icon + Label Navigation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">Option 4:</span>
            <span className="text-neutral-600">Icon + Label Navigation</span>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <header className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:sun" className="h-6 w-6" />
                <span className="font-semibold text-lg">Solnest</span>
              </div>

              <nav className="flex items-center gap-1">
                <button className="flex flex-col items-center px-3 py-1 text-xs font-medium bg-neutral-100 rounded-lg">
                  <Icon icon="lucide:layout-dashboard" className="h-4 w-4 mb-0.5" />
                  Dashboard
                </button>
                <button className="flex flex-col items-center px-3 py-1 text-xs font-medium hover:bg-neutral-50 rounded-lg">
                  <Icon icon="lucide:bar-chart-2" className="h-4 w-4 mb-0.5" />
                  Chart
                </button>
                <button className="flex flex-col items-center px-3 py-1 text-xs font-medium hover:bg-neutral-50 rounded-lg">
                  <Icon icon="lucide:calculator" className="h-4 w-4 mb-0.5" />
                  Totals
                </button>
                <button className="flex flex-col items-center px-3 py-1 text-xs font-medium hover:bg-neutral-50 rounded-lg">
                  <Icon icon="lucide:zap" className="h-4 w-4 mb-0.5" />
                  Power
                </button>
                <button className="flex flex-col items-center px-3 py-1 text-xs font-medium hover:bg-neutral-50 rounded-lg">
                  <Icon icon="lucide:settings" className="h-4 w-4 mb-0.5" />
                  Config
                </button>
              </nav>

              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Other services
                      <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Service 1</DropdownMenuItem>
                    <DropdownMenuItem>Service 2</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">Add New Solar</Button>
              </div>
            </header>
          </div>
        </div>

        {/* Option 5: Split Header (Two Rows) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">Option 5:</span>
            <span className="text-neutral-600">Split Header (Two Rows)</span>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <div className="space-y-0">
              <div className="flex items-center justify-between h-12 px-6 border-b">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:sun" className="h-5 w-5" />
                  <span className="font-semibold">Solnest</span>
                </div>
                <div className="flex items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Other services
                        <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Service 1</DropdownMenuItem>
                      <DropdownMenuItem>Service 2</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm">Add New Solar</Button>
                </div>
              </div>
              <nav className="flex items-center gap-8 h-12 px-6">
                <button className="text-sm font-medium border-b-2 border-blue-500 h-full">
                  Dashboard
                </button>
                <button className="text-sm font-medium hover:text-neutral-700 h-full">
                  Chart
                </button>
                <button className="text-sm font-medium hover:text-neutral-700 h-full">
                  Totals
                </button>
                <button className="text-sm font-medium hover:text-neutral-700 h-full">
                  Power
                </button>
                <button className="text-sm font-medium hover:text-neutral-700 h-full">
                  Configuration
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Option 6: Floating Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">Option 6:</span>
            <span className="text-neutral-600">Floating Header with Glassmorphism</span>
          </div>
          <div className="border rounded-lg p-8 bg-gradient-to-br from-blue-50 to-neutral-50">
            <header className="flex items-center justify-between h-16 px-6 mx-auto max-w-6xl bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:sun" className="h-6 w-6" />
                <span className="font-semibold text-lg">Solnest</span>
              </div>

              <nav className="flex items-center gap-6">
                <button className="text-sm font-medium border-b-2 border-blue-500 pb-1">
                  Dashboard
                </button>
                <button className="text-sm font-medium hover:text-neutral-700 pb-1">
                  Chart
                </button>
                <button className="text-sm font-medium hover:text-neutral-700 pb-1">
                  Totals
                </button>
                <button className="text-sm font-medium hover:text-neutral-700 pb-1">
                  Power
                </button>
                <button className="text-sm font-medium hover:text-neutral-700 pb-1">
                  Configuration
                </button>
              </nav>

              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Other services
                      <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Service 1</DropdownMenuItem>
                    <DropdownMenuItem>Service 2</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="rounded-full">Add New Solar</Button>
              </div>
            </header>
          </div>
        </div>

        <div className="text-center pt-8 pb-12">
          <a href="/" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
