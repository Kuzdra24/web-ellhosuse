import {sellPropertySchema} from "@/features/SellPropertyForm/schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type sellPropertyState = Partial<sellPropertySchema> & {
  setData: (data: Partial<sellPropertySchema>) => void;
};

export const useSellPropertyStore = create<sellPropertyState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),

    {
      name: "property-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);