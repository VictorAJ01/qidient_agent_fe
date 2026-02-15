import { useQuery } from "@tanstack/react-query";

import StatsCard from "@/components/general/stats_card";
import { queryKeys } from "@/utils/keys";
import { getListingsCountApi } from "@/pages/listings/api/listings.api";

export default function OverviewStatsCard() {
  const { data: listingsCount } = useQuery({
    queryKey: [queryKeys.listingsCount],
    queryFn: getListingsCountApi,
  });

  const overviewStatCardData = [
    {
      title: "Total Listings",
      figure: listingsCount?.totalListings || 0,
    },
    {
      title: "Active Listings",
      figure: listingsCount?.activeListings || 0,
    },
    {
      title: "Inactive Listings",
      figure: 0,
    },
    {
      title: "Conversion rate",
      figure: 0,
    },
    {
      title: "Listing views",
      figure: 0,
    },
    {
      title: "Leads Generated",
      figure: 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {overviewStatCardData.map((item, index) => (
        <StatsCard key={item.title} {...item} index={index} />
      ))}
    </div>
  );
}
