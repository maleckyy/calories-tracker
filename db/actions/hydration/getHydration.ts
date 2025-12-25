import { Hydration } from "@/types/hydration.type"
import { db } from "../../database"

export const getHydration = (): Hydration[] => {
    return db.getAllSync('SELECT * FROM hydration;', [])
}