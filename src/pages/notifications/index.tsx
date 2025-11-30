/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { Divider, User } from "@heroui/react";

import PushNotificationPermissionCard from "./components/push_notification_permission_card";

enum NotificationsTab {
  overview = "Overview",
  sharedWithMe = "Shared with me",
  comments = "Comments",
}

const notificationsTabs = [
  NotificationsTab.overview,
  NotificationsTab.sharedWithMe,
  NotificationsTab.comments,
];

const notificationsOverview = [
  {
    from: "Someone",
    title: "🎉  First view on Cosgrove Property",
    content: "watched・about 13 hours ago",
  },
  {
    from: "User1234",
    title: "🎉  Purchase on Joel Obi's Terrace Duplex",
    content: "purchased・about 2 days ago",
  },
  {
    from: "User1234",
    title: "🎉 New Listing submitted",
    content: "listed a property・about 2 days ago",
  },
  {
    from: "User1234",
    title: "🎉  Purchase on Joel Obi's Terrace Duplex",
    content: "purchased・about 2 days ago",
  },
];

export default function NotificationsPage() {
  const [currentTab, setCurrentTab] = useState(notificationsTabs[0]);

  return (
    <div className="py-4 space-y-5">
      <PushNotificationPermissionCard />
      <h1 className="font-bold text-3xl">Notifications</h1>

      <div>
        <div className="flex items-start gap-4">
          {notificationsTabs.map((tab) => (
            <div
              key={tab}
              className={`${tab === currentTab ? "border-b-3 border-primary font-bold" : "text-gray-400 font-medium"} pb-2 cursor-pointer`}
              onClick={() => setCurrentTab(tab)}
            >
              <p className="space-y-2">{tab}</p>
            </div>
          ))}
        </div>
        <Divider />
      </div>

      <div>
        {notificationsOverview.map((overview, index) => (
          <div key={index}>
            <div className="flex items-start gap-2 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <div className="font-bold text-sm space-y-3">
                <p className="font-light">{overview.title}</p>
                <div className="flex items-center gap-1.5">
                  <User name={overview.from} />
                  <p className="font-normal">{overview.content}</p>
                </div>
              </div>
            </div>

            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}
