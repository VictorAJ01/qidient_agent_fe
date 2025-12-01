/* eslint-disable no-console */
import { useState } from "react";
import { Input } from "@heroui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Form } from "@heroui/react";

import { ResetPasswordSchema } from "./schema/auth.schema";

import { authRoutes } from "@/routes";

export default function ResetPasswordPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    console.log(data);
    navigate(authRoutes.login);
  };

  return (
    <div className="w-full">
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
            radius="sm"
            size="lg"
            type="submit"
          >
            Reset Password
          </Button>
        </div>
      </Form>
    </div>
  );
}
