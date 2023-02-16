import { compareASC, compareDESC } from './compare'
//import { IRepo } from "./types";

export function sortByDateAsc<T>(data: T[] | undefined) {
    if (data && data.length > 0) {
        const rawData = JSON.parse(JSON.stringify(data))
        return rawData.sort(compareASC)
    } else {
        return []
    }
}
export function sortByDataDesc<T>(data: T[] | undefined) {
    if (data && data.length > 0) {
        const rawData = JSON.parse(JSON.stringify(data))
        return rawData.sort(compareDESC)
    } else {
        return []
    }
}
