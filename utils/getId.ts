export const getId = (): string => {
    return new Date().toISOString() + Math.random()
}