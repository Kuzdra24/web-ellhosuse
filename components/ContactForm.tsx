'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/UI/Input";
import { Textarea } from "@/components/UI/textarea";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import PrimaryButton from "./PrimaryButton";

const contactSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  email: z.string().email("Podaj prawidłowy adres email"),
  message: z.string().min(1, "Wiadomość jest wymagana"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "To pole jest wymagane" }),
  }),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      terms: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container p-8 bg-white shadow-lg rounded-md max-w-[500px]">
      <h1 className="text-4xl text-neutral-600 font-lora mb-8 text-center">Formularz kontaktowy</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię</FormLabel>
                <FormControl>
                  <Input placeholder="Twoje imię" {...field} />
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
                  <Input placeholder="Twój email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wiadomość</FormLabel>
                <FormControl>
                  <Textarea placeholder="Twoja wiadomość" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel htmlFor="terms" className="text-[11px] text-neutral-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Akceptuję Politykę Prywatności oraz wyrażam zgodę przetwarzanie danych w celu odpowiedzi na wypełniony formularz kontaktowy.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"primary"}>Wyślij</Button>
        </form>
      </Form>
    </div>
  );
}