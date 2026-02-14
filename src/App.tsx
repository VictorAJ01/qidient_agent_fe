import { Route, Routes } from "react-router-dom";

import { authRoutes, sidebarRoutes } from "@/routes";
import AuthLayout from "@/layouts/auth.layout";
import SigninPage from "@/pages/authentication/signin.page";
import VerifySignupOtpPage from "@/pages/authentication/verify_signup_otp.page";
import VerifyResetPasswordOtpPage from "@/pages/authentication/verify_reset_password_otp.page";
import ResetPasswordPage from "@/pages/authentication/reset_password.page";
import ResetPasswordRequestPage from "@/pages/authentication/reset_password_request.page";
import LeadsInquiriesPage from "@/pages/leads/leads_inquiries";
import DashboardLayout from "@/layouts/dashboard.layout";
import SignupPage from "@/pages/authentication/signup.page";
import OverviewPage from "@/pages/overview";
import ListingsPage from "@/pages/listings";
import ListingDetailsPage from "@/pages/listings/components/listing_details_page";
import ClientsPage from "@/pages/clients/clients.page";
import LeadsPage from "@/pages/leads";
import BookingsPage from "@/pages/bookings";
import NotificationsPage from "@/pages/notifications";
import ClientDetailsPage from "@/pages/clients/components/client_details_page";
import ProfilePage from "@/pages/profile/profile.page";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<SigninPage />} path={authRoutes.login} />
        <Route element={<SignupPage />} path={authRoutes.signup} />
        <Route
          element={<ResetPasswordRequestPage />}
          path={authRoutes.resetPasswordRequest}
        />
        <Route
          element={<ResetPasswordPage />}
          path={authRoutes.resetPassword}
        />
        <Route
          element={<VerifySignupOtpPage />}
          path={authRoutes.verifySignupOTP}
        />
        <Route
          element={<VerifyResetPasswordOtpPage />}
          path={authRoutes.verifyResetPasswordOTP}
        />
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
          element={<LeadsInquiriesPage />}
          path={sidebarRoutes.viewLeads}
        />
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
