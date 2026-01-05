import { User } from "@/types/user.type"
import { act } from "@testing-library/react-native"
import { useUserStore } from "./useUserStore"

describe("useUserStore tests", () => {
    const mockUser: User = {
        username: "JohnDoe",
        birthDate: "1990-01-01",
        calorieRequirement: 2500,
        proteinRequirement: 150,
        carbsRequirement: 300,
        fatRequirement: 80,
        waterGoal: 3000,
        gender: "male",
        weight: 80,
        height: 180,
        goal: "maintain",
    }

    beforeEach(() => {
        act(() => {
            useUserStore.setState({ user: null })
        })
    })

    it("should initialize with a null user", () => {
        const state = useUserStore.getState()
        expect(state.user).toBeNull()
    })

    it("should update the user state when setUser is called", () => {
        act(() => {
            useUserStore.getState().setUser(mockUser)
        })

        const state = useUserStore.getState()
        expect(state.user).toEqual(mockUser)
        expect(state.user?.username).toBe("JohnDoe")
    })

    it("should maintain data integrity across updates", () => {
        const updatedUser: User = { ...mockUser, weight: 75, goal: "loseWeight" }

        act(() => {
            useUserStore.getState().setUser(mockUser)
        })

        act(() => {
            useUserStore.getState().setUser(updatedUser)
        })

        const state = useUserStore.getState()
        expect(state.user?.weight).toBe(75)
        expect(state.user?.goal).toBe("loseWeight")
        expect(state.user?.username).toBe("JohnDoe")
    })
})