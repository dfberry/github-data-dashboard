import moment from 'moment'

export function compareASC (x: any, y:any):any {
  let a = x.date.toUpperCase(),
      b = y.date.toUpperCase();
  return a === b ? 0 : a > b ? 1 : -1;
}
export function compareDESC (x: any, y:any):any {
  let a = x.date.toUpperCase(),
      b = y.date.toUpperCase();
  return a === b ? 0 : b > a ? 1 : -1;
}
export function clean(arr: any[], obj: any){
    return arr.filter((row) => {
      // ingore the row if all the the properties matches to obj
      return !Object.entries(obj).every(([key, value]) => row[key] === value);
    })
  }
// TBD - remove these rows from db
export function clean50(data:any[]):any[]{
  data = clean(data, {
    date: "2023-01-30",
    count: 50
  })
  data = clean(data, {
    date: "2023-01-30",
    count: 40
  })
  return data
}

/*
function compareASC (x, y) {
  let a = x.date.toUpperCase(),
      b = y.date.toUpperCase();
  return a === b ? 0 : a > b ? 1 : -1;
}
function compareDESC (x, y) {
  let a = x.date.toUpperCase(),
      b = y.date.toUpperCase();
  return a === b ? 0 : b > a ? 1 : -1;
}

const data = [
  {date: '2023-01-01', name: 'middle'},
  {date: '2023-01-30', name: 'recent'},
  {
    date: '2022-10-11', name: 'old'
  }
]

console.table(data.sort(compareASC))
console.table(data.sort(compareDESC))
*/

export function isOneYearOldPlus(date:any){

  const originalDate = moment(date);
  const oneYearAgoToday = moment().subtract(1, 'year');
  const isOlderThan1Year = moment(originalDate).isBefore(oneYearAgoToday)
  return isOlderThan1Year;
}