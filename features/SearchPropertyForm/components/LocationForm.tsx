"use client";
import { z } from "zod";
import { searchPropertySchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useRouter } from "next/navigation";
import { useSearchPropertyStore } from "@/app/zlec-poszukiwanie/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { regions } from "@/data/applyFormData";
import React, { useEffect } from "react";

const searchPropertyLocationSchema = searchPropertySchema.pick({
  region: true,
  city: true,
  streetAddress: true,
});

const locationSchema = searchPropertyLocationSchema.extend({
  streetAddress: searchPropertySchema.shape.streetAddress.optional(),
});

type SearchPropertyLocationSchema = z.infer<typeof locationSchema>;

export function LocationForm() {
  const router = useRouter();

  // Zmiana na useSearchPropertyStore z @/app/zlec-poszukiwanie/store
  const region: string | undefined = useSearchPropertyStore((state) => state.region);
  const city: string | undefined = useSearchPropertyStore((state) => state.city);
  const streetAddress: string | undefined = useSearchPropertyStore((state) => state.streetAddress);
  const propertyType: string | undefined = useSearchPropertyStore((state) => state.propertyType);
  const areaMin: string | undefined = useSearchPropertyStore((state) => state.areaMin);
  const areaMax: string | undefined = useSearchPropertyStore((state) => state.areaMax);
  const roomsCount: string | undefined = useSearchPropertyStore((state) => state.roomsCount);
  const setData = useSearchPropertyStore((state) => state.setData);

  const form = useForm<SearchPropertyLocationSchema>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      region: region || "",
      city: city || "",
      streetAddress: streetAddress || "",
    },
  });

  useEffect(() => {
    if (!useSearchPropertyStore.persist.hasHydrated) return;

    if (!propertyType || !areaMin || !areaMax) {
      router.push("/zlec-poszukiwanie/1");
    }
  }, [useSearchPropertyStore.persist.hasHydrated, propertyType, areaMin, areaMax, roomsCount, router]);

  const onSubmit = (data: SearchPropertyLocationSchema) => {
    setData(data);
    router.push("/zlec-poszukiwanie/3");
  }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] space-y-8">
          {/* Wybór województwa */}
          <FormField
            control={form.control}
            name="region"
            render={({field}) => (
              <FormItem>
                <FormLabel>Województwo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz województwo"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />

          {/* Miasto */}
          <FormField
            control={form.control}
            name="city"
            render={({field}) => (
              <FormItem>
                <FormLabel>Miasto</FormLabel>
                <FormControl>
                  <Input placeholder="np. Kraków" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          {/* Ulica */}
          <FormField
            control={form.control}
            name="streetAddress"
            render={({field}) => (
              <FormItem>
                <FormLabel>Ulica</FormLabel>
                <FormControl>
                  <Input placeholder="np. Floriańska 1" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          {/* Przyciski wstecz i dalej */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/zlec-poszukiwanie/1")} // Zmiana trasy na /zlec-poszukiwanie/1
            >
              Wstecz
            </Button>
            <Button type="submit" effect={"gooeyRight"}>Dalej</Button>
          </div>
        </form>
      </Form>
    );
}