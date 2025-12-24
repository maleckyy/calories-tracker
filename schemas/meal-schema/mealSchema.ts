import * as z from 'zod';

export const mealSchema = z.object({
    name: z.string().min(3, 'Nazwa musi mieć min. 3 znaki'),
    kcal: z.string().min(1, 'Wartość nie może być ujemna'),
    protein: z.string().min(1),
    carbs: z.string().min(1),
    fat: z.string().min(1),
});

export type MealFormValues = z.infer<typeof mealSchema>;