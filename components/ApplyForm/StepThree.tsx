"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { pl } from "date-fns/locale";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/checkbox";
import { Input } from "@/components/UI/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Calendar } from "@/components/UI/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";
import { Progress } from "@/components/UI/progress";
import { useToast } from "@/hooks/use-toast";

const areaUnitMultipliers: Record<string, number> = {
  m2: 1,
  ar: 100,
  ha: 10000,
};

const stepThreeSchema = z.object({
  price: z
    .string()
    .regex(/^\d+$/, "Cena musi być liczbą")
    .transform(Number)
    .refine((val) => val > 0, "Cena musi być większa niż 0"),
  area: z
    .string()
    .regex(/^\d+$/, "Powierzchnia musi być liczbą")
    .transform(Number)
    .refine((val) => val > 0, "Powierzchnia musi być większa niż 0"),
  areaUnit: z.enum(["m2", "ar", "ha"]),
  searchDate: z.date({
    required_error: "Wybierz datę rozpoczęcia poszukiwań",
  }),
  terms: z.literal(true, {
    errorMap: () => ({
      message: "Musisz zaakceptować Politykę Prywatności",
    }),
  }),
});

type StepThreeProps = {
  formData: any;
  updateFormData: (data: any) => void;
  prevStep: () => void;
};

export default function StepThree({
  formData,
  prevStep,
  updateFormData,
}: StepThreeProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const form = useForm({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      price: formData.price,
      area: formData.area,
      areaUnit: formData.areaUnit || "m2",
      searchDate: formData.searchDate,
      terms: formData.terms,
    },
  });

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : prev));
    }, 100);

    try {
      const convertedArea = data.area * areaUnitMultipliers[data.areaUnit];

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, area: convertedArea }),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłania danych.");
      }

      toast({
        title: "Sukces!",
        description: "Dane zostały wysłane pomyślnie.",
        variant: "success",
      });
      console.log(formData);
      setProgress(100);
    } catch (error) {
      console.error("Błąd: ", error);

      toast({
        title: "Błąd",
        description: "Nie udało się wysłać danych. Spróbuj ponownie.",
        variant: "destructive",
      });
      setProgress(0);
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data: any) => {
    updateFormData(data);
    handleSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="sm:w-full w-[50%] p-5 sm:p-10">
          {isSubmitting && (
            <div className="mt-4">
              <Progress value={progress} />
              <p className="text-sm text-gray-500 mt-2">Wysyłanie danych...</p>
            </div>
          )}

          {/* Cena */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cena (PLN)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="np. 500000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Powierzchnia */}
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Powierzchnia</FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input type="text" placeholder="np. 50" {...field} />
                  </FormControl>
                  <FormField
                    control={form.control}
                    name="areaUnit"
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

          {/* Data rozpoczęcia poszukiwań */}
          <FormField
            control={form.control}
            name="searchDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kiedy rozpocząć poszukiwanie</FormLabel>
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

          {/* Zgoda na przetwarzanie danych */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
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
                  <FormMessage />
                </FormItem>
              )}
            />

          <div className="flex justify-between">
            <Button type="button" onClick={prevStep}>
              Wstecz
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Wysyłanie..." : "Wyślij"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
