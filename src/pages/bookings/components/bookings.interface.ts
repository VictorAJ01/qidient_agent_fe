export type BookingStatus =
  | "confirmed"
  | "cancelled"
  | "rescheduled"
  | "pending";

export const statusBadges: Record<
  string,
  {
    label: string;
    color: string;
    dot: string;
  }
> = {
  confirmed: {
    label: "Confirmed",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  rescheduled: {
    label: "Rescheduled",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  pending: {
    label: "Pending",
    color: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
  },
  completed: {
    label: "Completed",
    color: "bg-gray-100 text-gray-700",
    dot: "bg-gray-500",
  },
  no_show: {
    label: "No Show",
    color: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
  },
};
