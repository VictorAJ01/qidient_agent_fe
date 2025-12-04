import { Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/auth.layout";
import SigninPage from "./pages/authentication/signin_page";
import ResetPasswordPage from "./pages/authentication/reset_password_page";
import RequestOtpPage from "./pages/authentication/request_otp_page";
import VerifyOtpPage from "./pages/authentication/verify_otp_page";

import { authRoutes, sidebarRoutes } from "@/routes";
import DashboardLayout from "@/layouts/dashboard.layout";
import SignupPage from "@/pages/authentication/signup_page";
import OverviewPage from "@/pages/overview";
import ListingsPage from "@/pages/listings";
import ListingDetailsPage from "@/pages/listings/components/listing_details_page";
import ClientsPage from "@/pages/clients";
import LeadsPage from "@/pages/leads";
import BookingsPage from "@/pages/bookings";
import NotificationsPage from "@/pages/notifications";
import ClientDetailsPage from "@/pages/clients/components/client_details_page";
import ProfilePage from "@/pages/profile";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<SigninPage />} path={authRoutes.login} />
        <Route element={<SignupPage />} path={authRoutes.signup} />
        <Route
          element={<ResetPasswordPage />}
          path={authRoutes.resetPassword}
        />
        <Route element={<RequestOtpPage />} path={authRoutes.requestOTP} />
        <Route element={<VerifyOtpPage />} path={authRoutes.verifyOTP} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route element={<OverviewPage />} path={sidebarRoutes.overview} />
        <Route element={<ListingsPage />} path={sidebarRoutes.listings} />
        <Route
          element={<ListingDetailsPage />}
          path={sidebarRoutes.viewListing}
        />
        <Route element={<ClientsPage />} path={sidebarRoutes.clients} />
        <Route
          element={<ClientDetailsPage />}
          path={sidebarRoutes.viewClient}
        />
        <Route element={<LeadsPage />} path={sidebarRoutes.leads} />
        <Route element={<BookingsPage />} path={sidebarRoutes.bookings} />
        <Route
          element={<NotificationsPage />}
          path={sidebarRoutes.notifications}
        />
        <Route element={<ProfilePage />} path={sidebarRoutes.profile} />
      </Route>
    </Routes>
  );
}

export default App;
