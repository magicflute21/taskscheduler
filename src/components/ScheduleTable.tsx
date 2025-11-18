import useTaskScheduler from "../hooks/useTaskScheduler";
import useTaskStore from "../stores/useTaskStore";
import { parseToEstonianDate } from "../utils/dateHelpers";


const ScheduleTable = () => {
  const { quarterData } = useTaskScheduler();
  const { tasks } = useTaskStore();

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          {quarterData.map((q) => (
            <th key={q.monthIndex} colSpan={q.weekNumbers.length} className="p-2 border border-cyan-900 bg-cyan-800 text-white">{q.monthName}</th>
          ))}
        </tr>
        <tr>
          <th className="border border-cyan-600 text-cyan-800 p-1.5 whitespace-nowrap bg-slate-50">Task</th>
          <th className="border border-cyan-600 text-cyan-800 p-1.5 whitespace-nowrap bg-slate-50">Start Date</th>
          <th className="border border-cyan-600 text-cyan-800 p-1.5 whitespace-nowrap bg-slate-50">End Date</th>
          {quarterData.map((q) => q.weekNumbers.map((week) => (
            <th key={week} className="border border-cyan-600 text-cyan-800 p-1.5 min-w-8 bg-slate-50">{week}</th>
          )))}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="border border-cyan-600 text-cyan-800 p-1.5 font-medium">{task.name}</td>
            <td className="border border-cyan-600 text-cyan-800 p-1.5">{parseToEstonianDate(task.startDate)}</td>
            <td className="border border-cyan-600 text-cyan-800 p-1.5">{parseToEstonianDate(task.endDate)}</td>
            {quarterData.map((q) => q.weekNumbers.map((week) => (
              <td key={week} className="border border-cyan-600 text-cyan-800 p-2"></td>
            )))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ScheduleTable