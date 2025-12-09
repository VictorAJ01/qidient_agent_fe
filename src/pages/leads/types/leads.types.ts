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
