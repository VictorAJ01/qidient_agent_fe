import { Input } from "@heroui/input";
import { addToast, Button } from "@heroui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

import RecentDeviceLogin from "./recent_device_login";

import { changePasswordApi } from "@/pages/authentication/api/auth.api";
import { ChangePasswordSchema } from "@/pages/authentication/schema/auth.schema";

export default function SecuritySettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      reset();
      addToast({
        title: "Success",
        description: "Password changed successfully",
        color: "success",
      });
    },
    onError: (errorMessage: string) =>
      addToast({
        title: "Error",
        description: errorMessage || "Failed to change password",
        color: "danger",
      }),
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    mutate(payload);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-11">
            {/* Current password */}
            <Input
              {...register("currentPassword")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
              classNames={{
                inputWrapper: "h-12",
                label: "text-sm font-medium text-gray-400 pb-1",
              }}
              errorMessage={errors.currentPassword?.message}
              id="current-password"
              isInvalid={!!errors.currentPassword}
              label="Current Password"
              labelPlacement="outside"
              placeholder="Enter current password"
              radius="sm"
              type="text"
            />

            {/* New password */}
            <Input
              {...register("newPassword")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
              classNames={{
                inputWrapper: "h-12",
                label: "text-sm font-medium text-gray-400 pb-1",
              }}
              errorMessage={errors.newPassword?.message}
              id="new-password"
              isInvalid={!!errors.newPassword}
              label="New Password"
              labelPlacement="outside"
              placeholder="New Password"
              radius="sm"
              type="text"
            />

            {/* Confirm password */}
            <Input
              {...register("confirmPassword")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
              classNames={{
                inputWrapper: "h-12",
                label: "text-sm font-medium text-gray-400 pb-1",
              }}
              errorMessage={errors.confirmPassword?.message}
              id="confirm-password"
              isInvalid={!!errors.confirmPassword}
              label="Confirm Password"
              labelPlacement="outside"
              placeholder="Confirm Password"
              radius="sm"
              type="text"
            />
          </div>

          <Button
            className="px-8"
            color="primary"
            isLoading={isPending}
            radius="sm"
            type="submit"
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>

        {/* List of devices */}
        <div className="space-y-4">
          <h3 className="text-base font-medium">List of recent logins</h3>
          <div className="space-y-5">
            <RecentDeviceLogin />
            <RecentDeviceLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
