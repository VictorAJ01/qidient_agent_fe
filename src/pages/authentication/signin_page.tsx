import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { Button } from "@heroui/button";

import { authRoutes } from "@/routes";

export default function SigninPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full space-y-6">
      <div className="max-w-xs space-y-2">
        <h3 className="text-3xl lg:text-4xl font-bold leading-tight text-black">
          Elevate Your Property Business
        </h3>
        <p className="text-base text-grey font-medium">
          The premier platform for modern real estate professionals.
        </p>
      </div>
      <form className="space-y-6">
        <div>
          <Input
            placeholder="Enter your email address"
            radius="sm"
            size="lg"
            startContent={<MdOutlineEmail className="text-grey" size={20} />}
            type="email"
            variant="flat"
          />
        </div>
        <div>
          <Input
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-solid outline-transparent"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            placeholder="Enter your password"
            radius="sm"
            size="lg"
            startContent={<TfiKey className="text-grey" size={20} />}
            type={isVisible ? "text" : "password"}
            variant="flat"
          />
        </div>
        <div className="flex justify-end">
          <Link
            className="text-sm font-semibold cursor-pointer"
            href={authRoutes.resetPassword}
          >
            Forgot Password?
          </Link>
        </div>

        <div className="py-3">
          <Button
            fullWidth
            className="bg-primary text-white font-semibold"
            radius="sm"
            size="lg"
            type="submit"
          >
            Sign In
          </Button>
        </div>
      </form>

      <div className="flex justify-center items-center">
        <p className="text-base text-black2 font-medium">
          Don’t have an account yet?{" "}
          <Link
            className="font-semibold cursor-pointer"
            href={authRoutes.signup}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
