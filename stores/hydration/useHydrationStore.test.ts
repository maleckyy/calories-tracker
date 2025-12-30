import { Hydration } from "@/types/hydration.type";
import { act } from "@testing-library/react-native";
import { useHydrationStore } from "./useHydrationStore";

describe("useHydrationStore tests", () => {
    const mockHydration: Hydration = {
        id: "uuid-1",
        date: "2023-10-27T10:00:00Z",
        waterAmount: 250,
    };

    const mockList: Hydration[] = [
        mockHydration,
        { id: "uuid-2", date: "2023-10-27T12:00:00Z", waterAmount: 500 },
    ];

    beforeEach(() => {
        act(() => {
            useHydrationStore.getState().setHydration([]);
        });
    });

    it("should initialise the store with an empty array", () => {
        expect(useHydrationStore.getState().hydration).toEqual([]);
    });

    it("should add a new hydration", () => {
        act(() => {
            useHydrationStore.getState().addHydration(mockHydration);
        });

        const state = useHydrationStore.getState();
        expect(state.hydration).toHaveLength(1);
        expect(state.hydration[0]).toEqual(mockHydration);
        expect(state.hydration[0].waterAmount).toBe(250);
    });

    it("should remove the hydration based on ID", () => {
        act(() => {
            useHydrationStore.getState().setHydration(mockList);
        });

        act(() => {
            useHydrationStore.getState().removeHydration("uuid-1");
        });

        const state = useHydrationStore.getState();
        expect(state.hydration).toHaveLength(1);
        expect(state.hydration[0].id).toBe("uuid-2");
        expect(state.hydration.find((h) => h.id === "uuid-1")).toBeUndefined();
    });

    it("should overwrite the entire state", () => {
        act(() => {
            useHydrationStore.getState().setHydration(mockList);
        });

        expect(useHydrationStore.getState().hydration).toEqual(mockList);
        expect(useHydrationStore.getState().hydration.length).toBe(2);
    });

    it("should not delete anything if the ID does not exist", () => {
        act(() => {
            useHydrationStore.getState().setHydration([mockHydration]);
        });

        act(() => {
            useHydrationStore.getState().removeHydration("non-existent-id");
        });

        expect(useHydrationStore.getState().hydration).toHaveLength(1);
    });
});