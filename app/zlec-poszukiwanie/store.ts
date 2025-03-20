import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {searchPropertySchema} from "@/features/SearchPropertyForm/schema";


type SearchPropertyState = Partial<searchPropertySchema> & {
  setData: (data: Partial<searchPropertySchema>) => void;
};

export const useSearchPropertyStore = create<SearchPropertyState>()(
  persist(
    (set) => ({
      setData: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "search-property-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);