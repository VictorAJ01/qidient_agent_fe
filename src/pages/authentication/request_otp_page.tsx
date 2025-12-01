/* eslint-disable no-console */
import { Button, Form } from "@heroui/react";
import { InputOtp } from "@heroui/input-otp";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { VerifyOtpSchema } from "./schema/auth.schema";

import { authRoutes } from "@/routes";

export default function RequestOtpPage() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpSchema>({
    resolver: yupResolver(VerifyOtpSchema),
  });

  const onSubmit = (data: VerifyOtpSchema) => {
    console.log(data);
    navigate(authRoutes.verifyOTP);
  };

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
                length={4}
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
            radius="sm"
            size="lg"
            type="submit"
          >
            Verify
          </Button>
        </div>
      </Form>
    </div>
  );
}
