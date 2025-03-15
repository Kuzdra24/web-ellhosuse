"use client";
import React from "react";
import { z } from "zod";
import { sellPropertySchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useRouter } from "next/navigation";
import {useSellPropertyStore} from "@/app/sprzedaj-nieruchomosc/store";
import { useEffect } from "react";

const sellPropertyHouseSchema = sellPropertySchema.pick({
  propertyType: true,
  area: true,
  unit: true,
  roomsCount: true,
});

type SellPropertyHouseSchema = z.infer<typeof sellPropertyHouseSchema>;

export function SellPropertyHouseForm(): React.FC {
  const router = useRouter();

  const propertyType: string | undefined = useSellPropertyStore((state) => state.propertyType);
  const area: number | undefined = useSellPropertyStore((state) => state.area)
  const unit: string | undefined = useSellPropertyStore((state) => state.unit)
  const roomsCount: string | undefined = useSellPropertyStore((state) => state.roomsCount)
  const setData = useSellPropertyStore((state) => state.setData);

  const form = useForm<SellPropertyHouseSchema>({
    resolver: zodResolver(sellPropertyHouseSchema),
    defaultValues: {
      propertyType: "",
      area: 0,
      unit: "",
      roomsCount: "",
    },
  });

  const onSubmit = (data: SellPropertyHouseSchema) => {
    setData(data);
    router.push("/sprzedaj-nieruchomosc/lokalizaja");
  };

  useEffect(() => {
    if (!useSellPropertyStore().persist.hasHydrated) return;

    if (!firstName || !lastName) {
      router.push("/onboarding/name");
    }
  }, [useSellPropertyStore().persist.hasHydrated, firstName, lastName, router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-8"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormDescription>
                This is your password confirmation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}