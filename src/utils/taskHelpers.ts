import { eachWeekOfInterval, getISOWeek, getYear, parseISO } from "date-fns";
import type { Task } from "../stores/useTaskStore";

const getTaskWeekNumber = (task: Task) => {
  const { startDate, endDate } = task;

  const start = parseISO(startDate);
  const end = parseISO(endDate);

  const weeks = eachWeekOfInterval({ start, end });
  return weeks.map(week => getISOWeek(week));
}

const getTaskYear = (task: Task) => {
  const { startDate, endDate } = task;
  const startYear = getYear(startDate);
  const endYear = getYear(endDate);

  return [startYear, endYear];
}

export { getTaskWeekNumber, getTaskYear };