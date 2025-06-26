import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Site, Supervisor } from '../types';

interface Site {
  id: string;
  name: string;
  location: string;
  budget: number;
  actualSpent: number;
  progress: number;
  supervisorId: string | null;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'on-hold';
  materialsInStock: {
    cement: number;
    steel: number;
    bricks: number;
    sand: number;
  };
  pendingBills: number;
  todayProgress: number;
}

interface SitesState {
  sites: Site[];
  supervisors: Supervisor[];
  selectedSite: Site | null;
  selectedSupervisor: Supervisor | null;
  loading: boolean;
  error: string | null;
}

const initialState: SitesState = {
  sites: [
    {
      id: '1',
      name: 'Green Valley Residences',
      location: 'Sector 62, Noida',
      budget: 5000000,
      actualSpent: 2800000,
      progress: 65,
      supervisorId: 'sup1',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      materialsInStock: {
        cement: 500, // in bags
        steel: 1000, // in kg
        bricks: 5000, // in pieces
        sand: 200, // in cubic feet
      },
      pendingBills: 3,
      todayProgress: 2,
    },
    {
      id: '2',
      name: 'Blue Sapphire Heights',
      location: 'Sector 45, Gurugram',
      budget: 7500000,
      actualSpent: 3200000,
      progress: 42,
      supervisorId: 'sup2',
      startDate: '2024-02-15',
      endDate: '2025-02-14',
      status: 'active',
      materialsInStock: {
        cement: 300,
        steel: 1500,
        bricks: 3000,
        sand: 150,
      },
      pendingBills: 5,
      todayProgress: 1,
    },
    {
      id: '3',
      name: 'Royal Palm Towers',
      location: 'Whitefield, Bangalore',
      budget: 10000000,
      actualSpent: 9800000,
      progress: 98,
      supervisorId: 'sup3',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      status: 'active',
      materialsInStock: {
        cement: 100,
        steel: 500,
        bricks: 1000,
        sand: 50,
      },
      pendingBills: 2,
      todayProgress: 3,
    },
  ],
  supervisors: [],
  selectedSite: null,
  selectedSupervisor: null,
  loading: false,
  error: null,
};

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSites: (state, action: PayloadAction<Site[]>) => {
      state.sites = action.payload;
    },
    addSite: (state, action: PayloadAction<Site>) => {
      state.sites.push(action.payload);
    },
    updateSite: (state, action: PayloadAction<Site>) => {
      const index = state.sites.findIndex(site => site.id === action.payload.id);
      if (index !== -1) {
        state.sites[index] = action.payload;
      }
    },
    deleteSite: (state, action: PayloadAction<string>) => {
      state.sites = state.sites.filter(site => site.id !== action.payload);
    },
    setSupervisors: (state, action: PayloadAction<Supervisor[]>) => {
      state.supervisors = action.payload;
    },
    addSupervisor: (state, action: PayloadAction<Supervisor>) => {
      state.supervisors.push(action.payload);
    },
    updateSupervisor: (state, action: PayloadAction<Supervisor>) => {
      const index = state.supervisors.findIndex(sup => sup.id === action.payload.id);
      if (index !== -1) {
        state.supervisors[index] = action.payload;
      }
    },
    deleteSupervisor: (state, action: PayloadAction<string>) => {
      state.supervisors = state.supervisors.filter(sup => sup.id !== action.payload);
    },
    setSelectedSite: (state, action: PayloadAction<Site | null>) => {
      state.selectedSite = action.payload;
    },
    setSelectedSupervisor: (state, action: PayloadAction<Supervisor | null>) => {
      state.selectedSupervisor = action.payload;
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
  setSites,
  addSite,
  updateSite,
  deleteSite,
  setSupervisors,
  addSupervisor,
  updateSupervisor,
  deleteSupervisor,
  setSelectedSite,
  setSelectedSupervisor,
  setLoading,
  setError,
} = sitesSlice.actions;

export default sitesSlice.reducer; 