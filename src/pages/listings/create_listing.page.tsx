import type { CreatePropertyPayload as CreatePropertyApiPayload } from "./types/listings.type";

import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  addToast,
} from "@heroui/react";
import { LuHouse } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { FiTag } from "react-icons/fi";
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from "country-state-city";

import { getAmenitiesApi } from "../amenities/api/amenities.api";

import {
  CreatePropertyPayload,
  createPropertySchema,
} from "./schema/properties.schema";
import { createPropertyApi } from "./api/listings.api";
import ImageUploader from "./components/image_uploader";
import {
  featuresOptions,
  propertyCategories,
  propertyStatuses,
  propertyTypes,
} from "./utils/data";

import { BackButton } from "@/components/general/back_button";
import { sidebarRoutes } from "@/routes";
import { queryKeys } from "@/utils/keys";

// Bedroom options
const bedroomOptions = Array.from({ length: 11 }, (_, i) => ({
  key: i.toString(),
  label: i === 0 ? "Studio" : `${i} Bedroom${i > 1 ? "s" : ""}`,
}));

// Bathroom options
const bathroomOptions = Array.from({ length: 11 }, (_, i) => ({
  key: i.toString(),
  label: `${i} Bathroom${i !== 1 ? "s" : ""}`,
}));

// Year options (last 50 years to current year)
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 50 }, (_, i) => {
  const year = currentYear - i;

  return { key: year.toString(), label: year.toString() };
});

// Country, state, city from country-state-city
const allCountries = Country.getAllCountries();

export default function CreatePropertyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: amenities } = useQuery({
    queryKey: [queryKeys.amenities],
    queryFn: () => getAmenitiesApi({ page: 1, limit: 100 }),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePropertyPayload>({
    defaultValues: { isRental: false },
    resolver: yupResolver(
      createPropertySchema,
    ) as Resolver<CreatePropertyPayload>,
  });

  const selectedCountryName = watch("country");
  const selectedStateName = watch("state");

  const selectedCountryCode = allCountries.find(
    (c: ICountry) => c.name === selectedCountryName,
  )?.isoCode;

  const statesOfCountry = selectedCountryCode
    ? State.getStatesOfCountry(selectedCountryCode)
    : [];

  const selectedStateCode = statesOfCountry.find(
    (s: IState) => s.name === selectedStateName,
  )?.isoCode;

  const citiesOfState =
    selectedCountryCode && selectedStateCode
      ? City.getCitiesOfState(selectedCountryCode, selectedStateCode)
      : [];

  const { isPending, mutate } = useMutation({
    mutationFn: createPropertyApi,
    onSuccess: () => {
      navigate(sidebarRoutes.listings);
      queryClient.invalidateQueries({ queryKey: [queryKeys.listings] });
      addToast({ title: "Property created successfully", color: "success" });
    },
    onError: (error) =>
      addToast({
        title: typeof error === "string" ? error : "Failed to create property",
        color: "danger",
      }),
  });

  const onSubmit: SubmitHandler<CreatePropertyPayload> = (data) => {
    const payload: CreatePropertyApiPayload = {
      title: data.title.trim(),
      description: data.description.trim(),
      address: data.address.trim(),
      price: data.price,
      type: data.type,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      status: data.status,
      isRental: data.isRental,
      category: data.category,
      state: data.state,
      city: data.city,
      country: data.country,
      images: (data.images || []) as File[],
    };

    if (data.slug) payload.slug = data.slug;
    if (data.amenities) payload.amenities = data.amenities;
    if (data.features) payload.features = data.features;
    if (data.tags) payload.tags = data.tags;
    if (data.yearBuilt != null) payload.yearBuilt = data.yearBuilt;
    if (data.size != null) payload.size = data.size;

    mutate(payload);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20 pt-10 px-4">
      <div className="absolute left-8 top-10">
        <BackButton route={sidebarRoutes.listings} />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          List new property
        </h1>
        <p className="text-gray-500 font-medium">
          Fill in the information carefully
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("title")}
          errorMessage={errors.title?.message}
          isInvalid={!!errors.title}
          placeholder="Property Title"
          radius="lg"
          size="lg"
          startContent={<GoPerson className="text-default-400 text-xl" />}
          variant="bordered"
        />

        <Textarea
          {...register("description")}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          placeholder="Property Description"
          radius="lg"
          size="lg"
          startContent={
            <GoPerson className="text-default-400 text-xl mt-0.5" />
          }
          variant="bordered"
        />

        <Input
          {...register("price", { valueAsNumber: true })}
          errorMessage={errors.price?.message}
          isInvalid={!!errors.price}
          placeholder="Property Price"
          radius="lg"
          size="lg"
          startContent={<FiTag className="text-default-400 text-xl" />}
          type="number"
          variant="bordered"
        />

        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select
              aria-label="Property type"
              errorMessage={errors.type?.message}
              isInvalid={!!errors.type}
              placeholder="Property Type"
              radius="lg"
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
            >
              {propertyTypes.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="bedrooms"
          render={({ field }) => (
            <Select
              aria-label="Number of bedrooms"
              errorMessage={errors.bedrooms?.message}
              isInvalid={!!errors.bedrooms}
              placeholder="Number of Bedrooms"
              radius="lg"
              selectedKeys={
                field.value !== undefined
                  ? new Set([field.value.toString()])
                  : new Set()
              }
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => {
                const val = Array.from(keys)[0] as string;

                field.onChange(val ? parseInt(val, 10) : undefined);
              }}
            >
              {bedroomOptions.map((opt) => (
                <SelectItem key={opt.key}>{opt.label}</SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="bathrooms"
          render={({ field }) => (
            <Select
              aria-label="Number of bathrooms"
              errorMessage={errors.bathrooms?.message}
              isInvalid={!!errors.bathrooms}
              placeholder="Number of Bathrooms"
              radius="lg"
              selectedKeys={
                field.value !== undefined
                  ? new Set([field.value.toString()])
                  : new Set()
              }
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => {
                const val = Array.from(keys)[0] as string;

                field.onChange(val ? parseInt(val, 10) : undefined);
              }}
            >
              {bathroomOptions.map((opt) => (
                <SelectItem key={opt.key}>{opt.label}</SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="amenities"
          render={({ field }) => (
            <Select
              aria-label="Property amenities"
              errorMessage={errors.amenities?.message}
              isInvalid={!!errors.amenities}
              placeholder="Property Amenities"
              radius="lg"
              selectedKeys={new Set(field.value || [])}
              selectionMode="multiple"
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => {
                field.onChange(Array.from(keys) as string[]);
              }}
            >
              {amenities
                ? amenities.amenities.map((a) => (
                    <SelectItem key={a._id}>{a.name}</SelectItem>
                  ))
                : []}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              aria-label="Property status"
              errorMessage={errors.status?.message}
              isInvalid={!!errors.status}
              placeholder="Property Status"
              radius="lg"
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
            >
              {propertyStatuses.map((status) => (
                <SelectItem key={status.key}>{status.label}</SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              aria-label="Property category"
              errorMessage={errors.category?.message}
              isInvalid={!!errors.category}
              placeholder="Property Category"
              radius="lg"
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
            >
              {propertyCategories.map((category) => (
                <SelectItem key={category.key}>{category.label}</SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="isRental"
          render={({ field }) => (
            <Select
              aria-label="Rental or sale"
              errorMessage={errors.isRental?.message}
              isInvalid={!!errors.isRental}
              placeholder="Rental or Sale"
              radius="lg"
              selectedKeys={
                field.value === true
                  ? new Set(["rent"])
                  : field.value === false
                    ? new Set(["sale"])
                    : new Set()
              }
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                field.onChange(selected === "rent");
              }}
            >
              <SelectItem key="rent">For Rent</SelectItem>
              <SelectItem key="sale">For Sale</SelectItem>
            </Select>
          )}
        />

        <Input
          {...register("size", { valueAsNumber: true })}
          errorMessage={errors.size?.message}
          isInvalid={!!errors.size}
          placeholder="Property Size (sq ft) or meters"
          radius="lg"
          size="lg"
          startContent={<GoPerson className="text-default-400 text-xl" />}
          type="number"
          variant="bordered"
        />

        <Textarea
          {...register("address")}
          errorMessage={errors.address?.message}
          isInvalid={!!errors.address}
          placeholder="Street address only (no city, state or country)"
          radius="lg"
          size="lg"
          startContent={
            <GoPerson className="text-default-400 text-xl mt-0.5" />
          }
          variant="bordered"
        />

        <Controller
          control={control}
          name="yearBuilt"
          render={({ field }) => (
            <Select
              aria-label="Year built"
              errorMessage={errors.yearBuilt?.message}
              isInvalid={!!errors.yearBuilt}
              placeholder="Year Built"
              radius="lg"
              selectedKeys={
                field.value != null
                  ? new Set([field.value.toString()])
                  : new Set()
              }
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => {
                const val = Array.from(keys)[0] as string;

                field.onChange(val ? parseInt(val, 10) : undefined);
              }}
            >
              {yearOptions.map((year) => (
                <SelectItem key={year.key}>{year.label}</SelectItem>
              ))}
            </Select>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                aria-label="Country"
                errorMessage={errors.country?.message}
                isInvalid={!!errors.country}
                placeholder="Country"
                radius="lg"
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                size="lg"
                variant="bordered"
                onSelectionChange={(keys) => {
                  const name = Array.from(keys)[0] as string;

                  field.onChange(name ?? "");
                  if (name) {
                    setValue("state", "");
                    setValue("city", "");
                  }
                }}
              >
                {allCountries.map((c: ICountry) => (
                  <SelectItem key={c.name}>{c.name}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <Select
                aria-label="State"
                errorMessage={errors.state?.message}
                isInvalid={!!errors.state}
                placeholder="State"
                radius="lg"
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                size="lg"
                variant="bordered"
                onSelectionChange={(keys) => {
                  const name = Array.from(keys)[0] as string;

                  field.onChange(name ?? "");
                  if (name) setValue("city", "");
                }}
              >
                {statesOfCountry.map((s: IState) => (
                  <SelectItem key={s.name}>{s.name}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Select
                aria-label="City"
                errorMessage={errors.city?.message}
                isInvalid={!!errors.city}
                placeholder="City"
                radius="lg"
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                size="lg"
                variant="bordered"
                onSelectionChange={(keys) =>
                  field.onChange((Array.from(keys)[0] as string) ?? "")
                }
              >
                {citiesOfState.map((city: ICity) => (
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
          name="features"
          render={({ field }) => (
            <Select
              aria-label="Property features"
              errorMessage={errors.features?.message}
              isInvalid={!!errors.features}
              placeholder="Property features"
              radius="lg"
              selectedKeys={new Set(field.value || [])}
              selectionMode="multiple"
              size="lg"
              startContent={<LuHouse className="text-default-400 text-xl" />}
              variant="bordered"
              onSelectionChange={(keys) => {
                field.onChange(Array.from(keys) as string[]);
              }}
            >
              {featuresOptions.map((f) => (
                <SelectItem key={f.key}>{f.label}</SelectItem>
              ))}
            </Select>
          )}
        />

        <div className="pt-2">
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <ImageUploader
                error={errors.images?.message}
                images={(field.value || []) as (File | string)[]}
                maxFiles={10}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex justify-center pt-10">
          <Button
            fullWidth
            className="text-white"
            color="primary"
            isLoading={isPending}
            radius="lg"
            size="lg"
            type="submit"
          >
            {isPending ? "Listing Property..." : "List Property"}
          </Button>
        </div>
      </form>
    </div>
  );
}
