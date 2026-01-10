import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { sidebarRoutes } from "@/routes";

export default function OtpSuccessfulVerificationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(sidebarRoutes.overview);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full flex justify-center items-center flex-col space-y-6 py-12">
      <div className="w-[189px] h-[189px] rounded-full p-4 flex justify-center items-center bg-qidient-green">
        <FaCheck className="text-white" size={90} />
      </div>
      <div>
        <p className="text-base text-grey font-medium">Verified Successfully</p>
      </div>
    </div>
  );
}
