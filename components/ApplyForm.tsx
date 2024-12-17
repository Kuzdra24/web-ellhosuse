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
const applyFormSchema = z.object({
    name: z.string().min(3, "Imię i nazwisko jest wymagane"),
    email: z.string().email("Podaj prawidłowy adres e-mail"),
    phone: z.string().regex(/^\d{9}$/, "Numer telefonu powinien składać się z 9 cyfr"),
    region: z.string().min(1, "Wybierz województwo"),
    homeType: z.string().min(1, "Wybierz typ nieruchomości"),
    city: z.string().min(1, "Podaj miasto"),
    offerType: z.string().min(1, "Wybierz typ oferty"),
    price: z
        .string()
        .regex(/^\d+(\.\d+)?$/, "Cena musi być liczbą, np. 123 lub 123.45")
        .min(1, "Cena jest wymagana"),
    area: z
        .string()
        .regex(/^\d+(\.\d+)?$/, "Powierzchnia musi być liczbą, np. 50 lub 50.5")
        .min(1, "Powierzchnia jest wymagana"),
    saleDate: z.date({
        required_error: "Data jest wymagana",
    }),
});

// Typowanie formularza
type ApplyFormValues = z.infer<typeof applyFormSchema>;

export function ApplyForm() {
    const form = useForm<ApplyFormValues>({
        resolver: zodResolver(applyFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            region: "",
            homeType: "",
            city: "",
            offerType: "",
            price: "",
            area: "",
            saleDate: undefined,
        },
    });

    const { toast } = useToast();

    const onSubmit = (values: ApplyFormValues) => {
        console.log("Submitted Data: ", values);

        toast({
            title: "Formularz wysłany pomyślnie!",
            description: "Twoje dane zostały przesłane.",
        });
    };
    console.log("Błędy formularza: ", form.formState.errors);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white rounded-md shadow-md flex justify-center items-center flex-wrap w-full max-w-[1000px]">
                <div className="w-full sm:w-[50%] min-w-[250px] p-5 sm:p-10">
                    <h2 className="font-montserrat text-[24px] text-text">Twoje Dane</h2>
                    <FormField
                        control={form.control}
                        name="name"
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
                                    <Input placeholder="123456789" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="saleDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kiedy rozpocząć poszukiwania</FormLabel><br />
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

                    <Button type="submit" variant={"primary"} size={"lg"} className="w-full">Wyślij formularz</Button>
                </div>

                <div className="w-full sm:w-[50%] min-w-[250px] p-5 sm:p-10">
                    <h2 className="font-montserrat text-[24px] text-text">Dane nieruchomości</h2>
                    <FormField
                        control={form.control}
                        name="offerType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Typ oferty</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Wybierz typ oferty" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="sprzedaż">Sprzedaż</SelectItem>
                                        <SelectItem value="wynajem">Wynajem</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                        {regions.map(region => (
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

                    <FormField
                        control={form.control}
                        name="homeType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Typ nieruchomości</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Wybierz typ nieruchomości" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {homeTypes.map(item => (
                                            <SelectItem value={item.value} key={item.value}>{item.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Miasto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Opole" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Cena jako pole tekstowe */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cena</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Cena nieruchomości"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Powierzchnia jako pole tekstowe */}
                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Powierzchnia (m²)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Powierzchnia nieruchomości"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
}
