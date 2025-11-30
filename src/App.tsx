import { Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/auth.layout";

import { sidebarRoutes } from "@/routes";
import DashboardLayout from "@/layouts/dashboard.layout";
import SignupPage from "@/pages/authentication";
import OverviewPage from "@/pages/overview";
import ListingsPage from "@/pages/listings";
import ClientsPage from "@/pages/clients";
import LeadsPage from "@/pages/leads";
import BookingsPage from "@/pages/bookings";
import NotificationsPage from "@/pages/notifications";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<SignupPage />} path="/" />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route element={<OverviewPage />} path={sidebarRoutes.overview} />
        <Route element={<ListingsPage />} path={sidebarRoutes.listings} />
        <Route element={<ClientsPage />} path={sidebarRoutes.clients} />
        <Route element={<LeadsPage />} path={sidebarRoutes.leads} />
        <Route element={<BookingsPage />} path={sidebarRoutes.bookings} />
        <Route
          element={<NotificationsPage />}
          path={sidebarRoutes.notifications}
        />
      </Route>
    </Routes>
  );
}

export default App;
