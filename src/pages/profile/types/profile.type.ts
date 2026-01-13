export enum PROFILE_TABS {
  GeneralInformation = "general information",
  SecuritySettings = "security settings",
  NotificationSettings = "notification settings",
}

export type UserRole = "user" | "agent" | "super-admin";

export type GetUserResponsePayload = {
  _id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: UserRole;
  status: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  notifications: NotificationSettingsPayload | null;
};

export type NotificationSettingsPayload = {
  securityAlerts: boolean;
  userActivity: boolean;
  listingAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
};
