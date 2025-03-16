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
import { useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar } from "@/components/UI/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover";
import { cn } from "@/lib/utils";

const sellPropertyOfferSchema = sellPropertySchema.pick({
  offerType: true,
  price: true,
  date: true,
});

type SellPropertyOfferSchema = z.infer<typeof sellPropertyOfferSchema>;

const offerTypes = [
  { value: "sprzedaz", label: "Sprzedaż" },
  { value: "wynajem", label: "Wynajem" },
];

export function OfferForm() {
  const router = useRouter();

  // Pobieranie danych ze store
  const {
    offerType,
    price,
    date,
    propertyType,
    area,
    roomsCount,
    region,
    city,
    setData,
  } = useSellPropertyStore((state) => ({
    offerType: state.offerType,
    price: state.price,
    date: state.date,
    propertyType: state.propertyType,
    area: state.area,
    roomsCount: state.roomsCount,
    region: state.region,
    city: state.city,
    setData: state.setData,
  }));

  const form = useForm<SellPropertyOfferSchema>({
    resolver: zodResolver(sellPropertyOfferSchema),
    defaultValues: {
      offerType: offerType || "",
      price: price || undefined,
      date: date || undefined,
    },
  });

  useEffect(() => {
    if (!useSellPropertyStore.persist.hasHydrated) return;

    if (
      !propertyType ||
      !area ||
      (["dom", "mieszkanie"].includes(propertyType) && !roomsCount) ||
      !region ||
      !city
    ) {
      router.push("/sprzedaj-nieruchomosc");
    }
  }, [propertyType, area, roomsCount, region, city, router]);

  // Funkcja obsługująca przesłanie formularza
  const onSubmit = (data: SellPropertyOfferSchema) => {
    setData(data); // Aktualizacja danych w store
    router.push("/sprzedaj-nieruchomosc/dane-personalne"); // Przejście do kroku 4
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
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena</FormLabel>
              <FormControl>
                <Input type="text" placeholder="np. 500000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/sprzedaj-nieruchomosc/lokalizacja")}
          >
            Wstecz
          </Button>
          <Button type="submit">Dalej</Button>
        </div>
      </form>
    </Form>
  );
}