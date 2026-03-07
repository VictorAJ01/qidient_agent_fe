import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { Header, Sidebar } from "@/components/navigation";
import { useGetAgent } from "@/pages/profile/hooks/use_get_agent";
import SessionExpiredModal from "@/components/general/session_expired_modal";
import { authRoutes } from "@/routes";
import { resetCredentials } from "@/common";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { isError, error } = useGetAgent();

  useEffect(() => {
    if (isError) {
      onOpen();
    }
  }, [isError]);

  const handleNavigateToLogin = () => {
    navigate(authRoutes.login);
    resetCredentials();
  };

  return (
    <>
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

      <SessionExpiredModal
        errorMessage={error || "Your session has expired. Please log in again."}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onPress={handleNavigateToLogin}
      />
    </>
  );
}
