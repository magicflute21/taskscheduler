import { create } from "zustand";
import { tasks } from "../dummydata/tasks";

type Task = {
  id: number
  name: string
  startDate: string
  endDate: string
}

interface TasksStoreState {
  tasks: Task[]
  addTask: (task: Task) => void
}

const useTaskStore = create<TasksStoreState>((set) => ({
  tasks,
  addTask: (newTask) => set((state) => ({
    tasks: [...state.tasks, newTask],
  })),
}));

export default useTaskStore;