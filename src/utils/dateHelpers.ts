import { getISOWeeksInYear, getMonth, getQuarter, getYear } from "date-fns";

const getDateInfo = (date: Date) => {
  const year = getYear(date);
  const month = getMonth(date);
  const quarter = getQuarter(date);
  const numberOfWeeks = getISOWeeksInYear(date);

  return { year, month, quarter, numberOfWeeks }
}

const getQuarterMonths = (quarter: number) => {
  const startMonth = (quarter - 1) * 3;
  return [startMonth, startMonth + 1, startMonth + 2]
}

const monthNameMap: Record<number, string> = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
};

const getFirstDayOfMonth = (year: number, firstMonth: number) => {
  return new Date(year, firstMonth, 1);
}

export { getDateInfo, getQuarterMonths, monthNameMap, getFirstDayOfMonth };