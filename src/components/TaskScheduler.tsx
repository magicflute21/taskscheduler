import useTaskScheduler from "../hooks/useTaskScheduler";
import useSchedulerStore from "../stores/useSchedulerStore"

const TaskScheduler = () => {
  const { activeViewQuarter, activeViewYear, nextQuarter, prevQuarter } = useSchedulerStore();
  const { quarterData } = useTaskScheduler();

  console.log('quarterData', quarterData);

  return (
    <>
      <div className="">
        <button onClick={prevQuarter}>prev</button>
        <button onClick={nextQuarter}>next</button>
      </div>
      <h1>Quarter {activeViewQuarter}, {activeViewYear}</h1>
    </>
  )
}

export default TaskScheduler