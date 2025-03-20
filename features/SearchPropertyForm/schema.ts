import {z} from "zod";
import {isValidPhoneNumber} from "libphonenumber-js";

export const searchPropertySchema = z.object({
  propertyType: z.string().min(3).max(20),
  areaMin: z.string().regex(/^\d+$/, "Minimalna powierzchnia musi być liczbą"),
  areaMax: z.string().regex(/^\d+$/, "Maksymalna powierzchnia musi być liczbą"),
  unit: z.enum(["m2", "ar", "ha"]),
  roomsCount: z.string().min(0).max(5).optional(),
  region: z.string().min(3).max(20),
  city: z.string().min(3).max(20),
  streetAddress: z.string().min(3).max(30),
  offerType: z.string().min(3).max(20),
  priceMin: z.string().regex(/^\d+$/, "Minimalna cena musi być liczbą"),
  priceMax: z.string().regex(/^\d+$/, "Maksymalna cena musi być liczbą"),
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

export type searchPropertySchema = z.infer<typeof searchPropertySchema>;