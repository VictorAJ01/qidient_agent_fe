import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { SlPhone } from "react-icons/sl";
import { TfiKey } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addToast, Form } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { isMobile, osName } from "react-device-detect";
import { useMutation } from "@tanstack/react-query";

import { SignUpSchema } from "./schema/auth.schema";
import { signupApi } from "./api/auth.api";

import { authRoutes } from "@/routes";
import { setCredentials } from "@/common/persistence";

export default function SignupPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      deviceName: osName,
      deviceType: isMobile ? "smartphone" : "desktop",
      role: "agent",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      setCredentials(data.accessToken);
      addToast({
        title: "Signup successful",
        description: "Verify otp",
        color: "success",
      });
      navigate(authRoutes.verifyOTP);
    },
    onError: (error: string) => {
      addToast({
        title: "Signup failed",
        description: error,
        color: "danger",
      });
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    const payload = {
      deviceName: data.deviceName,
      deviceType: data.deviceType,
      email: data.email.trim().toLowerCase(),
      password: data.password,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone,
      role: data.role,
    };

    mutate(payload);
  };

  return (
    <div className="w-full">
      <Form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <Input
            placeholder="Enter your first name"
            radius="sm"
            size="lg"
            startContent={<LuUser className="text-grey" size={20} />}
            type="text"
            variant="flat"
            {...register("firstName")}
            errorMessage={errors?.firstName?.message}
            isInvalid={!!errors?.firstName?.message}
          />
        </div>
        <div className="w-full">
          <Input
            placeholder="Enter your last name"
            radius="sm"
            size="lg"
            startContent={<LuUser className="text-grey" size={20} />}
            type="text"
            variant="flat"
            {...register("lastName")}
            errorMessage={errors?.lastName?.message}
            isInvalid={!!errors?.lastName?.message}
          />
        </div>

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
            placeholder="Enter your phone number"
            radius="sm"
            size="lg"
            startContent={<SlPhone className="text-grey" size={20} />}
            type="text"
            variant="flat"
            {...register("phone")}
            errorMessage={errors?.phone?.message}
            isInvalid={!!errors?.phone?.message}
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
            placeholder="Confirm password"
            radius="sm"
            size="lg"
            startContent={<TfiKey className="text-grey" size={20} />}
            type={isVisible ? "text" : "password"}
            variant="flat"
            {...register("confirmPassword")}
            errorMessage={errors?.confirmPassword?.message}
            isInvalid={!!errors?.confirmPassword?.message}
          />
        </div>
        <div className="py-3 w-full">
          <Button
            fullWidth
            className="bg-primary text-white font-semibold"
            isLoading={isPending}
            radius="sm"
            size="lg"
            type="submit"
          >
            {isPending ? "Submitting..." : "Sign Up"}
          </Button>
        </div>
      </Form>

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
    </div>
  );
}
