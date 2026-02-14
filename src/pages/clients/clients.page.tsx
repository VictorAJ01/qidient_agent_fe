import { useQuery } from "@tanstack/react-query";

import AllClientsTable from "./components/all_clients_table";
import { getClientsStatsApi } from "./api/clients.api";

import StatsCard from "@/components/general/stats_card";
import { queryKeys } from "@/utils/keys";

export default function ClientsPage() {
  const { data: clientsStats } = useQuery({
    queryKey: [queryKeys.clientsStats],
    queryFn: getClientsStatsApi,
  });

  const { totalClients, activeClients, inactiveClients } = clientsStats || {};

  const clientsStatCardData = [
    {
      title: "Total Clients",
      figure: totalClients || 0,
    },
    {
      title: "Active Clients",
      figure: activeClients || 0,
    },
    {
      title: "Inactive Clients",
      figure: inactiveClients || 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {clientsStatCardData.map((item, index) => (
          <StatsCard key={item.title} {...item} index={index} />
        ))}
      </div>
      <AllClientsTable />
    </div>
  );
}
