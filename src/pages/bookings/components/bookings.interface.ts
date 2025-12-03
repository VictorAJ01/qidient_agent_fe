export interface BookingI {
  id: string;
  date: number;
  status: "confirmed" | "cancelled" | "rescheduled" | "pending";
  name: string;
  property: string;
  type: string;
  time: string;
  backgroundColor: string;
}

export const statusBadges = {
  confirmed: {
    label: "Confirmed",
    color: "bg-secondary-200/40  text-qidient-green",
    dot: "bg-qidient-green",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-qidient-light-red/40 text-qidient-red",
    dot: "bg-qidient-red",
  },
  rescheduled: {
    label: "Rescheduled",
    color: "bg-qidient-blue-light/40 text-dark-blue",
    dot: "bg-blue-500",
  },
  pending: {
    label: "Pending",
    color: "bg-qidient-orange-100/40 text-qidient-orange-text",
    dot: "bg-idient-orange-text",
  },
};

export const bookings: BookingI[] = [
  {
    id: "1",
    date: 30,
    status: "pending",
    name: "Praise Madumere",
    property: "Terrace Duplex, Jabi",
    type: "Physical Tour",
    time: "8:45AM",
    backgroundColor: "bg-orange-100",
  },
  {
    id: "2",
    date: 6,
    status: "pending",
    name: "Praise Madumere",
    property: "Terrace Duplex, Jabi",
    type: "Physical Tour",
    time: "8:45AM",
    backgroundColor: "bg-orange-100",
  },
  {
    id: "3",
    date: 13,
    status: "confirmed",
    name: "Praise Madumere",
    property: "Terrace Duplex, Jabi",
    type: "Physical Tour",
    time: "8:45AM",
    backgroundColor: "bg-green-100",
  },
  {
    id: "4",
    date: 16,
    status: "cancelled",
    name: "Praise Madumere",
    property: "Terrace Duplex, Jabi",
    type: "Physical Tour",
    time: "8:45AM",
    backgroundColor: "bg-red-100",
  },
  {
    id: "5",
    date: 23,
    status: "rescheduled",
    name: "Praise Madumere",
    property: "Terrace Duplex, Jabi",
    type: "Physical Tour",
    time: "8:45AM",
    backgroundColor: "bg-blue-100",
  },
];

export const calendarDates = [
  30, 31, 2, 3, 5, 6, 7, 11, 13, 15, 16, 17, 19, 21, 22, 23,
];
