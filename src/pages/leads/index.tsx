

import { useMemo, useState } from "react";
import {
  HiOutlineSearch,
  HiDotsVertical,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { MdArrowDropDown } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { FaTag } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { Input, Tabs, Tab, Button } from "@heroui/react";
import { PiTagChevronThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { GrCheckbox } from "react-icons/gr";


type Lead = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  channel?: string;
};

const SAMPLE_PREVIEW =
  "Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.";

const initialLeads: Lead[] = [
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
    preview: SAMPLE_PREVIEW,
    time: "12:01 PM",
    channel: "Referrals",
  })),
].flat();

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
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("hot");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState<number>(1);

  const pageSize = 9;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = initialLeads;
    if (q) {
      list = list.filter(
        (l) =>
          l.sender.toLowerCase().includes(q) ||
          l.subject.toLowerCase().includes(q) ||
          l.preview.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const toggleSelect = (id: string) => {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  };


  return (
    <div className="min-h-screen bg-gray-50  ">
      <div className="w-full max-w-full mx-auto">

        <div className="bg-white rounded-md border border-gray-100 px-4 sm:px-6 py-4 mb-4">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h3 className="text-gray-900 font-medium text-lg">
              All Leads <span className="text-blue-700">(50)</span>
            </h3>

            <div className="w-full sm:w-[320px] md:w-[380px] ml-auto">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, property or keyword"
                variant="flat"
                size="md"
                className="w-full bg-gray-200 rounded-full"
                endContent={<HiOutlineSearch className="text-gray-500" />}
              />
            </div>

            <Button color="primary" className="rounded-md px-4 py-2 w-full sm:w-auto">
              <SlCalender className="w-5 h-5 mr-2" /> Filter by Date
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 border border-gray-100 px-4 py-3 mb-4 rounded-md">
            <Button className="flex items-center gap-1 p-1.5 rounded  bg-white hover:bg-gray-100">
              <GrCheckbox className="w-5 h-5" />
              <MdArrowDropDown className="w-5 h-5" />
            </Button>

            <Button className="p-1.5 rounded  bg-white hover:bg-gray-100">
              <IoReload className="w-5 h-5 text-gray-600" />
            </Button>

            <Button className="p-1.5 rounded bg-white hover:bg-gray-100">
              <HiDotsVertical className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(String(key))}
            aria-label="Leads Tabs"
            className="w-full overflow-x-auto "
            variant="underlined"
            classNames={{
              tabList: "bg-transparent flex-nowrap ",
              cursor: " bg-blue-500 mt-1 h-1 rounded-lg w-20",
              tab: "bg-transparent data-[selected=true]:bg-transparent whitespace-nowrap ",
            }}
          >
            {tabs.map((t) => (
              <Tab
                key={t.key}
                title={
                  <div className="flex flex-col items-start leading-tight">
                    <div className="flex gap-2">
                      {t.icon}

                      <span className="font-medium text-sm text-gray-900">
                        {t.label}
                      </span>

                      {t.badge && (
                        <div
                          className={`text-white text-[11px] font-medium px-2 py-[1px] rounded-md
                          ${t.badge.startsWith("1") ? "bg-[#0D6EFD]" : "bg-[#2E7D32]"}`}
                        >
                          {t.badge}
                        </div>
                      )}
                    </div>

                    {t.sub && (
                      <span className="text-[11px] text-gray-500 ml-7 truncate max-w-[140px] sm:max-w-none">
                        {t.sub}
                      </span>
                    )}
                  </div>
                }
              />
            ))}
          </Tabs>

          <div className="overflow-x-auto mt-4">
            <div className="min-w-[600px] divide-y divide-gray-300">
              {pageItems.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center gap-4 px-4 py-5 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={!!selected[lead.id]}
                    onChange={() => toggleSelect(lead.id)}
                    className="w-5 h-5"
                  />

                  <PiTagChevronThin className="w-5 h-5 text-gray-400" />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex flex-wrap items-baseline gap-2 truncate cursor-pointer" onClick={() => navigate("/leadsinquiriespage")}>
                        <span className="font-semibold text-sm text-gray-900 truncate cursor-pointer" >
                          {lead.sender}
                        </span>
                        <span className="text-sm font-semibold text-gray-800 truncate">
                          {lead.subject}
                        </span>
                        <span className="text-sm text-gray-500 truncate">
                          - {lead.preview}
                        </span>
                      </div>

                      <span className="text-sm text-gray-700 font-bold text-left sm:text-right sm:w-20">
                        {lead.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-4 flex justify-center items-center gap-4 flex-wrap">
              <Button
                isDisabled={page === 1}
                variant="flat"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="min-w-[40px]"
              >
                <HiChevronLeft className="w-6 h-6" />
              </Button>

              <div className="px-3 py-2 bg-blue-50 text-blue-600 font-medium rounded-md">
                {page}
              </div>

              <Button
                isDisabled={page === totalPages}
                variant="flat"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="min-w-[40px]"
              >
                <HiChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
