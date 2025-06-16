import api from './api';
import { Agency } from '../types/api';

export const agencyService = {
  // Get all agencies
  getAgencies: async (): Promise<Agency[]> => {
    const response = await api.get('/agencies');
    return response.data;
  },

  // Get a single agency
  getAgency: async (id: string): Promise<Agency> => {
    const response = await api.get(`/agencies/${id}`);
    return response.data;
  },

  // Create a new agency
  createAgency: async (agencyData: Partial<Agency>): Promise<Agency> => {
    const response = await api.post('/agencies', agencyData);
    return response.data;
  },

  // Update an agency
  updateAgency: async (id: string, agencyData: Partial<Agency>): Promise<Agency> => {
    const response = await api.put(`/agencies/${id}`, agencyData);
    return response.data;
  },

  // Add a sales rep to an agency
  addSalesRep: async (id: string, salesRepId: string): Promise<Agency> => {
    const response = await api.put(`/agencies/${id}/salesrep`, { salesRepId });
    return response.data;
  },

  // Remove a sales rep from an agency
  removeSalesRep: async (id: string, salesRepId: string): Promise<Agency> => {
    const response = await api.delete(`/agencies/${id}/salesrep`, {
      data: { salesRepId }
    });
    return response.data;
  },

  // Delete an agency
  deleteAgency: async (id: string): Promise<void> => {
    await api.delete(`/agencies/${id}`);
  }
}; 