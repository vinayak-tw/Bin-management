export interface SalesRep {
  id: string;
  name: string;
  email: string;
  agencyId: string;
  role: 'owner' | 'sharer';
  contact: string;
}

export interface Agency {
  id: string;
  name: string;
  type: 'Primary' | 'Partner';
  location: string;
  salesReps: SalesRep[];
}

export interface Product {
  id: string;
  name: string;
  type: string;
  subproductId: string;
}

export interface Bin {
  id: string;
  volume: number;
  productId: string;
  location: string;
  availableVolume: number;
  ownerId: string;
  allocations: BinAllocation[];
}

export interface BinAllocation {
  id: string;
  binId: string;
  agencyId: string;
  allocatedUnits: number;
  physicalUnits: number;
  invoicedUnits: number;
  deliveredUnits: number;
  returnedUnits: number;
  utilizationRate: number;
}

export interface KPIData {
  binsInUse: { current: number; total: number };
  capacityUtilization: number;
  totalCapacity: number;
  partnerCollaboration: { agencies: number; units: number };
}

export interface InventoryTransaction {
  id: string;
  binId: string;
  agencyId: string;
  type: 'add' | 'withdraw';
  quantity: number;
  timestamp: Date;
  performedBy: string;
}