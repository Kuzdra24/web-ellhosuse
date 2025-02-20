"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { isValidPhoneNumber } from "libphonenumber-js";
import { PhoneInput } from "@/components/UI/phone-input";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";

const stepOneSchema = z.object({
  fullName: z.string().min(3, "Imię i nazwisko jest wymagane"),
  email: z.string().email("Podaj prawidłowy adres email"),
  phone: z
    .string()
    .refine(
      (value) => isValidPhoneNumber(value),
      "Podaj prawidłowy numer telefonu"
    ),
});

type StepOneProps = {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
};

export default function StepOne({
  formData,
  updateFormData,
  nextStep,
}: StepOneProps) {
  const { watch, setValue, ...form } = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    },
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <Form {...form} watch={watch} setValue={setValue}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię i nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="Jan Kowalski" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jan.kowalski@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit">Dalej</Button>
      </form>
    </Form>
  );
}
