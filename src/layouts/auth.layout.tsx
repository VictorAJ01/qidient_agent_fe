import { Outlet, useLocation } from "react-router-dom";
import { Image } from "@heroui/react";

import AuthBg from "@/assets/auth-bg.jpg";
import Logo from "@/assets/logo.png";
import { authRoutes } from "@/routes";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const hideLogo = pathname === authRoutes.verifyOTP;

  return (
    <section
      className="w-full min-h-screen p-4 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${AuthBg})`,
      }}
    >
      <main className="w-full max-w-2xl h-auto flex items-center justify-center">
        <div className="bg-light-primary-bg  p-8 w-full rounded-2xl shadow">
          {!hideLogo && (
            <Image alt="Logo" className="w-25 h-25 object-contain" src={Logo} />
          )}
          <Outlet />
        </div>
      </main>
    </section>
  );
}
