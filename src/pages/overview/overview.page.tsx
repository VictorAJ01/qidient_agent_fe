import { useQuery } from "@tanstack/react-query";

import { getClientsApi } from "../clients/api/clients.api";
import { getPropertiesApi } from "../listings/api/listings.api";

import BecomeAPro from "./components/become_a_pro";
import ClientsOverview from "./components/clients_overview";
import Inquiries from "./components/inquiries";
import ListingsOverview from "./components/listings_overview";

import { queryKeys } from "@/utils/keys";

export default function OverviewPage() {
  const { data: clientsData } = useQuery({
    queryKey: [queryKeys.clients],
    queryFn: () => getClientsApi({ status: "active" }),
  });

  const clients = clientsData?.clients || [];

  const { data: propertiesData } = useQuery({
    queryKey: [queryKeys.listings],
    queryFn: () => getPropertiesApi({ page: 1, limit: 10 }),
  });

  const properties = propertiesData?.properties || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-3/5 xl:w-4/6">
          <Inquiries />
        </div>

        <div className="w-full lg:w-2/5 xl:w-1/3 space-y-5">
          <BecomeAPro />
          <BecomeAPro />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.length > 0 && (
          <div>
            <ListingsOverview listings={properties} />
          </div>
        )}
        {clients.length > 0 && (
          <div>
            <ClientsOverview clients={clients} />
          </div>
        )}
      </div>
    </div>
  );
}
