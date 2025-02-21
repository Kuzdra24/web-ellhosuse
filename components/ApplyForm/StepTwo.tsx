// StepTwo.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/UI/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { homeTypes, regions } from "@/data/applyFormData";
// Schemat walidacji
const stepTwoSchema = z.object({
  homeType: z.string().min(1, "Wybierz typ nieruchomości"),
  offerType: z.string().min(1, "Wybierz typ oferty"),
  region: z.string().min(1, "Wybierz województwo"),
  city: z.string().min(1, "Podaj miasto"),
  street: z.string().min(2, "Podaj ulicę"),
});

type StepTwoProps = {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export default function StepTwo({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepTwoProps) {
  const form = useForm({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      homeType: formData.homeType,
      offerType: formData.offerType,
      region: formData.region,
      city: formData.city,
      street: formData.street,
    },
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    console.log(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="sm:w-full w-[50%] p-5 sm:p-10">
          <h2 className="font-montserrat text-[24px] text-text">
            Dane nieruchomości
          </h2>
          {/* Home Type */}
          <FormField
            control={form.control}
            name="homeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ nieruchomości</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

          {/* Offer Type */}
          <FormField
            control={form.control}
            name="offerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ oferty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz typ oferty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sprzedaz">Sprzedaż</SelectItem>
                    <SelectItem value="wynajem">Wynajem</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Region */}
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

          {/* Adres */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miasto</FormLabel>
                <FormControl>
                  <Input placeholder="Podaj miasto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ulica</FormLabel>
                <FormControl>
                  <Input placeholder="Podaj ulicę" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="button" onClick={prevStep}>
              Wstecz
            </Button>
            <Button type="submit">Dalej</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
