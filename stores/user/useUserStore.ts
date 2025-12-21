import { User } from "@/types/user.type"
import { create } from "zustand"

type UserStore = {
    user: User | null
    setUser: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,

    setUser: (user: User) => set({ user })
}))