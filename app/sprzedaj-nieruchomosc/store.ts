import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {sellPropertySchema} from "@/features/SellPropertyForm/schema";


type SellPropertyState = Partial<sellPropertySchema> & {
  setData: (data: Partial<sellPropertySchema>) => void;
};

export const useSellPropertyStore = create<SellPropertyState>()(
  persist(
    (set) => ({
      setData: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "property-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);