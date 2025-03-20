"use client";
import {z} from "zod";
import {searchPropertySchema} from "../schema";
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
import {useSearchPropertyStore} from "@/app/zlec-poszukiwanie/store";
import {useEffect} from "react";
import {PhoneInput} from "@/components/UI/phone-input";
import {Checkbox} from "@/components/UI/checkbox";

const searchPropertyUserSchema = searchPropertySchema.pick({
  fullName: true,
  email: true,
  phone: true,
  terms: true,
});

type SellPropertyUserSchema = z.infer<typeof searchPropertyUserSchema>;

export function UserDataForm() {
  const router = useRouter();
  const fullName: string | undefined = useSearchPropertyStore((state) => state.fullName);
  const email: string | undefined = useSearchPropertyStore((state) => state.email);
  const phone: string | undefined = useSearchPropertyStore((state) => state.phone);
  const terms: boolean | undefined = useSearchPropertyStore((state) => state.terms);
  const propertyType: string | undefined = useSearchPropertyStore((state) => state.propertyType);
  const areaMin: string | undefined = useSearchPropertyStore((state) => state.areaMin);
  const areaMax: string | undefined = useSearchPropertyStore((state) => state.areaMax);
  const roomsCount: string | undefined = useSearchPropertyStore((state) => state.roomsCount);
  const region: string | undefined = useSearchPropertyStore((state) => state.region);
  const city: string | undefined = useSearchPropertyStore((state) => state.city);
  const offerType: string | undefined = useSearchPropertyStore((state) => state.offerType);
  const priceMin: string | undefined = useSearchPropertyStore((state) => state.priceMin);
  const priceMax: string | undefined = useSearchPropertyStore((state) => state.priceMax);
  const date: Date | undefined = useSearchPropertyStore((state) => state.date);
  const setData = useSearchPropertyStore((state) => state.setData);

  const form = useForm<SellPropertyUserSchema>({
    resolver: zodResolver(searchPropertyUserSchema),
    defaultValues: {
      fullName: fullName || "",
      email: email || "",
      phone: phone || "",
      terms: terms || false,
    },
  });

  const {watch, setValue} = form;

  useEffect(() => {
    if (!useSearchPropertyStore.persist.hasHydrated) return;

    if (!propertyType || !areaMin || !areaMax || !region || !city || !offerType || !priceMin || !priceMax || !date) {
      router.push("/sprzedaj-nieruchomosc/1");
    }
  }, [useSearchPropertyStore.persist.hasHydrated, propertyType, areaMin, areaMax, region, city, offerType, priceMin, priceMax, date, router,]);

  const onSubmit = (data: SellPropertyUserSchema) => {
    setData(data);
    console.log({
      ...data,
      propertyType,
      areaMin,
      areaMax,
      roomsCount,
      region,
      city,
      offerType,
      priceMin,
      priceMax,
      date
    })
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

        {/* Numer telefonu */}
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

        {/* Zgoda na warunki (terms) */}
        <FormField
          control={form.control}
          name="terms"
          render={({field}) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange} className={"mt-2"}
                />
              </FormControl>
              <FormLabel htmlFor="terms" className="text-sm font-gray-500 my-auto">
                Akceptuję warunki użytkowania
              </FormLabel>
              <FormMessage/>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/sprzedaj-nieruchomosc/3")}
          >
            Wstecz
          </Button>
          <Button type="submit" effect={"gooeyRight"}>Wyślij</Button>
        </div>
      </form>
    </Form>
  );
}