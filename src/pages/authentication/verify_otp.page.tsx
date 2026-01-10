import { addToast, Button, Form } from "@heroui/react";
import { InputOtp } from "@heroui/input-otp";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { VerifyOtpSchema } from "./schema/auth.schema";
import { verifyOtpApi } from "./api/auth.api";

import { authRoutes } from "@/routes";
import { setCredentials } from "@/common";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpSchema>({
    resolver: yupResolver(VerifyOtpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (data) => {
      setCredentials(data.accessToken, data.user._id);
      addToast({
        title: "Otp verification successful",
        color: "success",
      });
      navigate(authRoutes.otpSuccess);
    },
    onError: (error: string) => {
      addToast({
        title: "Otp verification failed",
        description: error,
        color: "danger",
      });
    },
  });

  const onSubmit: SubmitHandler<VerifyOtpSchema> = (data) => mutate(data);

  return (
    <div className="w-full space-y-6">
      <div className="max-w-xs space-y-2">
        <p className="text-base text-grey font-medium">
          A one-time password has been sent to your email address
        </p>
      </div>

      <Form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <InputOtp
                {...field}
                classNames={{
                  base: "gap-8",
                  input: "w-24 h-24 text-2xl",
                }}
                errorMessage={errors?.otp?.message}
                isInvalid={!!errors?.otp?.message}
                length={6}
                radius="md"
                size="lg"
                variant="bordered"
              />
            )}
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
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
