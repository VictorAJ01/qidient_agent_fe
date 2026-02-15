import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FiBarChart2 } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { User } from "@heroui/react";

import { headerInfo } from "./header_titles";

import OverviewStatsCard from "@/pages/overview/components/overview_stats_card";
import { sidebarRoutes } from "@/routes";
import { getUserRole } from "@/utils/helper";
import { useGetUser } from "@/pages/profile/hooks/use_get_admin";
import { UserRole } from "@/pages/profile/types/profile.type";

type HeadProps = {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
};

export default function Header(props: HeadProps) {
  const location = useLocation();
  const params = useParams();
  const { user } = useGetUser();

  const clientDetailsRoute =
    location.pathname === `${sidebarRoutes.clients}/${params.id}`;

  const leadDetailsRoute =
    location.pathname === `${sidebarRoutes.leads}/${params.id}`;

  const listingDetailsRoute =
    location.pathname === `${sidebarRoutes.listings}/${params.id}`;

  const isDisplayHeader = location.pathname !== sidebarRoutes.notifications;

  const isAddHeadingVerticalPadding =
    location.pathname === sidebarRoutes.overview ||
    location.pathname === sidebarRoutes.clients;

  const handleOpenSidebar = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    props.setSidebarOpen(!props.sidebarOpen);
  };

  return (
    <>
      {isDisplayHeader && (
        <header
          className={`w-full bg-white space-y-6 lg:space-y-8 rounded-b-xl md:rounded-lg px-4 py-2 pb-6 md:p-4 lg:px-5 ${isAddHeadingVerticalPadding ? "lg:pt-6" : ""}`}
        >
          <div className="flex flex-grow items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
              <button
                aria-controls="sidebar"
                className="z-20 block lg:hidden text-2xl"
                onClick={handleOpenSidebar}
              >
                <HiOutlineMenuAlt2 />
              </button>

              <Link className="flex-shrink-0 hidden" to="/">
                <FiBarChart2 />
              </Link>
            </div>
            <div className="pl-5 md:pl-0">
              {headerInfo.map((info) => {
                const matchRoute = location.pathname === info.path;

                if (matchRoute)
                  return (
                    <div key={info.path} className="flex flex-col">
                      <h1 className="text-lg md:text-2xl font-semibold text-black2">
                        {info.title}
                      </h1>
                      <span className="text-sm hidden sm:block font-normal text-agency-purple-200">
                        {info.description}
                      </span>
                    </div>
                  );
              })}

              {listingDetailsRoute && (
                <div className="flex flex-col">
                  <h1 className="text-lg md:text-2xl font-medium sm:font-semibold text-black">
                    {headerInfo[2].title}
                  </h1>
                  <span className="text-base hidden sm:block font-normal text-agency-purple-200">
                    {headerInfo[2].description}
                  </span>
                </div>
              )}

              {clientDetailsRoute && (
                <div className="flex flex-col">
                  <h1 className="text-lg md:text-2xl font-medium sm:font-semibold text-black">
                    {headerInfo[4].title}
                  </h1>
                  <span className="text-base hidden sm:block font-normal text-agency-purple-200">
                    {headerInfo[4].description}
                  </span>
                </div>
              )}

              {leadDetailsRoute && (
                <div className="flex flex-col">
                  <h1 className="text-lg md:text-2xl font-medium sm:font-semibold text-black">
                    {headerInfo[6].title}
                  </h1>
                  <span className="text-base hidden sm:block font-normal text-agency-purple-200">
                    {headerInfo[6].description}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-6">
              {location.pathname !== sidebarRoutes.profile && (
                <Link className="px-4" to={sidebarRoutes.profile}>
                  <User
                    avatarProps={{
                      src: user?.avatar,
                      showFallback: true,
                    }}
                    className="transition-transform hidden md:flex gap-3"
                    classNames={{
                      name: "font-medium text-black",
                      description: "font-rubik text-secondary-100",
                    }}
                    description={getUserRole(user?.role as UserRole)}
                    name={`${user?.firstName} ${user?.lastName}`}
                  />
                </Link>
              )}
            </div>
          </div>

          {location.pathname === sidebarRoutes.overview && (
            <OverviewStatsCard />
          )}
        </header>
      )}
    </>
  );
}
