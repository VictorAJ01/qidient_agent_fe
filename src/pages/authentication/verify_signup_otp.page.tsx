import { useNavigate } from "react-router-dom";

import { OtpResponsePayload } from "./types/auth.type";
import OtpInputForm from "./components/otp_input_form";

import { sidebarRoutes } from "@/routes";
import { setCredentials } from "@/common";

export default function VerifySignupOtpPage() {
  const navigate = useNavigate();

  const handleSuccess = (data: OtpResponsePayload) => {
    setCredentials(data.accessToken, data.user._id);
    navigate(sidebarRoutes.overview);
  };

  return <OtpInputForm onSuccess={handleSuccess} />;
}
