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
import { useSearchPropertyStore } from "@/app/zlec-poszukiwanie/store"; // Zmiana na store
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { homeTypes } from "@/data/applyFormData";
import { useEffect } from "react";

const searchPropertyHouseSchema = searchPropertySchema.pick({
  propertyType: true,
  areaMin: true,
  areaMax: true,
  unit: true,
  roomsCount: true,
});

type SearchPropertyHouseSchema = z.infer<typeof searchPropertyHouseSchema>;

export function PropertyDataForm() {
  const router = useRouter();

  // Używanie useSearchPropertyStore z @/app/zlec-poszukiwanie/store
  const propertyType: string | undefined = useSearchPropertyStore((state) => state.propertyType);
  const areaMin: string | undefined = useSearchPropertyStore((state) => state.areaMin);
  const areaMax: string | undefined = useSearchPropertyStore((state) => state.areaMax);
  const unit: "m2" | "ar" | "ha" | undefined = useSearchPropertyStore((state) => state.unit);
  const roomsCount: string | undefined = useSearchPropertyStore((state) => state.roomsCount);
  const setData = useSearchPropertyStore((state) => state.setData);

  const form = useForm<SearchPropertyHouseSchema>({
    resolver: zodResolver(searchPropertySchema),
    defaultValues: {
      propertyType: propertyType || "",
      areaMin: areaMin || "",
      areaMax: areaMax || "",
      unit: unit || "m2",
      roomsCount: roomsCount || "",
    },
  });

  const currentPropertyType = form.watch("propertyType");

  useEffect(() => {
    if (currentPropertyType === "działka" || currentPropertyType === "lokal") {
      form.setValue("roomsCount", "");
    }
  }, [currentPropertyType, form]);

  const onSubmit = (data: SearchPropertyHouseSchema) => {
    setData(data);

    router.push("/zlec-poszukiwanie/2");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] space-y-8">
        {/* Typ nieruchomości */}
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

        {/* Powierzchnia - Min i Max */}
        <FormField
          control={form.control}
          name="areaMin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powierzchnia (min)</FormLabel>
              <FormControl>
                <Input placeholder="np. 50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="areaMax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powierzchnia (max)</FormLabel>
              <FormControl>
                <Input placeholder="np. 100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Jednostka */}
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jednostka</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Liczba pokoi - tylko dla odpowiednich typów nieruchomości */}
        {currentPropertyType !== "działka" && currentPropertyType !== "lokal" && (
          <FormField
            control={form.control}
            name="roomsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liczba Pokoi</FormLabel>
                <FormControl>
                  <Input placeholder="np. 3" {...field} />
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
