// src/App.tsx
import { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { TestSidebar } from "@/pages/TestSidebar";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Test sidebar route using hash
  const [showTestSidebar, setShowTestSidebar] = useState(
    window.location.hash === '#test-sidebar'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setShowTestSidebar(window.location.hash === '#test-sidebar');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showTestSidebar) {
    return <TestSidebar />;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-background transition-colors">
        <AppSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          theme={theme}
          setTheme={setTheme}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div
          className="transition-all duration-300 py-6"
          style={{
            marginLeft: sidebarCollapsed ? '4rem' : '15rem'
          }}
        >
          {/* Only Dashboard - No Analytics or Configuration */}
          <Dashboard />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;