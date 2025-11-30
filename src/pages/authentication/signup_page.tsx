import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { SlPhone } from "react-icons/sl";
import { TfiKey } from "react-icons/tfi";

import { authRoutes } from "@/routes";

export default function SignupPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full">
      <form className="space-y-6">
        <div>
          <Input
            placeholder="Enter your first name"
            radius="sm"
            size="lg"
            startContent={<LuUser className="text-grey" size={20} />}
            type="text"
            variant="flat"
          />
        </div>
        <div>
          <Input
            placeholder="Enter your last name"
            radius="sm"
            size="lg"
            startContent={<LuUser className="text-grey" size={20} />}
            type="text"
            variant="flat"
          />
        </div>

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
            placeholder="Enter your phone number"
            radius="sm"
            size="lg"
            startContent={<SlPhone className="text-grey" size={20} />}
            type="text"
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
        <div className="py-3">
          <Button
            fullWidth
            className="bg-primary text-white font-semibold"
            radius="sm"
            size="lg"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-base text-black2 font-medium">
            Have an account already?{" "}
            <Link
              className="font-semibold cursor-pointer"
              href={authRoutes.login}
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
