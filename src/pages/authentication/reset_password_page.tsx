import { useState } from "react";
import { Input } from "@heroui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { Button } from "@heroui/button";

export default function ResetPasswordPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full">
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
            placeholder="Confirm password"
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
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}
