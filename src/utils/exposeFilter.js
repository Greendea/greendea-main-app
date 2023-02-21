export const getUniqueItems = (arr) => {
    return [...new Set(arr)]
}

export const exposeFilters = (arr) => {
    return getUniqueItems(arr).map(item => {
        return {
            text: item,
            value: item
        }
    })
}