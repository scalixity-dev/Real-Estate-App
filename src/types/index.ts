export type Role = 'superadmin' | 'supervisor' | 'procurement' | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: 'active' | 'inactive';
}

export interface Site {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  totalBudget: number;
  spentBudget: number;
  supervisorId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignedTo: string;
  siteId: string;
  progress: number;
  subtasks: Subtask[];
  comments: Comment[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  timestamp: string;
}

export interface MaterialRequest {
  id: string;
  siteId: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  materials: RequestedMaterial[];
}

export interface RequestedMaterial {
  materialId: string;
  quantity: number;
  unit: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  estimatedPrice: number;
}

export interface Bill {
  id: string;
  vendorId: string;
  siteId: string;
  date: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  items: BillItem[];
}

export interface BillItem {
  materialId: string;
  quantity: number;
  unitPrice: number;
}

export interface Supervisor {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  assignedSites: string[];
}

export interface SitesState {
  sites: Site[];
  supervisors: Supervisor[];
  loading: boolean;
  error: string | null;
}

export interface MaterialsState {
  requests: MaterialRequest[];
  bills: Bill[];
  loading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
  status: 'active' | 'inactive';
}

export interface VendorsState {
  vendors: Vendor[];
  selectedVendor: Vendor | null;
  loading: boolean;
  error: string | null;
} 