import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialRequest, Bill } from '../types';

interface MaterialsState {
  requests: MaterialRequest[];
  bills: Bill[];
  selectedRequest: MaterialRequest | null;
  selectedBill: Bill | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MaterialsState = {
  requests: [],
  bills: [],
  selectedRequest: null,
  selectedBill: null,
  isLoading: false,
  error: null,
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<MaterialRequest[]>) => {
      state.requests = action.payload;
    },
    addRequest: (state, action: PayloadAction<MaterialRequest>) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action: PayloadAction<MaterialRequest>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    setBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    updateBill: (state, action: PayloadAction<Bill>) => {
      const index = state.bills.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    setSelectedRequest: (state, action: PayloadAction<MaterialRequest | null>) => {
      state.selectedRequest = action.payload;
    },
    setSelectedBill: (state, action: PayloadAction<Bill | null>) => {
      state.selectedBill = action.payload;
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
  setRequests,
  addRequest,
  updateRequest,
  setBills,
  addBill,
  updateBill,
  setSelectedRequest,
  setSelectedBill,
  setLoading,
  setError,
} = materialsSlice.actions;

export default materialsSlice.reducer; 