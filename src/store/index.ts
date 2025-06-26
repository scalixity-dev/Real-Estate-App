import { configureStore } from '@reduxjs/toolkit';
import sitesReducer from './sitesSlice';
import supervisorsReducer from './supervisorsSlice';
import vendorsReducer from './vendorsSlice';

export const store = configureStore({
  reducer: {
    sites: sitesReducer,
    supervisors: supervisorsReducer,
    vendors: vendorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 