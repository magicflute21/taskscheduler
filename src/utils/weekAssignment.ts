import { addDays, eachDayOfInterval, endOfISOWeek, getISOWeek, getMonth, startOfISOWeek } from "date-fns";


const isWeekBelongsToMonth = (month: number, weekdays: Date[]) => {
  const MORE_THAN_HALF_OF_WEEK = 4;
  let daysInThisMonthCount = 0;

  weekdays.forEach((weekday) => {
    if (getMonth(weekday) === month) {
      daysInThisMonthCount += 1;
    }
  });

  return daysInThisMonthCount >= MORE_THAN_HALF_OF_WEEK;
}

const getWeeksInMonth = (year: number, month: number): number[] => {
  const weekNumbers: number[] = [];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let currentDate = firstDay;

  while (currentDate <= lastDay) {
    const weekStart = startOfISOWeek(currentDate);
    const weekEnd = endOfISOWeek(currentDate);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    if (isWeekBelongsToMonth(month, weekDays)) {
      const weekNumber = getISOWeek(currentDate);
      weekNumbers.push(weekNumber);
    }

    currentDate = addDays(weekEnd, 1);
  }

  return weekNumbers;
}

export default getWeeksInMonth;