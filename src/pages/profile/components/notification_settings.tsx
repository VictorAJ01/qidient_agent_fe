import { Button, Switch } from "@heroui/react";

const notificationSettings = [
  {
    id: "security-alerts",
    label: "Security Alerts",
    defaultSelected: true,
  },
  {
    id: "user-activity",
    label: "User Activity",
  },
  {
    id: "listing-alerts",
    label: "Listing Alerts",
    defaultSelected: true,
  },
  {
    id: "email-notifications",
    label: "Email Notifications",
  },
  {
    id: "push-notifications",
    label: "Push Notifications",
    defaultSelected: true,
  },
];

export default function NotificationSettings() {
  return (
    <div className="space-y-8">
      <div className="space-y-5">
        {notificationSettings.map((setting) => (
          <div key={setting.id} className="flex items-center gap-3">
            <Switch
              defaultSelected={setting.defaultSelected || false}
              id={setting.id}
              size="sm"
            />
            <p className="text-base font-light">{setting.label}</p>
          </div>
        ))}
      </div>

      <Button className="w-full md:w-min px-12" color="primary" radius="sm">
        Save Changes
      </Button>
    </div>
  );
}
