import * as z from 'zod';

export const profileSchema = z.object({
    username: z.string().min(3),
    birthDate: z.date(),
    calorieRequirement: z.string().min(1),
    proteinRequirement: z.string().min(1),
    carbsRequirement: z.string().min(1),
    fatRequirement: z.string().min(1),
    waterGoal: z.string().min(1),
    weight: z.string().min(1),
    height: z.string().min(1),
    gender: z.string().min(1),
    goal: z.string().min(1),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
