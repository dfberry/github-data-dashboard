import { compareASC, compareDESC, isOneYearOldPlus } from './compare'
import data from '../../data/summary.json'
import moment from 'moment'

describe('compare', () => {
    test('asc', () => {
        const oldest = data.sort(compareASC)[0]
        expect(oldest).toStrictEqual({ date: '2022-12-10', count: 2110 })
    })
    test('desc', () => {
        const newest = data.sort(compareDESC)[0]
        expect(newest).toStrictEqual({ date: '2023-01-31', count: 2131 })
    })
    test('is older than 1 year', () => {
        const twoYearsOld = moment().subtract(2, 'year')
        const isOlderThan1Year = isOneYearOldPlus(twoYearsOld)

        expect(isOlderThan1Year).toBe(true)
    })
    test('is not older than 1 year', () => {
        const twoYearsOld = moment() // now
        const isOlderThan1Year = isOneYearOldPlus(twoYearsOld)

        expect(isOlderThan1Year).toBe(false)
    })
})
