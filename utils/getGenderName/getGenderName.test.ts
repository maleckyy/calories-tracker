import { GenderType } from "@/types/user.type";
import { getGenderName } from "./getGenderName";

describe("getGenderName", () => {
    it("should return 'Male' when gender type is 'male'", () => {
        expect(getGenderName('male')).toBe('Male')
    });

    it("should return 'Female' when gender type is 'female'", () => {
        expect(getGenderName('female')).toBe('Female')
    });

    it("should return 'Other' as a default value for any other input", () => {
        expect(getGenderName('other' as GenderType)).toBe('Other')
        expect(getGenderName(undefined as unknown as GenderType)).toBe('Other')
    });
});