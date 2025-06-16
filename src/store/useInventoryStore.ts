import { create } from 'zustand';
import { Agency, Bin, Product, KPIData, InventoryTransaction, BinAllocation } from '../types';
import { useCallback } from 'react';

interface KpiData {
  binsInUse: { current: number; total: number };
  capacityUtilization: number;
  totalCapacity: number;
  partnerCollaboration: { agencies: number; units: number };
}

interface InventoryStore {
  agencies: Agency[];
  bins: Bin[];
  products: Product[];
  kpiData: KpiData;
  transactions: InventoryTransaction[];
  currentView: 'bin' | 'agency' | 'product';
  displayMode: 'list' | 'map';
  searchQuery: string;
  setCurrentView: (view: 'bin' | 'agency' | 'product') => void;
  setDisplayMode: (mode: 'list' | 'map') => void;
  setSearchQuery: (query: string) => void;
  addBin: (bin: Omit<Bin, 'id'>) => void;
  updateBin: (binId: string, updates: Partial<Bin>) => void;
  deleteBin: (binId: string) => void;
  addAgency: (agency: Omit<Agency, 'id'>) => void;
  updateAgency: (agencyId: string, updates: Partial<Agency>) => void;
  addStock: (binId: string, quantity: number, performedBy: string) => void;
  withdrawStock: (binId: string, agencyId: string, quantity: number, performedBy: string) => void;
  updateAllocation: (binId: string, agencyId: string, allocationUpdates: Partial<BinAllocation>) => void;
  calculateKPIs: () => void;
}

// Mock data
const mockAgencies: Agency[] = [
  {
    id: 'AG-001',
    name: 'AgriTech Solutions',
    type: 'Primary',
    location: 'Minneapolis, MN',
    salesReps: [
      { 
        id: 'SR-001', 
        name: 'John Smith', 
        email: 'john@agritech.com',
        agencyId: 'AG-001',
        role: 'owner',
        contact: 'john@agritech.com'
      },
      { 
        id: 'SR-002', 
        name: 'Sarah Johnson', 
        email: 'sarah@agritech.com',
        agencyId: 'AG-001',
        role: 'owner',
        contact: 'sarah@agritech.com'
      }
    ]
  },
  {
    id: 'AG-002',
    name: 'Hall Farms',
    type: 'Partner',
    location: 'Duluth, MN',
    salesReps: []
  },
  {
    id: 'AG-003',
    name: 'Midwest Seed Co.',
    type: 'Partner',
    location: 'St. Paul, MN',
    salesReps: [
      { 
        id: 'SR-003', 
        name: 'Michael Brown', 
        email: 'michael@midwestseed.com',
        agencyId: 'AG-003',
        role: 'owner',
        contact: 'michael@midwestseed.com'
      },
      { 
        id: 'SR-004', 
        name: 'Emily Davis', 
        email: 'emily@midwestseed.com',
        agencyId: 'AG-003',
        role: 'owner',
        contact: 'emily@midwestseed.com'
      }
    ]
  },
  {
    id: 'AG-004',
    name: 'Northern Growers',
    type: 'Partner',
    location: 'Fargo, ND',
    salesReps: [
      { 
        id: 'SR-005', 
        name: 'David Wilson', 
        email: 'david@northerngrowers.com',
        agencyId: 'AG-004',
        role: 'owner',
        contact: 'david@northerngrowers.com'
      }
    ]
  }
];

const mockProducts: Product[] = [
  { id: 'P00622Q', name: 'SU28', type: 'Soybean', subproductId: 'SU28' },
  { id: 'P00123Q', name: 'WH30', type: 'Wheat', subproductId: 'WH30' },
  { id: 'P00456Q', name: 'CO45', type: 'Corn', subproductId: 'CO45' }
];

const mockBins: Bin[] = [
  {
    id: 'Bin-1',
    productId: 'P00622Q',
    location: 'Minneapolis',
    volume: 2000,
    ownerId: 'AG-001',
    allocations: [
      {
        id: 'alloc-1',
        binId: 'Bin-1',
        agencyId: 'AG-001',
        allocatedUnits: 1200,
        physicalUnits: 900,
        invoicedUnits: 900,
        deliveredUnits: 880,
        returnedUnits: 20,
        utilizationRate: 45.0 // 900/2000*100
      },
      {
        id: 'alloc-2',
        binId: 'Bin-1',
        agencyId: 'AG-002',
        allocatedUnits: 500,
        physicalUnits: 400,
        invoicedUnits: 400,
        deliveredUnits: 390,
        returnedUnits: 10,
        utilizationRate: 20.0 // 400/2000*100
      },
      {
        id: 'alloc-3',
        binId: 'Bin-1',
        agencyId: 'AG-003',
        allocatedUnits: 200,
        physicalUnits: 150,
        invoicedUnits: 150,
        deliveredUnits: 145,
        returnedUnits: 5,
        utilizationRate: 7.5 // 150/2000*100
      }
    ],
    availableVolume: (900 + 400 + 150) // 550
  },
  {
    id: 'Bin-2',
    productId: 'P00123Q',
    location: 'Duluth',
    volume: 1500,
    ownerId: 'AG-001',
    allocations: [
      {
        id: 'alloc-4',
        binId: 'Bin-2',
        agencyId: 'AG-001',
        allocatedUnits: 800,
        physicalUnits: 600,
        invoicedUnits: 600,
        deliveredUnits: 590,
        returnedUnits: 10,
        utilizationRate: 40.0 // 600/1500*100
      },
      {
        id: 'alloc-5',
        binId: 'Bin-2',
        agencyId: 'AG-002',
        allocatedUnits: 400,
        physicalUnits: 300,
        invoicedUnits: 300,
        deliveredUnits: 295,
        returnedUnits: 5,
        utilizationRate: 20.0 // 300/1500*100
      }
    ],
    availableVolume:  (600 + 300) // 600
  },
  {
    id: 'Bin-3',
    productId: 'P00456Q',
    location: 'St. Paul',
    volume: 1800,
    ownerId: 'AG-001',
    allocations: [
      {
        id: 'alloc-6',
        binId: 'Bin-3',
        agencyId: 'AG-001',
        allocatedUnits: 1000,
        physicalUnits: 800,
        invoicedUnits: 800,
        deliveredUnits: 790,
        returnedUnits: 10,
        utilizationRate: 44.4 // 800/1800*100
      },
      {
        id: 'alloc-7',
        binId: 'Bin-3',
        agencyId: 'AG-003',
        allocatedUnits: 500,
        physicalUnits: 400,
        invoicedUnits: 400,
        deliveredUnits: 395,
        returnedUnits: 5,
        utilizationRate: 22.2 // 400/1800*100
      },
      {
        id: 'alloc-8',
        binId: 'Bin-3',
        agencyId: 'AG-004',
        allocatedUnits: 200,
        physicalUnits: 100,
        invoicedUnits: 100,
        deliveredUnits: 98,
        returnedUnits: 2,
        utilizationRate: 5.6 // 100/1800*100
      }
    ],
    availableVolume: 0+ (800 + 400 + 100) // 500
  },
  {
    id: 'Bin-4',
    productId: 'P00622Q',
    location: 'Fargo',
    volume: 1200,
    ownerId: 'AG-001',
    allocations: [
      {
        id: 'alloc-9',
        binId: 'Bin-4',
        agencyId: 'AG-001',
        allocatedUnits: 700,
        physicalUnits: 500,
        invoicedUnits: 500,
        deliveredUnits: 495,
        returnedUnits: 5,
        utilizationRate: 41.7 // 500/1200*100
      },
      {
        id: 'alloc-10',
        binId: 'Bin-4',
        agencyId: 'AG-004',
        allocatedUnits: 300,
        physicalUnits: 200,
        invoicedUnits: 200,
        deliveredUnits: 198,
        returnedUnits: 2,
        utilizationRate: 16.7 // 200/1200*100
      }
    ],
    availableVolume: 0+(500 + 200) // 500
  }
];

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  // Initial state
  agencies: mockAgencies,
  bins: mockBins,
  products: mockProducts,
  kpiData: {
    binsInUse: { current: 0, total: 0 },
    capacityUtilization: 0,
    totalCapacity: 0,
    partnerCollaboration: { agencies: 0, units: 0 }
  },
  transactions: [],
  currentView: 'bin',
  displayMode: 'list',
  searchQuery: '',

  // Actions
  setCurrentView: (view) => set({ currentView: view }),
  setDisplayMode: (mode) => set({ displayMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addBin: (bin) => {
    const newBin = { ...bin, id: `Bin-${get().bins.length + 1}` };
    set((state) => ({ bins: [...state.bins, newBin] }));
  },

  updateBin: (binId, updates) => {
    set((state) => ({
      bins: state.bins.map((bin) =>
        bin.id === binId ? { ...bin, ...updates } : bin
      ),
    }));
  },

  deleteBin: (binId) => {
    set((state) => ({
      bins: state.bins.filter((bin) => bin.id !== binId),
    }));
  },

  addAgency: (agency) => {
    const newAgency = { ...agency, id: `AG-${String(get().agencies.length + 1).padStart(3, '0')}` };
    set((state) => ({ agencies: [...state.agencies, newAgency] }));
  },

  updateAgency: (agencyId, updates) => {
    set((state) => ({
      agencies: state.agencies.map((agency) =>
        agency.id === agencyId ? { ...agency, ...updates } : agency
      ),
    }));
  },

  addStock: (binId, quantity, performedBy) => {
    set((state) => {
      const bin = state.bins.find((b) => b.id === binId);
      if (!bin) return state;

      const newAvailableVolume = bin.availableVolume + quantity;
      if (newAvailableVolume > bin.volume) {
        console.error('Cannot add more stock than bin volume');
        return state;
      }

      const transaction: InventoryTransaction = {
        id: `TXN-${Date.now()}`,
        binId,
        agencyId: '', // Empty string for add transactions
        type: 'add',
        quantity,
        performedBy,
        timestamp: new Date(),
      };

      return {
        bins: state.bins.map((b) =>
          b.id === binId
            ? { ...b, availableVolume: newAvailableVolume }
            : b
        ),
        transactions: [...state.transactions, transaction],
      };
    });
  },

  withdrawStock: (binId, agencyId, quantity, performedBy) => {
    set((state) => {
      const bin = state.bins.find((b) => b.id === binId);
      if (!bin) return state;

      const allocation = bin.allocations.find((a) => a.agencyId === agencyId);
      if (!allocation) return state;

      if (quantity > allocation.allocatedUnits) {
        console.error('Cannot withdraw more than allocated units');
        return state;
      }

      const newAvailableVolume = bin.availableVolume - quantity;
      if (newAvailableVolume < 0) {
        console.error('Cannot withdraw more than available volume');
        return state;
      }

      const transaction: InventoryTransaction = {
        id: `TXN-${Date.now()}`,
        binId,
        agencyId,
        type: 'withdraw',
        quantity,
        performedBy,
        timestamp: new Date(),
      };

      return {
        bins: state.bins.map((b) =>
          b.id === binId
            ? {
                ...b,
                availableVolume: newAvailableVolume,
                allocations: b.allocations.map((a, index) =>
                  index === 0
                    ? {
                        ...a,
                        physicalUnits: a.physicalUnits - quantity,
                      }
                    : a.agencyId === agencyId
                    ? {
                        ...a,
                        allocatedUnits: a.allocatedUnits - quantity,
                        physicalUnits: a.physicalUnits - quantity,
                      }
                    : a
                ),
              }
            : b
        ),
        transactions: [...state.transactions, transaction],
      };
    });
  },

  updateAllocation: (binId, agencyId, allocationUpdates) => {
    set((state) => {
      const bin = state.bins.find((b) => b.id === binId);
      if (!bin) return state;

      // Calculate total allocated units excluding the current allocation being updated
      const totalAllocatedUnits = bin.allocations.reduce((total, alloc) => {
        if (alloc.agencyId === agencyId) {
          return total; // Skip the allocation being updated
        }
        return total + alloc.allocatedUnits;
      }, 0);

      // Add the new allocation amount
      const newAllocation = allocationUpdates.allocatedUnits || 0;
      const newTotalAllocated = totalAllocatedUnits + newAllocation;

      // Check if the new total allocated units exceeds the bin volume
      if (newTotalAllocated > bin.volume) {
        console.error(`Total allocated units (${newTotalAllocated}) cannot exceed bin volume (${bin.volume})`);
        return state;
      }

      // Check if the new total allocated units exceeds available volume
      if (newTotalAllocated > bin.availableVolume) {
        console.error(`Total allocated units (${newTotalAllocated}) cannot exceed available volume (${bin.availableVolume})`);
        return state;
      }

      return {
        bins: state.bins.map((bin) =>
          bin.id === binId
            ? {
                ...bin,
                allocations: bin.allocations.map((allocation) =>
                  allocation.agencyId === agencyId
                    ? { ...allocation, ...allocationUpdates }
                    : allocation
                ),
              }
            : bin
        ),
      };
    });
  },

  calculateKPIs: () => {
    set((state) => {
      const totalBins = state.bins.length;
      const binsInUse = state.bins.filter((bin) => bin.availableVolume < bin.volume).length;
      const totalCapacity = state.bins.reduce((sum, bin) => sum + bin.volume, 0);
      const usedCapacity = state.bins.reduce((sum, bin) => sum + (bin.volume - bin.availableVolume), 0);
      const capacityUtilization = totalCapacity > 0 ? Number(((usedCapacity / totalCapacity) * 100).toFixed(1)) : 0;

      const partnerAgencies = state.agencies.filter(agency => agency.type === 'Partner').length;
      const partnerUnits = state.bins.reduce((sum, bin) => 
        sum + bin.allocations
          .filter(alloc => state.agencies.find(agency => agency.id === alloc.agencyId)?.type === 'Partner')
          .reduce((allocSum, alloc) => allocSum + alloc.allocatedUnits, 0), 0
      );

      return {
        kpiData: {
          binsInUse: { current: binsInUse, total: totalBins },
          capacityUtilization,
          totalCapacity,
          partnerCollaboration: { agencies: partnerAgencies, units: partnerUnits }
        }
      };
    });
  }
}));