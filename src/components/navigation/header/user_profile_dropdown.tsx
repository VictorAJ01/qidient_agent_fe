import React from "react";
import {
  Avatar,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  User,
} from "@heroui/react";
import { FaChevronDown, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { sidebarRoutes } from "@/routes";
import LogoutModal from "@/components/general/logout_modal";
import { useGetUser } from "@/pages/profile/hooks/use_get_admin";
import { getUserRole } from "@/utils/helper";
import { UserRole } from "@/pages/profile/types/profile.type";

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const logoutModal = useDisclosure();
  const navigate = useNavigate();
  const { user } = useGetUser();

  const getProfileMenu = () => {
    return [
      {
        title: "Profile",
        icon: FaRegUserCircle,
        action: () => navigate(sidebarRoutes.profile),
      },
      {
        title: "Log out",
        icon: AiOutlineLogout,
        action: () => {
          setIsOpen(false);
          logoutModal.onOpen();
        },
      },
    ];
  };

  return (
    <>
      <Popover
        isOpen={isOpen}
        placement="bottom"
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          <div
            className={`flex items-center justify-center group md:gap-2 bg-transparent hover:bg-purple-90/10 rounded-full md:rounded-xl cursor-pointer p-2 md:py-2 md:px-3 ${isOpen ? "bg-gray-100" : ""}`}
          >
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
            <Avatar
              showFallback
              className="transition-transform block md:hidden"
              src={user?.avatar}
            />
            <div
              className={`hidden md:block group-hover:visible ${isOpen ? "visible" : "invisible"}`}
            >
              <FaChevronDown />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 shadow w-48 mt-1">
          <Listbox
            aria-label="Listbox menu with icons"
            className="p-2 gap-0 divide-y divide-default-300/50 max-w-[300px] overflow-visible shadow-small rounded-medium"
            itemClasses={{
              base: "px-3 rounded-small gap-3 h-12 data-[hover=true]:bg-agency-purple-100/10",
            }}
          >
            {getProfileMenu().map((list) => {
              const Icon = list.icon;

              return (
                <ListboxItem
                  key={list.title}
                  startContent={
                    <Icon
                      className="text-default-500 pointer-events-none flex-shrink-0"
                      size="1.25rem"
                    />
                  }
                  {...(list.action && { onPress: list.action })}
                  // {...(list.link && { as: Link, to: list.link })}
                  className="text-xg px-3"
                >
                  {list.title}
                </ListboxItem>
              );
            })}
          </Listbox>
        </PopoverContent>
      </Popover>
      <LogoutModal
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.onClose}
        onOpenChange={logoutModal.onOpenChange}
      />
    </>
  );
}
