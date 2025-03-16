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
import { useEffect } from "react";
import { PhoneInput } from "@/components/UI/phone-input";

const sellPropertyUserSchema = sellPropertySchema.pick({
  fullName: true,
  email: true,
  phone: true,
  terms: true,
});

type SellPropertyUserSchema = z.infer<typeof sellPropertyUserSchema>;

export function UserDataForm() {
  const router = useRouter();

  // Pobieranie każdej właściwości oddzielnie z typem | undefined
  const fullName: string | undefined = useSellPropertyStore((state) => state.fullName);
  const email: string | undefined = useSellPropertyStore((state) => state.email);
  const phone: string | undefined = useSellPropertyStore((state) => state.phone);
  const terms: boolean | undefined = useSellPropertyStore((state) => state.terms);
  const propertyType: string | undefined = useSellPropertyStore((state) => state.propertyType);
  const area: number | undefined = useSellPropertyStore((state) => state.area);
  const roomsCount: string | undefined = useSellPropertyStore((state) => state.roomsCount);
  const region: string | undefined = useSellPropertyStore((state) => state.region);
  const city: string | undefined = useSellPropertyStore((state) => state.city);
  const offerType: string | undefined = useSellPropertyStore((state) => state.offerType);
  const price: number | undefined = useSellPropertyStore((state) => state.price);
  const date: Date | undefined = useSellPropertyStore((state) => state.date);
  const setData = useSellPropertyStore((state) => state.setData);

  const form = useForm<SellPropertyUserSchema>({
    resolver: zodResolver(sellPropertyUserSchema),
    defaultValues: {
      fullName: fullName || "",
      email: email || "",
      phone: phone || "",
      terms: terms || false,
    },
  });

  const { watch, setValue } = form;

  useEffect(() => {
    if (!useSellPropertyStore.persist.hasHydrated) return;

    if (
      !propertyType ||
      !area ||
      (["dom", "mieszkanie"].includes(propertyType) && !roomsCount) ||
      !region ||
      !city ||
      !offerType ||
      !price ||
      !date
    ) {
      router.push("/sprzedaj-nieruchomosc");
    }
  }, [
    propertyType,
    area,
    roomsCount,
    region,
    city,
    offerType,
    price,
    date,
    router,
  ]);

  const onSubmit = (data: SellPropertyUserSchema) => {
    setData(data);
    router.push("/sprzedaj-nieruchomosc/podsumowanie");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-8"
      >
        {/* Imię i nazwisko */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię i nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="np. Jan Kowalski" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="np. jan@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Numer telefonu */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numer telefonu</FormLabel>
              <FormControl>
                <PhoneInput
                  value={watch("phone")}
                  onChange={(value) => setValue("phone", value)}
                  defaultCountry="PL"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Zgoda na warunki (terms) */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4"
                />
              </FormControl>
              <FormLabel className="text-sm">
                Akceptuję warunki użytkowania
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Przyciski nawigacyjne */}
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/sprzedaj-nieruchomosc/dane-oferty")}
          >
            Wstecz
          </Button>
          <Button type="submit">Zakończ</Button>
        </div>
      </form>
    </Form>
  );
}