import { Role } from "@/pages/profile/types/profile.type";

export const getUserRole = (role: Role) => {
  switch (role) {
    case "user":
      return "User";
    case "agent":
      return "Agent";
    case "super-admin":
      return "Super Admin";
    default:
      return "Unknown";
  }
};
