import { Link } from "@heroui/react";
import { NavLink, useLocation } from "react-router-dom";

import { SidebarLinkT } from "./sidebar_links";

// import { sidebarRoutes } from "@/routes";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
};

export const SidebarLink = (props: SidebarProps & SidebarLinkT) => {
  const Icon = props.icon;
  const location = useLocation();

  const exactLocation = location.pathname === props.pathname;

  // const isUserDetailsRoute =
  //   props.pathname === sidebarRoutes.users &&
  //   location.pathname.startsWith(`${sidebarRoutes.users}/`);

  // const isAgentDetailsRoute =
  //   props.pathname === sidebarRoutes.agents &&
  //   location.pathname.startsWith(`${sidebarRoutes.agents}/`);

  // const isBlogDetailsRoute =
  //   props.pathname === sidebarRoutes.blog &&
  //   location.pathname.startsWith(`${sidebarRoutes.blog}/`);

  // const isPropertyDetailsRoute =
  //   props.pathname === sidebarRoutes.properties &&
  //   location.pathname.startsWith(`${sidebarRoutes.properties}/`);

  const isActive = exactLocation;
  // exactLocation ||
  // isUserDetailsRoute ||
  // isBlogDetailsRoute ||
  // isAgentDetailsRoute ||
  // isPropertyDetailsRoute;

  const closeSidebar = () => {
    if (props.sidebarOpen) {
      props.setSidebarOpen(false);
    }
  };

  return (
    <Link
      as={NavLink}
      className={`z-10 group relative flex w-52 min-h-12 items-center gap-2 rounded-md py-1.5 px-1 text-dark duration-400 ease-in-out transition-width ${
        isActive ? "text-white bg-primary" : ""
      }`}
      to={props.pathname}
      onClick={closeSidebar}
    >
      {isActive && <div className="rounded-md bg-white w-1.5 h-9" />}
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon
            className={`text-qidient-gray-text text-xl text-center w-5 h-5 ${
              isActive && "text-white bg-primary"
            }`}
          />
        )}
        <div
          className={`font-normal text-base text-qidient-gray-text ${
            isActive ? "text-white bg-primary" : ""
          } `}
        >
          {props.title}
        </div>
      </div>
    </Link>
  );
};
