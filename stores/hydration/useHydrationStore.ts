import { Hydration } from "@/types/hydration.type"
import { create } from "zustand"

type HydrationStore = {
    hydration: Hydration[]

    setHydration: (hydration: Hydration[]) => void
    addHydration: (hydration: Hydration) => void
    removeHydration: (id: string) => void
}

export const useHydrationStore = create<HydrationStore>((set) => ({
    hydration: [],

    setHydration: (hydration: Hydration[]) => set({ hydration }),

    addHydration: (hydration: Hydration) =>
        set((state) => ({
            hydration: [...state.hydration, hydration]
        })),

    removeHydration: (id) =>
        set((state) => ({
            hydration: state.hydration.filter((h) => h.id !== id),
        })),
}))