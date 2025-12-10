import { IoEyeOutline } from "react-icons/io5";
import { PiLockKeyOpenLight } from "react-icons/pi";

export type Lead = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  channel?: string;
};

export const initialLeads: Lead[] = [
  {
    id: "1",
    sender: "Praise Madumere",
    subject: "Hiya",
    preview: "Inquiry on Guzape apartment",
    time: "10:41 PM",
    channel: "Website",
  },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: String(i + 2),
    sender: "Theresa Webb",
    subject: "Hello",
    preview:
      "Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.",
    time: "12:01 PM",
    channel: "Referrals",
  })),
].flat();

export const person = {
  firstName: "Praise ",
  lastName: "Madumere",
  Number: "(234) 812-34567",
  email: "parish.yet@gmail.com",
};

export const shedules = [
  { id: 1, title: "Assign Lead", Icon: IoEyeOutline },
  { id: 2, title: "Schedule Viewing", Icon: IoEyeOutline },
  { id: 3, title: "Archive Lead", Icon: PiLockKeyOpenLight },
  { id: 4, title: "Archive Lead", Icon: PiLockKeyOpenLight },
];

export const information = [
  { Id: 1, title: "Client type:", description: "Buyer" },
  { id: 2, title: "ID:", description: "17r3830" },
  { id: 3, title: "Address:", description: "123 House Street" },
  { id: 4, title: "Date of inquiry:", description: "27-05-2025" },
  { id: 5, title: "Source:", description: "Website" },
];

export const activities = [
  {
    id: 1,
    title: "Praiz Chuks Replied",
    subtitle: "Luxury Apartment in Ikoyi",
    time: "2 hours ago",
    bg: "bg-blue-100",
  },
  {
    id: 2,
    title: "Lead Archived",
    subtitle: "Terrace Duplex in Lekki",
    time: "1 day ago",
    bg: "bg-green-100",
  },
  {
    id: 3,
    title: "Viewing Schedule set",
    subtitle: "Terrace Duplex in Lekki",
    time: "2 days ago",
    bg: "bg-yellow-100",
  },
  {
    id: 4,
    title: "Viewing Schedule set",
    subtitle: "Terrace Duplex in Lekki",
    time: "2 days ago",
    bg: "bg-red-100",
  },
];
