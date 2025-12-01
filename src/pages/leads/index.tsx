import { useMemo, useState } from "react";
import {
  HiOutlineSearch,
  HiDotsVertical,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { MdArrowDropDown } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { FaTag } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

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
    icon: <IoMdPeople className="w-5 h-5 text-gray-500 mt-5" />,
    badge: "1 new",
    sub: "Nextdoor, Message fro...",
  },
  {
    key: "referrals",
    label: "Referrals",
    icon: <IoMdPeople className="w-5 h-5 text-gray-500 mt-5" />,
    badge: "1 new",
    sub: "Nextdoor, Message fro...",
  },
  {
    key: "website",
    label: "Website",
    icon: <FaTag className="w-5 h-5 text-gray-500 mt-5" />,
    badge: "6 new",
    sub: "Lowe's Home Improvement",
  },
  {
    key: "campaigns",
    label: "Campaigns",
    icon: <FaTag className="w-5 h-5 text-gray-500 mt-5" />,
    badge: "6 new",
    sub: "Lowe's Home Improvement",
  },
  {
    key: "archived",
    label: "Archived",
    icon: <IoMdInformationCircle className="w-5 h-5 text-gray-500 mt-2" />,
    badge: null,
    sub: null,
  },
];

export default function LeadsPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("hot");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState<number>(1);

  const pageSize = 7;

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-full mx-auto">
        {/* Header toolbar */}
        <div className="bg-white rounded-md border border-gray-100 px-3 sm:px-6 py-3 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-gray-900 font-medium text-base sm:text-lg">
              All Leads <span className="text-blue-600">(50)</span>
            </h3>

            {/* Responsive search */}
          <div className="flex-1 flex justify-center w-full">
  <div className="relative w-full max-w-md lg:max-w-lg">
    <input
      id="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search by name, property or keyword"
      className="w-full bg-gray-200 border border-gray-200 rounded-full md:ml-20 pl-4 pr-10 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-100"
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      <HiOutlineSearch className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
    </div>
  </div>
</div>


            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm sm:text-base hover:bg-blue-700">
              <SlCalender className="w-4 h-4 sm:w-5 sm:h-5" />
              Filter by Date
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border border-gray-100 px-3 sm:px-4 py-3 mb-4 rounded-md">
            <button className="flex items-center gap-1 p-1.5 rounded hover:bg-gray-100">
              <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5" />
              <MdArrowDropDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100">
              <IoReload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100">
              <HiDotsVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap lg:flex-nowrap gap-2 sm:gap-6 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-start gap-2 sm:gap-3 px-2 py-1 rounded-md ${
                  activeTab === t.key
                    ? "border-b-2 border-blue-600 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div>{t.icon}</div>
                <div className="flex flex-col text-left leading-tight">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="font-medium text-sm sm:text-base text-gray-900">{t.label}</span>
                    {t.badge && (
                      <span
                        className={`text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full ${
                          t.badge.startsWith("1")
                            ? "bg-blue-600 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                  </div>
                  {t.sub && <span className="text-xs sm:text-sm text-gray-400">{t.sub}</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <div className="min-w-[600px] divide-y divide-gray-100">
              {pageItems.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 min-w-full"
                >
                  <input
                    type="checkbox"
                    checked={!!selected[lead.id]}
                    onChange={() => toggleSelect(lead.id)}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <HiOutlineChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2 sm:gap-4 truncate">
                        <span className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                          {lead.sender}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                          {lead.subject}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500 truncate">
                          - {lead.preview}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 w-20 text-right font-medium">
                        {lead.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-4 py-4 flex justify-center items-center flex-wrap gap-2 sm:gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`p-2 rounded-md ${
                  page === 1
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50"
                }`}
                disabled={page === 1}
              >
                <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="px-3 py-2 bg-blue-50 text-blue-600 font-medium rounded-md">
                {page}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`p-2 rounded-md ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50"
                }`}
                disabled={page === totalPages}
              >
                <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
