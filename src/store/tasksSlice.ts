import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setSelectedTask,
  setLoading,
  setError,
} = tasksSlice.actions;

export default tasksSlice.reducer; 