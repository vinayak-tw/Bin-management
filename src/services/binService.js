import api from './api';

export const binService = {
  // Get all bins
  getBins: async () => {
    const response = await api.get('/bins');
    return response.data;
  },

  // Get a single bin
  getBin: async (id) => {
    const response = await api.get(`/bins/${id}`);
    return response.data;
  },

  // Create a new bin
  createBin: async (binData) => {
    const response = await api.post('/bins', binData);
    return response.data;
  },

  // Update bin capacity
  updateBinCapacity: async (id, volume) => {
    const response = await api.put(`/bins/${id}/capacity`, { volume });
    return response.data;
  },

  // Update agency allocation
  updateAgencyAllocation: async (id, agencyId, allocatedUnits) => {
    const response = await api.put(`/bins/${id}/allocation`, {
      agencyId,
      allocatedUnits
    });
    return response.data;
  },

  // Update inventory
  updateInventory: async (id, action, units, agencyId) => {
    const response = await api.put(`/bins/${id}/inventory`, {
      action,
      units,
      agencyId
    });
    return response.data;
  },

  // Delete a bin
  deleteBin: async (id) => {
    const response = await api.delete(`/bins/${id}`);
    return response.data;
  }
}; 