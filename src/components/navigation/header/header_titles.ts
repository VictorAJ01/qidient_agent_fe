import { sidebarRoutes, SidebarRoutes } from "@/routes";

export type HeaderInfo = {
  title: string;
  description: string;
  path: SidebarRoutes;
};

export const headerInfo: Array<HeaderInfo> = [
  {
    title: "My Overview",
    path: sidebarRoutes.overview,
    description: "Track and visualize key performance metrics and data trends",
  },
  {
    title: "Listings",
    path: sidebarRoutes.listings,
    description: "Manage performance metrics, listings, and commission details",
  },
  {
    title: "Listings",
    path: sidebarRoutes.viewClient,
    description: "Manage performance metrics, listings, and commission details",
  },
  {
    title: "Clients",
    path: sidebarRoutes.clients,
    description: "View and manage your clients here",
  },
  {
    title: "Client Details",
    path: sidebarRoutes.viewClient,
    description: "View and manage your clients here",
  },
  {
    title: "Leads and Inquiries",
    path: sidebarRoutes.leads,
    description: "View and manage your leads here",
  },
  {
    title: "Leads Details",
    path: sidebarRoutes.viewLeads,
    description: "View and manage your leads here",
  },
  {
    title: "Bookings",
    path: sidebarRoutes.bookings,
    description: "View and manage your bookings here",
  },
  {
    title: "Analytics",
    path: sidebarRoutes.analytics,
    description:
      "View detailed financial reports based on user activity, listing performance, search trends.",
  },
  {
    title: "Profile Settings",
    path: sidebarRoutes.profile,
    description: "View and modify your profile information",
  },
];
