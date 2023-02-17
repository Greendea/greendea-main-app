export const ParseDate = (str) => {
    const d = new Date(Date.parse(str))
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}