export type LeadsStatus =
  | "new"
  | "contacted"
  | "viewing_scheduled"
  | "offer_made"
  | "closed_won"
  | "closed_lost";

export type LeadPriority = "low" | "medium" | "high" | "urgent";

export type LeadSource =
  | "website"
  | "referral"
  | "social_media"
  | "walk_in"
  | "phone"
  | "email"
  | "campaign"
  | "other";

export type LeadsSortedBy =
  | "createdAt"
  | "lastMessageAt"
  | "priority"
  | "status"
  | "source";

export type LeadsSortOrder = "asc" | "desc";

export type GetLeadsQueryParams = {
  agentId: string;
  propertyId: string;
  clientId: string;
  status: LeadsStatus;
  priority: LeadPriority;
  source: LeadSource;
  sourceDetails: string;
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
  sortBy: LeadsSortedBy;
  sortOrder: LeadsSortOrder;
};

export type Lead = {
  _id: string;
  propertyId: string;
  agentId: string;
  clientId: string;
  status: LeadsStatus;
  priority: LeadPriority;
  source: LeadSource;
  sourceDetails: string;
  lastMessageAt: string;
  unreadCount: number;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetLeadsResponsePayload = {
  leads: Lead[];
  meta: Meta;
};

export type GetLeadQueryParams = {
  id: string;
};

export type UpdateLeadsPayload = {
  id: string;
  status: LeadsStatus;
  priority: LeadPriority;
  source: LeadSource;
  sourceDetails: string;
  closedAt?: string;
  unreadCount: number;
};

export type LeadSuccessMessagePayload = {
  message: string;
};

export type GetLeadsAnalyticsSourceResponsePayload = {
  sources: {
    website: number;
    referral: number;
    campaign: number;
  };
};

export type GetLeadByClientIdQueryParams = {
  clientId: string;
};

export type GetLeadByPropertyIdQueryParams = {
  propertyId: string;
};
