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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";

const stepTwoSchema = z.object({
  minPrice: z
    .string()
    .regex(/^\d+$/, "Cena minimalna musi być liczbą nieujemną"),
  maxPrice: z
    .string()
    .regex(/^\d+$/, "Cena maksymalna musi być liczbą nieujemną"),
  minArea: z
    .string()
    .regex(/^\d+$/, "Powierzchnia minimalna musi być liczbą nieujemną"),
  maxArea: z
    .string()
    .regex(/^\d+$/, "Powierzchnia maksymalna musi być liczbą nieujemną"),
  searchDate: z.date({
    required_error: "Wybierz datę rozpoczęcia poszukiwań",
  }),
  terms: z
    .boolean()
    .refine((value) => value === true, "Akceptacja regulaminu jest wymagana"),
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
  const [progress, setProgress] = useState(10);

  const form = useForm({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      minPrice: formData.minPrice,
      maxPrice: formData.maxPrice,
      minArea: formData.minArea,
      maxArea: formData.maxArea,
      areaUnit: formData.areaUnit || "m2",
      searchDate: formData.searchDate,
      terms: formData.terms,
    },
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      let progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 50);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłania danych.");
      }

      toast({
        title: "Sukces!",
        description: "Dane zostały wysłane pomyślnie.",
        variant: "success",
      });
    } catch (error) {
      console.error("Błąd: ", error);
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać danych. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const onSubmit = (data: any) => {
    updateFormData(data);
    handleSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="sm:w-full w-[50%] p-5 sm:p-10">
          <h2 className="font-montserrat text-[24px] text-text">
            Jakiej nieruchomości szukasz?
          </h2>
          {isSubmitting && (
            <div>
              <Progress value={progress} />
              <p className="text-sm text-gray-500 mt-2">Wysyłanie danych...</p>
            </div>
          )}

          <div className="flex items-end justify-between">
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem className="w-[50%] mr-4">
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
              name="maxPrice"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormControl>
                    <Input type="number" placeholder="Do" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormLabel>Powierzchnia</FormLabel>
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="minArea"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="Od" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxArea"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="Do" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Powierzchnia maksymalna */}

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
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="button" onClick={prevStep}>
              Wstecz
            </Button>
            <Button type="submit">Wyślij</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
