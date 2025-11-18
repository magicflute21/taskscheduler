import { create } from 'zustand';
import { getDateInfo } from '../utils/dateHelpers';

interface SchedulerState {
  activeViewQuarter: number;
  activeViewYear: number;
  nextQuarter: () => void;
  prevQuarter: () => void;
  showAddTask: boolean;
  setShowAddTask: (value: boolean) => void
}

const useSchedulerStore = create<SchedulerState>((set) => {
  const today = new Date();
  const { quarter, year } = getDateInfo(today);

  return {
    activeViewQuarter: quarter,
    activeViewYear: year,

    nextQuarter: () => set((state) => {
      if (state.activeViewQuarter === 4) {
        return {
          activeViewQuarter: 1,
          activeViewYear: state.activeViewYear + 1
        };
      }
      return {
        activeViewQuarter: state.activeViewQuarter + 1,
        activeViewYear: state.activeViewYear
      };
    }),

    prevQuarter: () => set((state) => {
      if (state.activeViewQuarter === 1) {
        return {
          activeViewQuarter: 4,
          activeViewYear: state.activeViewYear - 1
        };
      }
      return {
        activeViewQuarter: state.activeViewQuarter - 1,
        activeViewYear: state.activeViewYear
      };
    }),

    showAddTask: false,
    setShowAddTask: (showAddTask) => set({ showAddTask })
  };
});

export default useSchedulerStore;