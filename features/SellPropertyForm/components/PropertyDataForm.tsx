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
import { homeTypes } from "@/data/applyFormData";
import { useEffect } from "react";

const sellPropertyHouseSchema = sellPropertySchema.pick({
  propertyType: true,
  area: true,
  unit: true,
  roomsCount: true,
});

type SellPropertyHouseSchema = z.infer<typeof sellPropertyHouseSchema>;

export function PropertyDataForm() {
  const router = useRouter();

  const propertyType: string | undefined = useSellPropertyStore((state) => state.propertyType);
  const area: string | undefined = useSellPropertyStore((state) => state.area);
  const unit: "m2" | "ar" | "ha" | undefined = useSellPropertyStore((state) => state.unit);
  const roomsCount: string | undefined = useSellPropertyStore((state) => state.roomsCount);
  const setData = useSellPropertyStore((state) => state.setData);

  const form = useForm<SellPropertyHouseSchema>({
    resolver: zodResolver(sellPropertyHouseSchema),
    defaultValues: {
      propertyType: propertyType || "",
      area: area || "",
      unit: unit || "m2",
      roomsCount: roomsCount || "",
    },
  });

  // Pobierz aktualną wartość propertyType z formularza
  const currentPropertyType = form.watch("propertyType");

  // Efekt do resetowania roomsCount, gdy propertyType to "działka" lub "lokal"
  useEffect(() => {
    if (currentPropertyType === "działka" || currentPropertyType === "lokal") {
      form.setValue("roomsCount", ""); // Resetuj wartość roomsCount
    }
  }, [currentPropertyType, form]);

  const onSubmit = (data: SellPropertyHouseSchema) => {
    setData(data);
    router.push("/sprzedaj-nieruchomosc/lokalizacja");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] space-y-8">
        {/* Home Type */}
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typ nieruchomości</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz typ nieruchomości" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {homeTypes.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.label}
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
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powierzchnia</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input placeholder="np. 50" {...field} />
                </FormControl>
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[80px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m2">m²</SelectItem>
                          <SelectItem value="ar">ar</SelectItem>
                          <SelectItem value="ha">ha</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {currentPropertyType !== "działka" && currentPropertyType !== "lokal" && (
          <FormField
            control={form.control}
            name="roomsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liczba Pokoi</FormLabel>
                <FormControl>
                  <Input placeholder="3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" effect={"gooeyRight"}>Dalej</Button>
      </form>
    </Form>
  );
}