import { useMemo } from "react";
import useSchedulerStore from "../stores/useSchedulerStore";
import { getQuarterMonths, monthNameMap } from "../utils/dateHelpers";
import getWeeksInMonth from "../utils/weekAssignment";

const useTaskScheduler = () => {
  const { activeViewQuarter, activeViewYear } = useSchedulerStore();

  const quarterData = useMemo(() => {
    const monthIndexes = getQuarterMonths(activeViewQuarter);

    const months = monthIndexes.map((monthIndex) => ({
      quarter: activeViewQuarter,
      monthIndex,
      monthName: monthNameMap[monthIndex],
      weekNumbers: getWeeksInMonth(activeViewYear, monthIndex),
    }));

    return months;
  }, [activeViewQuarter]);

  return {
    quarterData,
  }
}

export default useTaskScheduler;