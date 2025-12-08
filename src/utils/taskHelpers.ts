import { eachWeekOfInterval, getISOWeek, getISOWeekYear, parseISO } from "date-fns";
import type { Task } from "../stores/useTaskStore";

const getTaskWeekNumber = (task: Task) => {
  const { startDate, endDate } = task;

  const start = parseISO(startDate);
  const end = parseISO(endDate);

  const weeks = eachWeekOfInterval(
    { start, end },
    { weekStartsOn: 1 } // Monday. By default date-fns uses Sunday as the start of the week
  );

  return weeks.map(week => getISOWeek(week));
}

const getTaskYear = (task: Task) => {
  const { startDate, endDate } = task;
  const startYear = getISOWeekYear(startDate);
  const endYear = getISOWeekYear(endDate);

  return [startYear, endYear];
}

export { getTaskWeekNumber, getTaskYear };