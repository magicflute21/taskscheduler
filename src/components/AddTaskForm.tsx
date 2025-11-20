import { CalendarPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { enGB } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { dateToIso } from '../utils/dateHelpers';
import useTaskStore from '../stores/useTaskStore';
import useSchedulerStore from '../stores/useSchedulerStore';

const taskSchema = z.object({
  name: z.string({
    error: 'Task name is required',
  }).min(1, 'Task name is required'),

  dateRange: z.custom<DateRange>()
    .refine((val) => val !== undefined && val !== null, {
      message: 'Please select a date range',
    })
});

type TaskFormData = z.infer<typeof taskSchema>;

const AddTaskForm = () => {
  const { addTask } = useTaskStore();
  const { showAddTask, setShowAddTask } = useSchedulerStore();

  const { control, register, handleSubmit, reset: resetForm, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const openForm = () => {
    setShowAddTask(true);
  }

  const reset = () => {
    resetForm();
    setShowAddTask(false);
  }

  const onSubmit = (data: TaskFormData) => {
    const payload = {
      id: Date.now(),
      name: data.name.trim(),
      startDate: dateToIso(data.dateRange.from),
      endDate: dateToIso(data.dateRange.to ?? data.dateRange.from),
    };
    addTask(payload);
    reset();
  };

  return (
    <>
      <button
        onClick={openForm}
        className="px-6 py-2 bg-amber-300 hover:bg-amber-200 rounded transition font-medium cursor-pointer group"
      >
        <div className='flex items-center justify-center gap-1'>
          <CalendarPlus size={22} className="transition-transform duration-100 ease-out group-hover:scale-102" />
          <div className="ml-1 transition-transform duration-100 ease-out group-hover:scale-102">Add Task</div>
        </div>
      </button>
      <div className="relative inline-block">
        {showAddTask && (
          <div
            className="absolute right-0 top-10 mt-2 w-96 bg-white rounded-md shadow-lg border p-4 z-20"
            role="dialog"
            aria-modal="true"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <label className="block">
                <input
                  {...register('name')}
                  placeholder="Task name"
                  className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring text-lg font-semibold text-slate-600"
                />
                {errors.name && (
                  <p className="text-rose-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </label>

              <div>
                <div className="mt-2">
                  <Controller
                    name="dateRange"
                    control={control}
                    render={({ field }) => (
                      <DayPicker
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={enGB}
                        classNames={{
                          today: `text-cyan-800`,
                          caption_label: `text-cyan-800 relative inline-flex items-center whitespace-nowrap`,
                        }}
                        components={{
                          NextMonthButton: (props) => {
                            return (
                              <button {...props} type="button">
                                <ChevronRight
                                  className={`w-5 h-5 text-cyan-800 mx-2 cursor-pointer`}
                                />
                              </button>
                            )
                          },
                          PreviousMonthButton: (props) => {
                            return (
                              <button {...props} type="button">
                                <ChevronLeft
                                  className={`w-5 h-5 text-cyan-800 mx-2 cursor-pointer`}
                                />
                              </button>
                            )
                          },
                        }}
                      />
                    )}
                  />

                  {errors.dateRange && (
                    <p className="text-rose-500 text-sm mt-1">{errors.dateRange.message}</p>
                  )}

                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={reset} className="px-3 py-1 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1 bg-cyan-700 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default AddTaskForm;