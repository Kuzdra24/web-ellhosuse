"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { Slider } from "@/components/UI/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/UI/select";
import { Calendar } from "@/components/UI/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/UI/popover";
import { useToast } from "@/hooks/use-toast";
import { pl } from 'date-fns/locale'
import { regions, homeTypes } from '@/data/applyFormData'

// Schema walidacji formularza
const formSchema = z.object({
    fullName: z.string().min(3, "Imię i nazwisko jest wymagane"),
    email: z.string().email("Podaj prawidłowy adres email"),
    phone: z.string().regex(/^\d{9}$/, "Numer telefonu powinien składać się z 9 cyfr"),
    homeType: z.string().min(1, "Wybierz typ nieruchomości"),
    offerType: z.string().min(1, "Wybierz typ oferty"),
    region: z.string().min(1, "Wybierz województwo"),
    city: z.string().min(1, "Podaj miasto"),
    priceRange: z
        .tuple([z.number().min(0, "Cena minimalna musi być nieujemna"), z.number()])
        .refine(([min, max]) => max > min, "Cena maksymalna musi być większa niż minimalna"),
    areaRange: z
        .tuple([z.number().min(0, "Powierzchnia minimalna musi być nieujemna"), z.number()])
        .refine(([min, max]) => max > min, "Powierzchnia maksymalna musi być większa niż minimalna"),
    searchDate: z.date({
        required_error: "Wybierz datę rozpoczęcia poszukiwań",
    }),
});

// Typowanie wartości formularza
type FormValues = z.infer<typeof formSchema>;

export function SearchForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            homeType: "",
            offerType: "",
            region: "",
            city: "",
            priceRange: [0, 1000000],
            areaRange: [0, 200],
            searchDate: undefined,
        },
    });
    const { toast } = useToast();

    const offerType = form.watch("offerType"); 

    const priceRangeConfig =
        offerType === "sprzedaz"
            ? { min: 0, max: 5000000, step: 10000 }
            : { min: 0, max: 10000, step: 100 };

    const onSubmit = (values: FormValues) => {
        console.log("Submitted Data: ", values);

        toast({
            title: "Formularz wysłany pomyślnie!",
            description: "Twoje dane zostały przesłane.",
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white rounded-md shadow-md flex justify-center items-center flex-wrap w-full max-w-[1000px]">
                <div className="w-full sm:w-[50%] min-w-[250px] p-5 sm:p-10"> {/* Full Name */}
                    <h2 className="font-montserrat text-[24px] text-text">Twoje Dane</h2>
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

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adres email</FormLabel>
                                <FormControl>
                                    <Input placeholder="jan.kowalski@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numer telefonu</FormLabel>
                                <FormControl>
                                    <Input placeholder="123456789" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Search Date */}
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

                    <Button type="submit" variant={"primary"} size={"lg"} className="w-full">Wyślij zgłoszenie</Button>
                </div>

                <div className="w-full sm:w-[50%] min-w-[250px] p-5 sm:p-10">
                    <h2 className="font-montserrat text-[24px] text-text">Jakiej nieruchomości szukasz?</h2>
                    {/* Home Type */}
                    <FormField
                        control={form.control}
                        name="homeType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Typ nieruchomości</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Wybierz typ nieruchomości" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {homeTypes.map(item => <SelectItem value={item.value} key={item.value}>{item.label}</SelectItem>)}

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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <FormField control={form.control} name="region" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Województwo</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Wybierz województwo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {regions.map(region => (
                                        <SelectItem key={region.value} value={region.value}>
                                            {region.label} {/* Wyświetla pełną nazwę województwa */}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/* City */}
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
                                    min={priceRangeConfig.min}
                                    max={priceRangeConfig.max}
                                    step={priceRangeConfig.step}
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
                </div>
            </form>
        </Form>
    );
}
