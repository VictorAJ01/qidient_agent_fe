import { useEffect, useState } from "react";
import { addToast, Button, Form } from "@heroui/react";
import { InputOtp } from "@heroui/input-otp";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

import { VerifyOtpSchema } from "../schema/auth.schema";
import { OtpResponsePayload, Role } from "../types/auth.type";
import { resendOtpApi, verifyOtpApi } from "../api/auth.api";

import { setCredentials } from "@/common";

export type OtpInputFormProps = {
  onSuccess: (data: OtpResponsePayload) => void;
};

export default function OtpInputForm({ onSuccess }: OtpInputFormProps) {
  const [timer, setTimer] = useState(60);
  const email = localStorage.getItem("email") || "your email";
  const role = localStorage.getItem("role") as Role;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpSchema>({
    resolver: yupResolver(VerifyOtpSchema),
  });

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (data) => {
      addToast({
        title: "Otp verification successful",
        color: "success",
      });
      onSuccess(data);
    },
    onError: (error: string | Error) => {
      const errorMessage = typeof error === "string" ? error : error.message;

      addToast({
        title: "Otp verification failed",
        description: errorMessage || "Otp verification failed",
        color: "danger",
      });
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: resendOtpApi,
    onSuccess: (data) => {
      setCredentials(data.accessToken);
      addToast({
        title: "Otp resent successfully",
        description: "Please check your email",
        color: "success",
      });
      setTimer(60);
    },
    onError: (error: string | Error) => {
      const errorMessage = typeof error === "string" ? error : error.message;

      addToast({
        title: "Resend otp failed",
        description: errorMessage || "Failed to resend otp",
        color: "danger",
      });
    },
  });

  const handleResend = () => {
    if (!email) {
      addToast({
        title: "Error",
        description: "Email not found. Please try signing up again.",
        color: "danger",
      });

      return;
    }

    resendOtp({ email, role: role || "agent" });
  };

  const onSubmit: SubmitHandler<VerifyOtpSchema> = (data) => mutate(data);

  return (
    <div className="w-full space-y-4">
      <div className="max-w-sm space-y-2">
        <p className="text-base text-grey font-medium">
          A one-time password has been sent to your email address:{" "}
          <span className="font-semibold">{email}</span>
        </p>
      </div>

      <Form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="pt-3 w-full">
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

        <div className="flex justify-center pt-2">
          <p className="text-sm text-black2">
            Didn&apos;t receive code?{" "}
            {timer > 0 ? (
              <span className="text-primary font-bold ml-1">
                Resend in {timer}s
              </span>
            ) : (
              <button
                className="text-primary font-bold hover:underline disabled:opacity-50"
                disabled={isResending}
                type="button"
                onClick={handleResend}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </p>
        </div>
      </Form>
    </div>
  );
}
