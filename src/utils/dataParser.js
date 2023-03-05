import moment from "moment"
export const ParseDate = (str) => {
    return moment(str).format("DD/MM/YY HH:MM:SS")
}