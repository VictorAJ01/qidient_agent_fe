export enum PROFILE_TABS {
  GeneralInformation = "general information",
  SecuritySettings = "security settings",
  NotificationSettings = "notification settings",
}

export type Role = "user" | "agent" | "super-admin";

export type NotificationSettingsPayload = {
  securityAlerts: boolean;
  userActivity: boolean;
  listingAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
};

export type Location = {
  lng: number;
  lat: number;
  place_id: number;
};

export type Agent = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  status: string;
  avatar?: string;
  notifications: NotificationSettingsPayload;
  aboutMe?: string;
  isVerified: boolean;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  location?: Location;
  createdAt: string;
  updatedAt: string;
};

export type GetAgentQueryParams = {
  id: string;
};

export type UpdateAgentPayload = {
  phone: string;
  aboutMe?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
};
