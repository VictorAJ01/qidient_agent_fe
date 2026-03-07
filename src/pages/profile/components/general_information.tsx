import { useEffect, useMemo } from "react";
import {
  addToast,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Country, State, City, ICountry, IState } from "country-state-city";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetAgent } from "../hooks/use_get_agent";
import {
  EditProfileSchema,
  editProfileSchema,
} from "../schema/edit_profile.schema";
import { updateAgentApi } from "../api/profile.api";

import { queryKeys } from "@/utils/keys";

export default function GeneralInformation() {
  const queryClient = useQueryClient();
  const { agent } = useGetAgent();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    resolver: yupResolver(editProfileSchema) as Resolver<EditProfileSchema>,
  });

  useEffect(() => {
    if (agent) {
      setValue("phone", agent.phone || "");
      setValue("address", agent.address || "");
      setValue("aboutMe", agent.aboutMe || "");
      setValue("city", agent.city || "");
      setValue("state", agent.state || "");
      setValue("country", agent.country || "");
    }
  }, [agent, setValue]);

  // Handle location selectors
  const allCountries = useMemo(() => Country.getAllCountries(), []);
  const selectedCountryName = watch("country");
  const selectedStateName = watch("state");

  const selectedCountryCode = useMemo(
    () =>
      allCountries.find((c: ICountry) => c.name === selectedCountryName)
        ?.isoCode,
    [allCountries, selectedCountryName],
  );

  const statesOfCountry = useMemo(
    () =>
      selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode) : [],
    [selectedCountryCode],
  );

  const selectedStateCode = useMemo(
    () =>
      statesOfCountry.find((s: IState) => s.name === selectedStateName)
        ?.isoCode,
    [statesOfCountry, selectedStateName],
  );

  const citiesOfState = useMemo(
    () =>
      selectedCountryCode && selectedStateCode
        ? City.getCitiesOfState(selectedCountryCode, selectedStateCode)
        : [],
    [selectedCountryCode, selectedStateCode],
  );

  const { mutate, isPending } = useMutation({
    mutationFn: updateAgentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.agent] });
      addToast({ title: "Profile updated successfully", color: "success" });
    },
    onError: (errorMessage: string) =>
      addToast({
        title: "Error",
        description: errorMessage,
        color: "danger",
      }),
  });

  const onSubmit: SubmitHandler<EditProfileSchema> = (data) => mutate(data);

  return (
    <div className="space-y-8">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-4">
          <Input
            isDisabled
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            classNames={{
              inputWrapper: "h-12",
              label: "text-sm font-medium text-gray-400 pb-1",
            }}
            id="first-name"
            label="First Name"
            labelPlacement="outside"
            placeholder="Enter your first name"
            radius="sm"
            type="text"
            value={agent?.firstName}
            variant="bordered"
          />

          <Input
            isDisabled
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            classNames={{
              inputWrapper: "h-12",
              label: "text-sm font-medium text-gray-400 pb-1",
            }}
            id="last-name"
            label="Last Name"
            labelPlacement="outside"
            placeholder="Enter your last name"
            radius="sm"
            type="text"
            value={agent?.lastName}
            variant="bordered"
          />

          <Input
            isDisabled
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            classNames={{
              inputWrapper: "h-12",
              label: "text-sm font-medium text-gray-400 pb-1",
            }}
            id="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            radius="sm"
            type="text"
            value={agent?.email}
            variant="bordered"
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input
                {...field}
                className="w-full"
                classNames={{
                  inputWrapper: "h-12",
                  label: "text-sm font-medium text-gray-400 pb-1",
                }}
                errorMessage={errors.phone?.message}
                id="phone"
                isInvalid={!!errors.phone}
                label="Phone"
                labelPlacement="outside"
                placeholder="Enter your phone number"
                radius="sm"
                type="text"
                variant="bordered"
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <Input
                {...field}
                className="w-full"
                classNames={{
                  inputWrapper: "h-12",
                  label: "text-sm font-medium text-gray-400 pb-1",
                }}
                errorMessage={errors.address?.message}
                id="address"
                isInvalid={!!errors.address}
                label="Address"
                labelPlacement="outside"
                placeholder="Enter your address"
                radius="sm"
                type="text"
                variant="bordered"
              />
            )}
          />

          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                {...field}
                aria-label="Country"
                className="w-full"
                classNames={{
                  trigger: "h-12",
                  label: "text-sm font-medium text-gray-400 pb-1",
                }}
                label="Country"
                labelPlacement="outside"
                placeholder="Select Country"
                radius="sm"
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                variant="bordered"
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;

                  field.onChange(val);
                  setValue("state", "");
                  setValue("city", "");
                }}
              >
                {allCountries.map((country) => (
                  <SelectItem key={country.name} textValue={country.name}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <Select
                {...field}
                aria-label="State"
                className="w-full"
                classNames={{
                  trigger: "h-12",
                  label: "text-sm font-medium text-gray-400 pb-1",
                }}
                isDisabled={!selectedCountryCode}
                label="State"
                labelPlacement="outside"
                placeholder="Select State"
                radius="sm"
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                variant="bordered"
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;

                  field.onChange(val);
                  setValue("city", "");
                }}
              >
                {statesOfCountry.map((state) => (
                  <SelectItem key={state.name} textValue={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Select
                {...field}
                aria-label="City"
                className="w-full"
                classNames={{
                  trigger: "h-12",
                  label: "text-sm font-medium text-gray-400 pb-1",
                }}
                isDisabled={!selectedStateCode}
                label="City"
                labelPlacement="outside"
                placeholder="Select City"
                radius="sm"
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                variant="bordered"
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;

                  field.onChange(val);
                }}
              >
                {citiesOfState.map((city) => (
                  <SelectItem key={city.name} textValue={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>

        <Controller
          control={control}
          name="aboutMe"
          render={({ field }) => (
            <Textarea
              {...field}
              classNames={{
                label: "text-sm font-medium text-gray-400 pb-1",
              }}
              errorMessage={errors.aboutMe?.message}
              isInvalid={!!errors.aboutMe}
              label="About Me"
              labelPlacement="outside"
              placeholder="Tell us about yourself"
              radius="sm"
              variant="bordered"
            />
          )}
        />

        <div className="flex justify-start">
          <Button
            className="px-12"
            color="primary"
            isLoading={isPending}
            radius="sm"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
