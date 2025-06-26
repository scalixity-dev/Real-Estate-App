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
  status: 'active' | 'on-hold' | 'completed';
  progress: number;
  totalBudget: number;
  spentBudget: number;
  supervisorId: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignedTo: string;
  siteId: string;
  materialRequests: MaterialRequest[];
}

export interface MaterialRequest {
  id: string;
  siteId: string;
  materialName: string;
  quantity: number;
  unit: string;
  urgency: 'normal' | 'urgent' | 'critical';
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  createdAt: string;
  updatedAt: string;
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
  description: string;
  items: {
    name: string;
    quantity: number;
    unit: string;
    price: number;
  }[];
  totalAmount: number;
  gst: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  rejectedBy?: string;
  rejectionReason?: string;
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
  user: {
    id: string;
    name: string;
    email: string;
    role: 'superadmin' | 'supervisor' | 'accountant' | 'procurement';
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  gstNumber: string;
  totalBills: number;
  totalAmount: number;
}

export interface VendorsState {
  vendors: Vendor[];
  selectedVendor: Vendor | null;
  loading: boolean;
  error: string | null;
} 