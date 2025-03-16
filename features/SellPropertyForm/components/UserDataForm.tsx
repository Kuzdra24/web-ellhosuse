"use client";
import {z} from "zod";
import {sellPropertySchema} from "../schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import {Button} from "@/components/UI/Button";
import {Input} from "@/components/UI/Input";
import {useRouter} from "next/navigation";
import {useSellPropertyStore} from "@/app/sprzedaj-nieruchomosc/store";
import {useEffect} from "react";
import {PhoneInput} from "@/components/UI/phone-input";
import {Checkbox} from "@/components/UI/checkbox";

const sellPropertyUserSchema = sellPropertySchema.pick({
  fullName: true,
  email: true,
  phone: true,
  terms: true,
});

type SellPropertyUserSchema = z.infer<typeof sellPropertyUserSchema>;

export function UserDataForm() {
  const router = useRouter();

  // Pobieranie danych ze store
  const {
    fullName,
    email,
    phone,
    terms,
    propertyType,
    area,
    roomsCount,
    region,
    city,
    offerType,
    price,
    date,
    setData,
  } = useSellPropertyStore((state) => ({
    fullName: state.fullName,
    email: state.email,
    phone: state.phone,
    terms: state.terms,
    propertyType: state.propertyType,
    area: state.area,
    roomsCount: state.roomsCount,
    region: state.region,
    city: state.city,
    offerType: state.offerType,
    price: state.price,
    date: state.date,
    setData: state.setData,
  }));

  const form = useForm<SellPropertyUserSchema>({
    resolver: zodResolver(sellPropertyUserSchema),
    defaultValues: {
      fullName: fullName || "",
      email: email || "",
      phone: phone || "",
      terms: terms || false,
    },
  });

  const {watch, setValue} = form;

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
    console.log(data)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-8"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Imię i nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="np. Jan Kowalski" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="np. jan@example.com" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({field}) => (
            <FormItem>
              <FormLabel>Numer telefonu</FormLabel>
              <FormControl>
                <PhoneInput
                  value={watch("phone")}
                  onChange={(value) => setValue("phone", value)}
                  defaultCountry="PL"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        {/* Zgoda na przetwarzanie danych */}
        <FormField
          control={form.control}
          name="terms"
          render={({field}) => (
            <FormItem className="flex items-end mb-10">
              <FormControl>
                <Checkbox
                  className="mr-2"
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="terms" className="text-xs">
                Akceptuję Politykę Prywatności
              </FormLabel>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/sprzedaj-nieruchomosc/dane-oferty")}
          >
            Wstecz
          </Button>
          <Button type="submit">Wyślij</Button>
        </div>
      </form>
    </Form>
  );
}