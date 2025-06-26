import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vendor, VendorsState } from '../types';

const initialState: VendorsState = {
  vendors: [],
  selectedVendor: null,
  loading: false,
  error: null,
};

const vendorsSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    setVendors: (state, action: PayloadAction<Vendor[]>) => {
      state.vendors = action.payload;
    },
    addVendor: (state, action: PayloadAction<Vendor>) => {
      state.vendors.push(action.payload);
    },
    updateVendor: (state, action: PayloadAction<Vendor>) => {
      const index = state.vendors.findIndex(vendor => vendor.id === action.payload.id);
      if (index !== -1) {
        state.vendors[index] = action.payload;
      }
    },
    deleteVendor: (state, action: PayloadAction<string>) => {
      state.vendors = state.vendors.filter(vendor => vendor.id !== action.payload);
    },
    setSelectedVendor: (state, action: PayloadAction<Vendor | null>) => {
      state.selectedVendor = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setVendors,
  addVendor,
  updateVendor,
  deleteVendor,
  setSelectedVendor,
  setLoading,
  setError,
} = vendorsSlice.actions;

export default vendorsSlice.reducer; 