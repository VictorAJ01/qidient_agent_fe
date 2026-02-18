import { IconType } from "react-icons";
import { RxDashboard } from "react-icons/rx";
import { GoBell } from "react-icons/go";
import { FiHome } from "react-icons/fi";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { TbTools } from "react-icons/tb";

import { sidebarRoutes, SidebarRoutes } from "@/routes";

export type SidebarLinkT = {
  title: string;
  icon: IconType;
  pathname: SidebarRoutes;
};

export const sidebarLinks: SidebarLinkT[] = [
  { title: "Overview", pathname: sidebarRoutes.overview, icon: RxDashboard },
  {
    title: "Listings",
    pathname: sidebarRoutes.listings,
    icon: FiHome,
  },
  {
    title: "Amenities",
    pathname: sidebarRoutes.amenities,
    icon: TbTools,
  },
  {
    title: "Clients",
    pathname: sidebarRoutes.clients,
    icon: PiUsersThreeBold,
  },
  {
    title: "Leads",
    pathname: sidebarRoutes.leads,
    icon: MdOutlineLeaderboard,
  },
  {
    title: "Bookings",
    pathname: sidebarRoutes.bookings,
    icon: MdAccessTime,
  },
  {
    title: "Notifications",
    pathname: sidebarRoutes.notifications,
    icon: GoBell,
  },
];
