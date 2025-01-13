'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/UI/Input";
import { Textarea } from "@/components/UI/textarea";
import { Button } from "@/components/UI/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";

const contactSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  email: z.string().email("Podaj prawidłowy adres email"),
  message: z.string().min(1, "Wiadomość jest wymagana"),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Tutaj możesz dodać logikę do wysyłania formularza
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-md max-w-[500px]">
      <h1 className="text-4xl font-bold mb-8 text-center">Kontakt</h1>
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
          <Button type="submit">Wyślij</Button>
        </form>
      </Form>
    </div>
  );
}