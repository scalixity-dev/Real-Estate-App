import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Site, Supervisor } from '../types';

interface SitesState {
  sites: Site[];
  supervisors: Supervisor[];
  selectedSite: Site | null;
  selectedSupervisor: Supervisor | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SitesState = {
  sites: [],
  supervisors: [],
  selectedSite: null,
  selectedSupervisor: null,
  isLoading: false,
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
      state.isLoading = action.payload;
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