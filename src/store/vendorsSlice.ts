import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Vendor {
  id: string;
  name: string;
  category: 'cement' | 'steel' | 'bricks' | 'sand' | 'other';
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  assignedSites: string[];
}

interface VendorsState {
  vendors: Vendor[];
  loading: boolean;
  error: string | null;
}

const initialState: VendorsState = {
  vendors: [
    {
      id: 'v1',
      name: 'Tata Steel',
      category: 'steel',
      contactPerson: 'Rajesh Kumar',
      phone: '+91-9876543210',
      email: 'rajesh.kumar@tatasteel.com',
      address: 'Sector 24, Mumbai',
      rating: 4.8,
      assignedSites: ['1', '2'],
    },
    {
      id: 'v2',
      name: 'UltraTech Cement',
      category: 'cement',
      contactPerson: 'Amit Sharma',
      phone: '+91-9876543211',
      email: 'amit.sharma@ultratech.com',
      address: 'Sector 18, Delhi',
      rating: 4.7,
      assignedSites: ['1', '3'],
    },
    {
      id: 'v3',
      name: 'Brick Masters',
      category: 'bricks',
      contactPerson: 'Suresh Patel',
      phone: '+91-9876543212',
      email: 'suresh.patel@brickmasters.com',
      address: 'Sector 5, Ahmedabad',
      rating: 4.5,
      assignedSites: ['2'],
    },
    {
      id: 'v4',
      name: 'Sand Solutions',
      category: 'sand',
      contactPerson: 'Priya Singh',
      phone: '+91-9876543213',
      email: 'priya.singh@sandsolutions.com',
      address: 'Sector 12, Pune',
      rating: 4.6,
      assignedSites: ['1', '2', '3'],
    },
  ],
  loading: false,
  error: null,
};

const vendorsSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
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
    assignVendorToSite: (state, action: PayloadAction<{ vendorId: string; siteId: string }>) => {
      const vendor = state.vendors.find(v => v.id === action.payload.vendorId);
      if (vendor && !vendor.assignedSites.includes(action.payload.siteId)) {
        vendor.assignedSites.push(action.payload.siteId);
      }
    },
    removeVendorFromSite: (state, action: PayloadAction<{ vendorId: string; siteId: string }>) => {
      const vendor = state.vendors.find(v => v.id === action.payload.vendorId);
      if (vendor) {
        vendor.assignedSites = vendor.assignedSites.filter(id => id !== action.payload.siteId);
      }
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
  addVendor,
  updateVendor,
  deleteVendor,
  assignVendorToSite,
  removeVendorFromSite,
  setLoading,
  setError,
} = vendorsSlice.actions;

export default vendorsSlice.reducer; 