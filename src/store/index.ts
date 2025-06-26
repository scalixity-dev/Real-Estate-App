import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import sitesReducer from './sitesSlice';
import tasksReducer from './tasksSlice';
import materialsReducer from './materialsSlice';
import vendorsReducer from './vendorsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sites: sitesReducer,
    tasks: tasksReducer,
    materials: materialsReducer,
    vendors: vendorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 