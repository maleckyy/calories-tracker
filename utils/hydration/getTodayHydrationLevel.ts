import { Hydration } from "@/types/hydration.type"

export const getTodayHydrationLevel = (hydration: Hydration[]): Hydration[] => {
    const today = new Date().toISOString().split("T")[0]

    return hydration.filter(h =>
        h.date.split("T")[0] === today
    )
}
