import BecomeAPro from "./components/become_a_pro";
import ClientsOverview from "./components/clients_overview";
import Inquiries from "./components/inquiries";
import ListingsOverview from "./components/listings_overview";

export default function OverviewPage() {
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
        <div>
          <ListingsOverview />
        </div>
        <div>
          <ClientsOverview />
        </div>
      </div>
    </div>
  );
}
