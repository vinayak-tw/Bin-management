import api from './api';

export const agencyService = {
  // Get all agencies
  getAgencies: async () => {
    const response = await api.get('/agencies');
    return response.data;
  },

  // Get a single agency
  getAgency: async (id) => {
    const response = await api.get(`/agencies/${id}`);
    return response.data;
  },

  // Create a new agency
  createAgency: async (agencyData) => {
    const response = await api.post('/agencies', agencyData);
    return response.data;
  },

  // Update an agency
  updateAgency: async (id, agencyData) => {
    const response = await api.put(`/agencies/${id}`, agencyData);
    return response.data;
  },

  // Add a sales rep to an agency
  addSalesRep: async (id, salesRepId) => {
    const response = await api.put(`/agencies/${id}/salesrep`, { salesRepId });
    return response.data;
  },

  // Remove a sales rep from an agency
  removeSalesRep: async (id, salesRepId) => {
    const response = await api.delete(`/agencies/${id}/salesrep`, {
      data: { salesRepId }
    });
    return response.data;
  },

  // Delete an agency
  deleteAgency: async (id) => {
    const response = await api.delete(`/agencies/${id}`);
    return response.data;
  }
}; 