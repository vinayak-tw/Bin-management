import api from './api';
import { Bin } from '../types/api';

export const binService = {
  // Get all bins
  getBins: async (): Promise<Bin[]> => {
    const response = await api.get('/bins');
    return response.data;
  },

  // Get a single bin
  getBin: async (id: string): Promise<Bin> => {
    const response = await api.get(`/bins/${id}`);
    return response.data;
  },

  // Create a new bin
  createBin: async (binData: Partial<Bin>): Promise<Bin> => {
    const response = await api.post('/bins', binData);
    return response.data;
  },

  // Update bin capacity
  updateBinCapacity: async (id: string, volume: number): Promise<Bin> => {
    const response = await api.put(`/bins/${id}/capacity`, { volume });
    return response.data;
  },

  // Update agency allocation
  updateAgencyAllocation: async (id: string, agencyId: string, allocatedUnits: number): Promise<Bin> => {
    const response = await api.put(`/bins/${id}/allocation`, {
      agencyId,
      allocatedUnits
    });
    return response.data;
  },

  // Update inventory
  updateInventory: async (id: string, action: 'add' | 'withdraw', units: number, agencyId: string): Promise<Bin> => {
    const response = await api.put(`/bins/${id}/inventory`, {
      action,
      units,
      agencyId
    });
    return response.data;
  },

  // Delete a bin
  deleteBin: async (id: string): Promise<void> => {
    await api.delete(`/bins/${id}`);
  }
}; 