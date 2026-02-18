export const authRoutes = {
  login: "/",
  signup: "/signup",
  verifySignupOTP: "/verify-signup-otp",
  verifyResetPasswordOTP: "/verify-reset-password-otp",
  resetPasswordRequest: "/reset-password-request",
  resetPassword: "/reset-password",
} as const;

export type AuthRoutes = (typeof authRoutes)[keyof typeof authRoutes];

export const sidebarRoutes = {
  overview: "/dashboard/overview",
  listings: "/dashboard/listings",
  createListing: "/dashboard/listings/create",
  viewListing: "/dashboard/listings/:id",
  clients: "/dashboard/clients",
  viewClient: "/dashboard/clients/:id",
  leads: "/dashboard/leads",
  viewLeads: "/dashboard/leads/:id",
  bookings: "/dashboard/bookings",
  profile: "/dashboard/profile",
  notifications: "/dashboard/notifications",
  analytics: "/dashboard/analytics",
} as const;

export type SidebarRoutes = (typeof sidebarRoutes)[keyof typeof sidebarRoutes];
