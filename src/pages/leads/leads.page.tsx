import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch, HiDotsVertical } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { MdArrowDropDown } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { FaTag } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import {
  Input,
  Tabs,
  Tab,
  Button,
  Checkbox,
  Pagination,
  Spinner,
} from "@heroui/react";
import { PiTagChevronThin } from "react-icons/pi";
import { format } from "date-fns";

import { useLeads } from "./hooks/use_leads";
import { LeadsStatus, LeadSource, LeadPriority } from "./types/leads.types";

const tabs = [
  {
    key: "hot",
    label: "Hot",
    icon: <IoMdPeople className="w-5 h-5 text-gray-500" />,
    badge: "1 new",
    sub: "Nextdoor, Message fro...",
  },
  {
    key: "referrals",
    label: "Referrals",
    icon: <IoMdPeople className="w-5 h-5 text-gray-500" />,
    badge: "1 new",
    sub: "Nextdoor, Message fro...",
  },
  {
    key: "website",
    label: "Website",
    icon: <FaTag className="w-5 h-5 text-gray-500" />,
    badge: "6 new",
    sub: "Lowe's Home Improvement",
  },
  {
    key: "campaigns",
    label: "Campaigns",
    icon: <FaTag className="w-5 h-5 text-gray-500" />,
    badge: "6 new",
    sub: "Lowe's Home Improvement",
  },
  {
    key: "archived",
    label: "Archived",
    icon: <IoMdInformationCircle className="w-5 h-5 text-gray-500" />,
    badge: null,
    sub: null,
  },
];

export default function LeadsPage() {
  const [query, setQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("hot");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState<number>(1);

  const pageSize = 10;

  const params = useMemo(() => {
    const base: any = {
      page,
      limit: pageSize,
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    switch (activeTab) {
      case "referrals":
        base.source = "referral" as LeadSource;
        break;
      case "website":
        base.source = "website" as LeadSource;
        break;
      case "campaigns":
        base.source = "campaign" as LeadSource;
        break;
      case "archived":
        base.status = ["closed_won", "closed_lost"] as unknown as LeadsStatus;
        break;
      case "hot":
      default:
        base.priority = "high" as LeadPriority;
        break;
    }

    return base;
  }, [activeTab, page]);

  const { leadsData, isLoading, refetch } = useLeads(params);

  const filtered = useMemo(() => {
    if (!leadsData?.leads) return [];
    const q = query.trim().toLowerCase();

    if (q) {
      return leadsData.leads.filter(
        (l) =>
          l.sourceDetails?.toLowerCase().includes(q) ||
          l.status?.toLowerCase().includes(q) ||
          l.priority?.toLowerCase().includes(q),
      );
    }

    return leadsData.leads;
  }, [leadsData, query]);

  const totalPages = leadsData?.meta?.totalPages || 1;

  const toggleSelect = (id: string) => {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  };

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-full mx-auto">
        <div className="bg-white rounded-2xl  px-4 sm:px-6 py-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h3 className="text-gray-900 font-medium font-rubik text-xl">
              All Leads{" "}
              <span className="text-primary">
                ({leadsData?.meta?.total || 0})
              </span>
            </h3>

            <div className="w-full sm:w-[320px] md:w-[380px] ml-auto">
              <Input
                className="w-full bg-gray-200 rounded-full"
                endContent={<HiOutlineSearch className="text-gray-500" />}
                placeholder="Search by name, property or keyword"
                size="md"
                value={query}
                variant="flat"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <Button
              className="rounded-md px-4 py-2 w-full sm:w-auto shrink-0"
              color="primary"
              size="md"
              startContent={<SlCalender className="w-5 h-5" />}
            >
              Filter by Date
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 border border-gray-100 px-4 py-3 mb-4 rounded-md">
            <div className="flex  items-center">
              <Checkbox radius="sm" size="lg" />
              <MdArrowDropDown className="text-2xl text-grey" />
            </div>

            <Button isIconOnly variant="light" onClick={() => refetch()}>
              <IoReload className="w-5 h-5 text-grey" />
            </Button>

            <Button isIconOnly variant="light">
              <HiDotsVertical className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          <Tabs
            aria-label="Leads Tabs"
            className="w-full overflow-x-auto"
            classNames={{
              tabList: "gap-6 md:gap-16 w-full relative rounded-none p-0",
              cursor:
                "w-20 md:w-full bg-primary h-2 rounded-lg justify-center items-center",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-grey",
            }}
            color="primary"
            selectedKey={activeTab}
            variant="underlined"
            onSelectionChange={(key) => {
              setActiveTab(String(key));
              setPage(1);
            }}
          >
            {tabs.map((t) => (
              <Tab
                key={t.key}
                className="min-w-[203px]"
                title={
                  <div className="flex flex-col items-start">
                    <div className="flex gap-3 items-center">
                      {t.icon}
                      <span className="font-semibold font-rubik text-sm text-grey">
                        {t.label}
                      </span>

                      {t.badge && (
                        <div
                          className={`text-white text-xs font-medium px-2 py-1 rounded-md flex justify-center items-center
                          ${t.badge.startsWith("1") ? "bg-primary" : "bg-qidient-green"}`}
                        >
                          {t.badge}
                        </div>
                      )}
                    </div>

                    {t.sub && (
                      <span className="text-xs text-grey ml-7 truncate sm:max-w-none">
                        {t.sub}
                      </span>
                    )}
                  </div>
                }
              />
            ))}
          </Tabs>

          <div className="overflow-x-auto mt-4">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Spinner label="Loading Leads..." />
              </div>
            ) : (
              <div className="min-w-[600px] divide-y divide-grey-10">
                {filtered.map((lead) => (
                  <div
                    key={lead._id}
                    className="flex items-center gap-4 px-4 py-5 hover:bg-light-90"
                  >
                    <Checkbox
                      isSelected={!!selected[lead._id]}
                      radius="sm"
                      size="md"
                      onValueChange={() => toggleSelect(lead._id)}
                    />

                    <PiTagChevronThin className="w-5 h-5 text-grey" />

                    <div className="w-full">
                      <Link to={`/dashboard/leads/${lead._id}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex justify-between items-center gap-6 md:gap-24">
                            <p className="whitespace-nowrap font-semibold text-sm text-black cursor-pointer">
                              {lead.source.charAt(0).toUpperCase() +
                                lead.source.slice(1)}{" "}
                              Lead
                            </p>
                            <p className="text-sm text-grey">
                              <span className="font-semibold text-black">
                                {lead.status.replace("_", " ").toUpperCase()}
                              </span>{" "}
                              - {lead.sourceDetails || "No details provided"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-black whitespace-nowrap">
                              {format(new Date(lead.createdAt), "hh:mm a")}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
                {!filtered.length && (
                  <div className="text-center py-10 text-gray-500">
                    No leads found for this category.
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="py-4 flex justify-center items-center">
                <Pagination
                  showControls
                  className="gap-2"
                  color="primary"
                  initialPage={page}
                  total={totalPages}
                  onChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
