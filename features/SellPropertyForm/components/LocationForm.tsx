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
import { regions } from "@/data/applyFormData";
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

  const region: string | undefined = useSellPropertyStore((state) => state.region);
  const city: string | undefined = useSellPropertyStore((state) => state.city);
  const streetAddress: string | undefined = useSellPropertyStore((state) => state.streetAddress);
  const propertyType: string | undefined = useSellPropertyStore((state) => state.propertyType);
  const area: string | undefined = useSellPropertyStore((state) => state.area);
  const roomsCount: string | undefined = useSellPropertyStore((state) => state.roomsCount);
  const setData = useSellPropertyStore((state) => state.setData);

  const form = useForm<SellPropertyLocationSchema>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      region: region || "",
      city: city || "",
      streetAddress: streetAddress || "",
    },
  });

  useEffect(() => {
    if (!useSellPropertyStore.persist.hasHydrated) return;

    if (!propertyType || !area ) {
      router.push("/sprzedaj-nieruchomosc/1");
    }
  }, [useSellPropertyStore.persist.hasHydrated, propertyType, area, roomsCount, router]);

  const onSubmit = (data: SellPropertyLocationSchema) => {
    setData(data);
    router.push("/sprzedaj-nieruchomosc/3");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] space-y-8">
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
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ulica</FormLabel>
              <FormControl>
                <Input placeholder="np. Floriańska 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/sprzedaj-nieruchomosc/1")}
          >
            Wstecz
          </Button>
          <Button type="submit" effect={"gooeyRight"}>Dalej</Button>
        </div>
      </form>
    </Form>
  );
}