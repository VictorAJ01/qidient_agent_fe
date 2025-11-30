import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "@/components/navigation";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-light-primary-bg h-screen">
      <div className="flex h-full overflow-hidden">
        <Sidebar
          setSidebarOpen={setIsSidebarOpen}
          sidebarOpen={isSidebarOpen}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-hidden md:p-4 space-y-4">
          <Header
            setSidebarOpen={setIsSidebarOpen}
            sidebarOpen={isSidebarOpen}
          />
          <main>
            <div className="mx-auto px-4 md:px-0">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
