/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Divider, Image, ScrollShadow, useDisclosure } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";
import { AiOutlineLogout } from "react-icons/ai";
import { TfiPieChart } from "react-icons/tfi";

import { sidebarLinks } from "./sidebar_links";
import { SidebarLink } from "./sidebar_link";

import Logo from "@/assets/logo.png";
import { sidebarRoutes } from "@/routes";
import LogoutModal from "@/components/general/logout_modal";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [focused, setFocused] = React.useState<string | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  const closeSidebar = React.useCallback(
    () => setSidebarOpen(false),
    [setSidebarOpen]
  );

  React.useEffect(() => {
    const clickOutsideHandler = ({ target }: MouseEvent) => {
      if (
        sidebarOpen &&
        !sidebarRef.current?.contains(target as Node) &&
        !triggerRef.current?.contains(target as Node) &&
        !backdropRef.current?.contains(target as Node)
      ) {
        closeSidebar();
      }
    };

    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (sidebarOpen && keyCode === 27) {
        closeSidebar();
      }
    };

    document.addEventListener("click", clickOutsideHandler);
    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("click", clickOutsideHandler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [sidebarOpen, closeSidebar]);

  React.useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (sidebarOpen && keyCode === 27) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  const logoutModal = useDisclosure();

  return (
    <>
      {sidebarOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
          onClick={() => closeSidebar()}
        ></div>
      )}
      <aside
        ref={sidebarRef}
        className={`fixed h-full left-0 top-0 z-50 flex flex-col items-start justify-start overflow-y-clip bg-white transition-transform duration-300 ease-linear lg:static lg:translate-x-0 space-y-6 animate-sidebar-width-inc overflow-x-hidden px-4 py-6 ${
          sidebarOpen ? "translate-x-0 rounded-none" : "-translate-x-full"
        }`}
      >
        <div className="w-full">
          <Image
            alt="Logo"
            className="object-contain"
            height={52}
            src={Logo}
            width={96}
          />
        </div>

        <div className="w-full flex flex-col overflow-y-auto duration-300 ease-linear">
          <ScrollShadow as="nav" hideScrollBar={true}>
            <div className="overflow-x-hidden w-full">
              <ul className={`flex flex-col gap-3`}>
                {sidebarLinks.map((link) => (
                  <li
                    key={link.pathname}
                    className="group relative"
                    onMouseEnter={() => setFocused(link.title)}
                  >
                    <SidebarLink
                      icon={link.icon}
                      pathname={link.pathname}
                      setSidebarOpen={closeSidebar}
                      sidebarOpen={sidebarOpen}
                      title={link.title}
                    />
                    {focused === link.title ? (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 w-full h-full group-hover:text-dark bg-agency-purple-100/30 px-5 pr-8 m-0 z-0 rounded-lg space-x-0"
                        layoutId="highlight"
                        transition={{
                          layout: {
                            duration: 0.2,
                            ease: "easeOut",
                          },
                        }}
                      />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollShadow>
          <Divider className="my-2" />
          <ul className="flex flex-col gap-3 pb-4">
            <li className="group relative hover:bg-agency-purple-100/30 duration-300 ease-linear rounded-lg">
              <SidebarLink
                icon={TfiPieChart}
                pathname={sidebarRoutes.analytics}
                setSidebarOpen={closeSidebar}
                sidebarOpen={sidebarOpen}
                title="Analytics"
              />
            </li>
          </ul>

          <div className="w-full overflow-hidden pt-[calc(100vh-55rem)] space-y-4 absolute bottom-0">
            <ul className="flex flex-col gap-3 pb-4">
              {/* <li className="group relative hover:bg-agency-purple-100/30 duration-300 ease-linear rounded-lg">
                <SidebarLink
                  icon={FaRegUserCircle}
                  pathname={sidebarRoutes.profile}
                  setSidebarOpen={closeSidebar}
                  sidebarOpen={sidebarOpen}
                  title="Profile"
                />
              </li> */}
              <li
                className="group flex items-center gap-3 hover:bg-agency-purple-100/30 duration-300 ease-linear cursor-pointer rounded-lg py-3"
                onClick={logoutModal.onOpen}
              >
                <AiOutlineLogout className="w-5 h-5 text-dark text-xl text-center" />
                <div>Logout</div>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <LogoutModal
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.onClose}
        onOpenChange={logoutModal.onOpenChange}
      />
    </>
  );
}
