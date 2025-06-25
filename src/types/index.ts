export type UserRole = 'superadmin' | 'supervisor' | 'procurement' | 'accountant';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Site {
  id: string;
  name: string;
  location: string;
  progress: number;
  budget: number;
  actualSpent: number;
  supervisorId: string;
  materialUsage: {
    [key: string]: number;
  };
}

export interface Task {
  id: string;
  siteId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
  materials: {
    materialId: string;
    quantity: number;
  }[];
}

export interface MaterialRequest {
  id: string;
  siteId: string;
  supervisorId: string;
  materials: {
    materialId: string;
    quantity: number;
    estimatedPrice: number;
  }[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Bill {
  id: string;
  requestId: string;
  vendorId: string;
  items: {
    materialId: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  gst: number;
  status: 'pending' | 'approved' | 'rejected';
  imageUrl?: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  contact: string;
  materials: string[]; // List of material IDs they supply
  rating: number;
} 