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
import { useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar } from "@/components/UI/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover";
import { cn } from "@/lib/utils";

const searchPropertyOfferSchema = searchPropertySchema.pick({
  offerType: true,
  priceMin: true,
  priceMax: true,
  date: true,
});

type SearchPropertyOfferSchema = z.infer<typeof searchPropertyOfferSchema>;

const offerTypes = [
  { value: "sprzedaz", label: "Sprzedaż" },
  { value: "wynajem", label: "Wynajem" },
];

export function OfferForm() {
  const router = useRouter();

  const offerType: string | undefined = useSearchPropertyStore((state) => state.offerType);
  const priceMin: string | undefined = useSearchPropertyStore((state) => state.priceMin);
  const priceMax: string | undefined = useSearchPropertyStore((state) => state.priceMax);
  const date: Date | undefined = useSearchPropertyStore((state) => state.date);
  const propertyType: string | undefined = useSearchPropertyStore((state) => state.propertyType);
  const areaMin: string | undefined = useSearchPropertyStore((state) => state.areaMin);
  const areaMax: string | undefined = useSearchPropertyStore((state) => state.areaMax);
  const region: string | undefined = useSearchPropertyStore((state) => state.region);
  const city: string | undefined = useSearchPropertyStore((state) => state.city);
  const setData = useSearchPropertyStore((state) => state.setData);

  const form = useForm<SearchPropertyOfferSchema>({
    resolver: zodResolver(searchPropertyOfferSchema),
    defaultValues: {
      offerType: offerType || "",
      priceMin: priceMin || "",
      priceMax: priceMax || "",
      date: date || new Date(),
    },
  });

  useEffect(() => {
    if (!useSearchPropertyStore.persist.hasHydrated) return;

    if (!propertyType || !areaMin || !areaMax || !region || !city) {
      router.push("/zlec-poszukiwanie/1");
    }
  }, [
    useSearchPropertyStore.persist.hasHydrated,
    propertyType,
    areaMin,
    areaMax,
    region,
    city,
    router,
  ]);

  const onSubmit = (data: SearchPropertyOfferSchema) => {
    setData(data);
    router.push("/zlec-poszukiwanie/4");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-8"
      >
        {/* Typ oferty */}
        <FormField
          control={form.control}
          name="offerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typ oferty</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz typ oferty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {offerTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cena */}
        <div className="flex space-x-4 items-end">
          <FormField
            control={form.control}
            name="priceMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cena</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Od" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceMax"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" placeholder="Do" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Data wystawienia */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data wystawienia</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: pl })
                      ) : (
                        <span>Wybierz datę</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={pl}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2050-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/zlec-poszukiwanie/2")}
          >
            Wstecz
          </Button>
          <Button type="submit" effect={"gooeyRight"}>Dalej</Button>
        </div>
      </form>
    </Form>
  );
}
