"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type SellPropertyInput = {
  propertyType?: string;
  area?: string;
  unit?: "m2" | "ar" | "ha";
  roomsCount?: string;
  region?: string;
  city?: string;
  streetAddress?: string;
  offerType?: string;
  price?: string;
  date?: Date;
  fullName?: string;
  email?: string;
  phone?: string;
  terms?: boolean;
};

// Typ stanu store
type SellPropertyState = SellPropertyInput & {
  setData: (data: Partial<SellPropertyInput>) => void;
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