import { useState } from "react";
import { Input } from "@heroui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";
import { Button } from "@heroui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Form, addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

import { ResetPasswordSchema } from "./schema/auth.schema";
import { resetPasswordApi } from "./api/auth.api";

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

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      navigate(authRoutes.login);
    },
    onError: (error: string) => {
      addToast({
        title: "Error",
        description: error,
        color: "danger",
      });
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    const email = localStorage.getItem("email") as string;

    const payload = {
      email,
      newPassword: data.password,
    };

    mutate(payload);
  };

  return (
    <div className="w-full">
      <Form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
