import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Supervisor {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedSiteId: string | null;
  status: 'active' | 'inactive';
  joinDate: string;
  completedProjects: number;
  rating: number;
}

interface SupervisorsState {
  supervisors: Supervisor[];
  loading: boolean;
  error: string | null;
}

const initialState: SupervisorsState = {
  supervisors: [
    {
      id: 'sup1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91-9876543210',
      assignedSiteId: '1',
      status: 'active',
      joinDate: '2023-01-15',
      completedProjects: 5,
      rating: 4.8,
    },
    {
      id: 'sup2',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91-9876543211',
      assignedSiteId: '2',
      status: 'active',
      joinDate: '2023-03-20',
      completedProjects: 3,
      rating: 4.6,
    },
    {
      id: 'sup3',
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      phone: '+91-9876543212',
      assignedSiteId: '3',
      status: 'active',
      joinDate: '2023-06-10',
      completedProjects: 4,
      rating: 4.7,
    },
  ],
  loading: false,
  error: null,
};

const supervisorsSlice = createSlice({
  name: 'supervisors',
  initialState,
  reducers: {
    addSupervisor: (state, action: PayloadAction<Supervisor>) => {
      state.supervisors.push(action.payload);
    },
    updateSupervisor: (state, action: PayloadAction<Supervisor>) => {
      const index = state.supervisors.findIndex(
        (supervisor) => supervisor.id === action.payload.id
      );
      if (index !== -1) {
        state.supervisors[index] = action.payload;
      }
    },
    deleteSupervisor: (state, action: PayloadAction<string>) => {
      state.supervisors = state.supervisors.filter(
        (supervisor) => supervisor.id !== action.payload
      );
    },
    assignSupervisorToSite: (
      state,
      action: PayloadAction<{ supervisorId: string; siteId: string }>
    ) => {
      const supervisor = state.supervisors.find(
        (s) => s.id === action.payload.supervisorId
      );
      if (supervisor) {
        supervisor.assignedSiteId = action.payload.siteId;
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
  addSupervisor,
  updateSupervisor,
  deleteSupervisor,
  assignSupervisorToSite,
  setLoading,
  setError,
} = supervisorsSlice.actions;

export default supervisorsSlice.reducer; 