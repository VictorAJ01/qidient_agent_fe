import StatsCard from "@/components/general/stats_card";

const overviewStatCardData = [
  {
    title: "Total Listings",
    figure: 14,
  },
  {
    title: "Active Listings",
    figure: 12,
  },
  {
    title: "Inactive Listings",
    figure: 1,
  },
  {
    title: "Conversion rate",
    figure: 176,
  },
  {
    title: "Listing views",
    figure: 176,
  },
  {
    title: "Leads Generated",
    figure: 176,
  },
];

export default function OverviewStatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {overviewStatCardData.map((item, index) => (
        <StatsCard key={item.title} {...item} index={index} />
      ))}
    </div>
  );
}
