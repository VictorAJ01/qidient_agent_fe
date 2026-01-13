import { useState, useEffect } from "react";
import { addToast, Button, Switch } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNotificationSettingsApi } from "../api/profile.api";
import { NotificationSettingsPayload } from "../types/profile.type";
import { useGetUser } from "../hooks/use_get_admin";

import { queryKeys } from "@/utils/keys";

export default function NotificationSettings() {
  const queryClient = useQueryClient();
  const { user } = useGetUser();

  const [settings, setSettings] = useState<NotificationSettingsPayload>({
    securityAlerts: false,
    userActivity: false,
    listingAlerts: false,
    emailNotifications: false,
    pushNotifications: false,
  });

  useEffect(() => {
    if (user?.notifications) {
      setSettings(user.notifications);
    }
  }, [user]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: NotificationSettingsPayload) =>
      updateNotificationSettingsApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
      addToast({
        title: "Success",
        description: "Settings updated successfully",
        color: "success",
      });
    },
    onError: () =>
      addToast({
        title: "Error",
        description: "Failed to update settings",
        color: "danger",
      }),
  });

  const handleToggle = (key: keyof NotificationSettingsPayload) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveChanges = () => {
    mutate(settings);
  };

  const settingsConfig: {
    id: keyof NotificationSettingsPayload;
    label: string;
  }[] = [
    { id: "securityAlerts", label: "Security Alerts" },
    { id: "userActivity", label: "User Activity" },
    { id: "listingAlerts", label: "Listing Alerts" },
    { id: "emailNotifications", label: "Email Notifications" },
    { id: "pushNotifications", label: "Push Notifications" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        {settingsConfig.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Switch
              isSelected={settings[item.id]}
              size="sm"
              onValueChange={() => handleToggle(item.id)}
            />
            <p className="text-base font-light">{item.label}</p>
          </div>
        ))}
      </div>

      <Button
        className="w-full md:w-min px-12"
        color="primary"
        isLoading={isPending}
        radius="sm"
        onPress={handleSaveChanges}
      >
        Save Changes
      </Button>
    </div>
  );
}
