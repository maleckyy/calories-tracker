import { Hydration, HydrationCreate } from "@/types/hydration.type";
import { getId } from "@/utils/getId";
import { db } from "../../database";

export const addHydration = (hydration: HydrationCreate): Hydration => {
    const id = getId();
    const newHydration: Hydration = { ...hydration, id, date: new Date().toISOString() };

    db.runSync(
        `INSERT INTO hydration (id, waterAmount, date) 
         VALUES (?, ?, ?);`,
        [
            newHydration.id,
            newHydration.waterAmount,
            newHydration.date
        ]
    );

    return newHydration;
}