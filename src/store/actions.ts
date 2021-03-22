export enum FilterActionType {
    FILTER_UPDATE = 'FILTER_UPDATE',
    SHOW_ALL = 'SHOW_ALL',
    FILTER_RESET = 'FILTER_RESET',
}

export const filtersApply = (payload: {
    country: {
        value: string
        label: string
    } | null
    types: Array<{
        value: string
        label: string
    }>
    rating: Array<string>
    reviews_amount: string
    price: Array<number>
}) => ({
    type: FilterActionType.FILTER_UPDATE as const,
    payload,
})

export const showAll = () => ({
    type: FilterActionType.SHOW_ALL as const,
})

export const filtersReset = () => ({
    type: FilterActionType.FILTER_RESET as const,
})
