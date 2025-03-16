"use client";
import { z } from "zod";
import { sellPropertySchema } from "../schema";
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
import { useSellPropertyStore } from "@/app/sprzedaj-nieruchomosc/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { homeTypes, regions } from "@/data/applyFormData";
import { useEffect } from "react";

const sellPropertyLocationSchema = sellPropertySchema.pick({
  region: true,
  city: true,
  streetAddress: true,
});


const locationSchema = sellPropertyLocationSchema.extend({
  streetAddress: sellPropertySchema.shape.streetAddress.optional(),
});

type SellPropertyLocationSchema = z.infer<typeof locationSchema>;

export function LocationForm() {
  const router = useRouter();

  const { region, city, streetAddress, propertyType, area, roomsCount, setData } =
    useSellPropertyStore((state) => ({
      region: state.region,
      city: state.city,
      streetAddress: state.streetAddress,
      propertyType: state.propertyType,
      area: state.area,
      roomsCount: state.roomsCount,
      setData: state.setData,
    }));

  const form = useForm<SellPropertyLocationSchema>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      region: region || "",
      city: city || "",
      streetAddress: streetAddress || undefined,
    },
  });

  useEffect(() => {
    if (!useSellPropertyStore.persist.hasHydrated) return;

    if (!propertyType || !area || !roomsCount) {
      router.push("/sprzedaj-nieruchomosc");
    }
  }, [propertyType, area, roomsCount, router]);

  const onSubmit = (data: SellPropertyLocationSchema) => {
    setData(data);
    router.push("/sprzedaj-nieruchomosc/dane-oferty");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-8"
      >
        {/* Województwo */}
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Województwo</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz województwo" />
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Miasto */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Miasto</FormLabel>
              <FormControl>
                <Input placeholder="np. Kraków" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ulica (opcjonalne) */}
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ulica (opcjonalnie)</FormLabel>
              <FormControl>
                <Input placeholder="np. Floriańska 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/sprzedaj-nieruchomosc/dane-nieruchomosci")}
          >
            Wstecz
          </Button>
          <Button type="submit">Dalej</Button>
        </div>
      </form>
    </Form>
  );
}