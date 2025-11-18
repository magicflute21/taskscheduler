import { CalendarPlus } from 'lucide-react';
import useSchedulerStore from "../stores/useSchedulerStore"
import ScheduleTable from "./ScheduleTable";

const TaskScheduler = () => {
  const { activeViewQuarter, activeViewYear, nextQuarter, prevQuarter, setShowAddTask } = useSchedulerStore();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center mb-6 justify-end">
          <button
            onClick={() => setShowAddTask(true)}
            className="px-6 py-2 bg-amber-200 hover:bg-amber-300 rounded transition font-medium cursor-pointer group"
          >
            <div className='flex items-center justify-center gap-1'>
              <CalendarPlus size={22} className="transition-transform duration-100 ease-out group-hover:scale-102" />
              <div className="ml-1 transition-transform duration-100 ease-out group-hover:scale-102">Add Task</div>
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded overflow-hidden border border-slate-300 shadow-sm">
          <div className="flex items-center justify-center gap-4 bg-slate-200 border-b border-slate-200">
            <button
              onClick={prevQuarter}
              className="px-4 py-2 text-cyan-900 rounded-md transition cursor-pointer group"
            >
              <span className="inline-block transform transition-transform duration-200 ease-out group-hover:-translate-x-0.5">←</span>
              <span className="ml-1">Previous</span>
            </button>
            <h1 className="text-2xl font-bold text-cyan-800">
              Quarter {activeViewQuarter}, {activeViewYear}
            </h1>
            <button
              onClick={nextQuarter}
              className="px-4 py-2 text-cyan-900 rounded-md transition cursor-pointer group"
            >
              <span className="mr-1">Next</span>
              <span className="inline-block transform transition-transform duration-200 ease-out group-hover:translate-x-0.5">→</span>
            </button>
          </div>
          <div className="overflow-x-auto px-4 py-8">
            <ScheduleTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskScheduler