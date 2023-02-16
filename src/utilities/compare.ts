import moment from 'moment'
import { ISummaryRow } from './types'

export function compareASC(x: ISummaryRow, y: ISummaryRow): any {
    const a = x.date.toUpperCase()
    const b = y.date.toUpperCase()

    return a === b ? 0 : a > b ? 1 : -1
}
export function compareDESC(x: ISummaryRow, y: ISummaryRow): any {
    const a = x.date.toUpperCase()
    const b = y.date.toUpperCase()

    return a === b ? 0 : b > a ? 1 : -1
}
export function clean(arr: any[], obj: any) {
    return arr.filter((row) => {
        // ingore the row if all the the properties matches to obj
        return !Object.entries(obj).every(([key, value]) => row[key] === value)
    })
}
// TBD - remove these rows from db
export function clean50(data: ISummaryRow[]): any[] {
    data = clean(data, {
        date: '2023-01-30',
        count: 50
    })
    data = clean(data, {
        date: '2023-01-30',
        count: 40
    })
    return data
}

export function isOneYearOldPlus(date: any) {
    const originalDate = moment(date)
    const oneYearAgoToday = moment().subtract(1, 'year')
    const isOlderThan1Year = moment(originalDate).isBefore(oneYearAgoToday)
    return isOlderThan1Year
}
