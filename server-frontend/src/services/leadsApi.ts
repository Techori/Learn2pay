import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Lead {
  _id: string;
  leadName: string;
  instituteName: string;
  contactPhone: string;
  salesOwner?: {
    _id: string;
    name: string;
    email: string;
  };
  stage: 'New' | 'Contacted' | 'KYC Submitted' | 'Onboarded';
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalLeads: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateLeadData {
  leadName: string;
  instituteName: string;
  contactPhone: string;
  salesOwner?: string;
  stage: string;
}

export interface UpdateLeadData {
  leadName?: string;
  instituteName?: string;
  contactPhone?: string;
  salesOwner?: string;
  stage?: string;
}

export interface LeadsFilters {
  stage?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const leadsApi = {
  // Get all leads with filtering and pagination
  getAllLeads: async (filters: LeadsFilters = {}): Promise<LeadsResponse> => {
    const params = new URLSearchParams();
    
    if (filters.stage) params.append('stage', filters.stage);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/leads?${params.toString()}`);
    return response.data;
  },

  // Get single lead by ID
  getLeadById: async (id: string): Promise<{ success: boolean; data: Lead }> => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  // Create new lead
  createLead: async (leadData: CreateLeadData): Promise<{ success: boolean; data: Lead; message: string }> => {
    const response = await api.post('/leads', leadData);
    return response.data;
  },

  // Update lead
  updateLead: async (id: string, leadData: UpdateLeadData): Promise<{ success: boolean; data: Lead; message: string }> => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  },

  // Delete lead
  deleteLead: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },

  // Update lead stage only
  updateLeadStage: async (id: string, stage: string): Promise<{ success: boolean; data: Lead; message: string }> => {
    const response = await api.patch(`/leads/${id}/stage`, { stage });
    return response.data;
  },
};

export default leadsApi;
