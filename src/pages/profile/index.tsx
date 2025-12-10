import { User } from "@heroui/react";
import { useSearchParams } from "react-router-dom";

import GeneralInformation from "./components/general_information";
import SecuritySettings from "./components/security_settings";
import NotificationSettings from "./components/notification_settings";
import { PROFILE_TABS } from "./profile.type";

const profileTabs = [
  PROFILE_TABS.GeneralInformation,
  PROFILE_TABS.SecuritySettings,
  PROFILE_TABS.NotificationSettings,
];

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || PROFILE_TABS.GeneralInformation;

  const handleTabChange = (tab: PROFILE_TABS) => setSearchParams({ tab });

  return (
    <div className="p-4 lg:p-6 bg-white rounded-lg space-y-10 lg:space-y-8">
      <div className="flex items-center justify-between gap-4">
        {profileTabs.map((tab) => (
          <button
            key={tab}
            className={`text-base capitalize cursor-pointer font-medium ${activeTab === tab ? "text-primary border-b-3 border-primary" : "text-gray-400"} hover:text-primary`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <User
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          className: "w-24 h-24",
        }}
        classNames={{
          name: "text-lg font-medium",
          description: "text-gray-400 text-sm font-normal",
        }}
        description="alexarawles@gmail.com"
        name="Praise Madumere"
      />

      {activeTab === PROFILE_TABS.GeneralInformation && <GeneralInformation />}
      {activeTab === PROFILE_TABS.SecuritySettings && <SecuritySettings />}
      {activeTab === PROFILE_TABS.NotificationSettings && (
        <NotificationSettings />
      )}
    </div>
  );
}
