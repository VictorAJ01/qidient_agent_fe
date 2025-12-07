/* eslint-disable no-console */
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { SignInSchema } from "./schema/auth.schema";

import { authRoutes, sidebarRoutes } from "@/routes";

export default function SigninPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data: SignInSchema) => {
    console.log("data", data);
    navigate(sidebarRoutes.overview);
  };

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
      <Form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <Input
            placeholder="Enter your email address"
            radius="sm"
            size="lg"
            startContent={<MdOutlineEmail className="text-grey" size={20} />}
            type="email"
            variant="flat"
            {...register("email")}
            errorMessage={errors?.email?.message}
            isInvalid={!!errors?.email?.message}
          />
        </div>
        <div className="w-full">
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
            {...register("password")}
            errorMessage={errors?.password?.message}
            isInvalid={!!errors?.password?.message}
          />
        </div>
        <div className="flex justify-end w-full">
          <Link
            className="text-sm font-semibold cursor-pointer"
            href={authRoutes.resetPassword}
          >
            Forgot Password?
          </Link>
        </div>

        <div className="py-3 w-full">
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
      </Form>

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
