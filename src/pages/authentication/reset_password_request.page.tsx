import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { addToast, Button, Input, Form } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";

import { RequestResetPasswordSchema } from "./schema/auth.schema";
import { requestResetPasswordApi } from "./api/auth.api";

import { setCredentials } from "@/common";
import { authRoutes } from "@/routes";

export default function ResetPasswordRequestPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestResetPasswordSchema>({
    resolver: yupResolver(RequestResetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: requestResetPasswordApi,
    onSuccess: (data) => {
      setCredentials(data.accessToken);
      navigate(authRoutes.verifyResetPasswordOTP);
    },
    onError: (error: string) =>
      addToast({
        title: "Error",
        description: error || "Something error happened",
        color: "danger",
      }),
  });

  const onSubmit: SubmitHandler<RequestResetPasswordSchema> = (data) => {
    const email = data.email.trim().toLowerCase();

    mutate({ email });
  };

  return (
    <div className="w-full space-y-6">
      <div className="max-w-md 2xl:max-w-xs space-y-2">
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

        <div className="py-3 w-full">
          <Button
            fullWidth
            className="bg-primary text-white font-semibold"
            isLoading={isPending}
            radius="sm"
            size="lg"
            type="submit"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
