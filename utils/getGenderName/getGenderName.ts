import { GenderType } from "@/types/user.type";

export function getGenderName(name: GenderType) {
    switch (name) {
        case 'male':
            return 'Male'
        case 'female':
            return 'Female'
        default:
            return 'Other'
    }
}