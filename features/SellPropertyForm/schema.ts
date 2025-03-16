import {z} from "zod";
import {isValidPhoneNumber} from "libphonenumber-js";

export const sellPropertySchema = z.object({
  propertyType: z.string().min(3).max(20),
  area: z
    .string()
    .regex(/^\d+$/, "Powierzchnia musi być liczbą")
    .transform(Number)
    .refine((val) => val > 0, "Powierzchnia musi być większa niż 0"),
  unit: z.enum(["m2", "ar", "ha"]),
  roomsCount: z.string().min(1).max(5),
  region: z.string().min(3).max(20),
  city: z.string().min(3).max(20),
  streetAddress: z.string().min(3).max(30),
  offerType: z.string().min(3).max(20),
  price: z
    .string()
    .regex(/^\d+$/, "Cena musi być liczbą")
    .transform(Number)
    .refine((val) => val > 0, "Cena musi być większa niż 0"),
  date: z.date({
    required_error: "Wybierz datę rozpoczęcia poszukiwań",
  }),
  fullName: z.string().min(3, "Imię i nazwisko jest wymagane"),
  email: z.string().email("Podaj prawidłowy adres email"),
  phone: z
    .string()
    .refine(
      (value) => isValidPhoneNumber(value),
      "Podaj prawidłowy numer telefonu"
    ),

  terms: z.boolean().refine((data) => data),
});

export type sellPropertySchema = z.infer<typeof sellPropertySchema>;