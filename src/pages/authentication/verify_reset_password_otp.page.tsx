import { useNavigate } from "react-router-dom";

import OtpInputForm from "./components/otp_input_form";
import { OtpResponsePayload } from "./types/auth.type";

import { authRoutes } from "@/routes";
import { setCredentials } from "@/common";

export default function VerifyResetPasswordOtpPage() {
  const navigate = useNavigate();

  const handleSuccess = (data: OtpResponsePayload) => {
    setCredentials(data.accessToken);
    localStorage.setItem("email", data.user.email);
    navigate(authRoutes.resetPassword);
  };

  return <OtpInputForm onSuccess={handleSuccess} />;
}
