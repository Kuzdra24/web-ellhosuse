"use client";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import { regions, homeTypes } from "@/data/applyFormData";
import Button from "@/components/UI/Button";
import toast, { Toaster } from 'react-hot-toast';

// Schema walidacji za pomocą Zod
const applyFormSchema = z.object({
  name: z.string().min(3, "Imię i nazwisko jest wymagane"),
  email: z.string().email("Podaj prawidłowy adres e-mail"),
  phone: z
    .string()
    .regex(/^\d{9}$/, "Numer telefonu powinien składać się z 9 cyfr"),
  region: z.string().min(1, "Wybierz województwo"),
  homeType: z.string().min(1, "Wybierz typ nieruchomości"),
  city: z.string().min(1, "Podaj miasto"),
  price: z
    .number()
    .positive("Cena musi być liczbą dodatnią")
    .transform((value) => Number(value)),
  area: z
    .number()
    .positive("Powierzchnia musi być liczbą dodatnią")
    .transform((value) => Number(value)),
  listingDate: z.date().optional(),
});

// Typowanie formularza
type ApplyFormValues = z.infer<typeof applyFormSchema>;

export const ApplyForm: FC = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      region: "",
      homeType: "",
      city: "",
      price: undefined,
      area: undefined,
      listingDate: undefined,
    },
  });

  const notify = () => toast.success('Formularz wysłany pomyślnie', {
    duration: 3000,
    style: {
      border: '1px solid #3fc580',
      padding: '16px',
      color: '#3fc580',
    },
    iconTheme: {
      primary: '#3fc580',
      secondary: '#FFFAEE',
    },
  });

  const onSubmit = (data: ApplyFormValues) => {
    console.log("Form Data:", data);
    notify()
  };



  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.error("Validation Errors:", errors);
      })}
      className="space-y-4 w-full max-w-[1000px] flex flex-wrap "
    >
        <Toaster />
      <div className="w-[50%] min-w-[250px] p-10">
        <h2 className="text-[28px] mb-8 font-montserrat">Twoje Dane</h2>
        <Input
          id="name"
          label="Imię i nazwisko"
          placeholder="Jan Kowalski"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          id="email"
          label="Email"
          placeholder="jan.kowalski@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          id="phone"
          label="Numer telefonu"
          placeholder="123456789"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>
      <div className="w-[50%] min-w-[250px] p-10">
      <h2 className="text-[28px] mb-8 font-montserrat">Dane nieruchomości</h2>
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <Select
              id="region"
              label="Województwo"
              options={regions}
              {...field}
              error={errors.region?.message}
            />
          )}
        />

        <Controller
          name="homeType"
          control={control}
          render={({ field }) => (
            <Select
              id="homeType"
              label="Typ nieruchomości"
              options={homeTypes}
              {...field}
              error={errors.homeType?.message}
            />
          )}
        />

        <Input
          id="city"
          label="Miasto"
          placeholder="Opole"
          {...register("city")}
          error={errors.city?.message}
        />
        <Input
          id="price"
          label="Cena"
          placeholder="np. 500000"
          type="number"
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />
        <Input
          id="area"
          label="Powierzchnia (m²)"
          placeholder="np. 50"
          type="number"
          {...register("area", { valueAsNumber: true })}
          error={errors.area?.message}
        />

        <Button type="submit">Wyślij formularz</Button>
      </div>
    </form>
  );
};

export default ApplyForm;
