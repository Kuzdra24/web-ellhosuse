"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { pl } from 'date-fns/locale'
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
import { Calendar } from "@/components/UI/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/UI/popover";
import { Slider } from "@/components/UI/slider";
import { Progress } from "@/components/UI/progress";
import { useToast } from "@/hooks/use-toast";

const stepTwoSchema = z.object({
    priceRange: z
        .tuple([z.number().min(0, "Cena minimalna musi być nieujemna"), z.number()])
        .refine(([min, max]) => max > min, "Cena maksymalna musi być większa niż minimalna"),
    areaRange: z
        .tuple([z.number().min(0, "Powierzchnia minimalna musi być nieujemna"), z.number()])
        .refine(([min, max]) => max > min, "Powierzchnia maksymalna musi być większa niż minimalna"),
    searchDate: z.date({
        required_error: "Wybierz datę rozpoczęcia poszukiwań",
    }),
    terms: z.boolean().refine((value) => value === true, "Akceptacja regulaminu jest wymagana"),
});

type StepThreeProps = {
    formData: any;
    updateFormData: (data: any) => void;
    prevStep: () => void;
};

export default function StepThree({ formData, prevStep, updateFormData }: StepThreeProps) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(10);

    const form = useForm({
        resolver: zodResolver(stepTwoSchema),
        defaultValues: {
            priceRange: formData.priceRange,
            areaRange: formData.areaRange,
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
        }finally{
            setIsSubmitting(false);
            setTimeout(() => setProgress(0), 1000);
        }
    };
    const onSubmit = (data: any) => {
        updateFormData(data);
        handleSubmit()
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="sm:w-full w-[50%] p-5 sm:p-10">
                    <h2 className="font-montserrat text-[24px] text-text">Jakiej nieruchomości szukasz?</h2>
                    {isSubmitting && (
                        <div>
                            <Progress value={progress} />
                            <p className="text-sm text-gray-500 mt-2">Wysyłanie danych...</p>
                        </div>
                    )}
                    {/* Price Range */}
                    <FormField
                        control={form.control}
                        name="priceRange"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cena (min / max)</FormLabel>
                                <div className="flex justify-between">
                                    <span>{field.value[0]} PLN</span>
                                    <span>{field.value[1]} PLN</span>
                                </div>
                                <Slider
                                    defaultValue={field.value}
                                    min={0}
                                    max={formData.offerType === "wynajem" ? 10000 : 5000000}
                                    step={formData.offerType === "wynajem" ? 100 : 10000}
                                    onValueChange={field.onChange}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Area Range */}
                    <FormField
                        control={form.control}
                        name="areaRange"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Powierzchnia (min / max)</FormLabel>
                                <div className="flex justify-between">
                                    <span>{field.value[0]} m²</span>
                                    <span>{field.value[1]} m²</span>
                                </div>
                                <Slider
                                    defaultValue={field.value}
                                    min={0}
                                    max={200}
                                    step={1}
                                    onValueChange={field.onChange}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="searchDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kiedy rozpocząć poszukiwanie</FormLabel><br />
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
