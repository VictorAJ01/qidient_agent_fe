export const authRoutes = {
  login: "/",
  signup: "/signup",
  requestOTP: "/request-otp",
  verifyOTP: "/verify-otp",
  resetPassword: "/reset-password",
} as const;

export type AuthRoutes = (typeof authRoutes)[keyof typeof authRoutes];

export const sidebarRoutes = {
  overview: "/dashboard/overview",
  listings: "/dashboard/listings",
  clients: "/dashboard/clients",
  viewClient: "/dashboard/clients/:id",
  leads: "/dashboard/leads",
  bookings: "/dashboard/bookings",
  profile: "/dashboard/profile",
  notifications: "/dashboard/notifications",
  analytics: "/dashboard/analytics",
} as const;

export type SidebarRoutes = (typeof sidebarRoutes)[keyof typeof sidebarRoutes];
