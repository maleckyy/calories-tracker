export type HydrationCreate = {
    waterAmount: number
}

export type Hydration = {
    id: string,
    date: string,
} & HydrationCreate