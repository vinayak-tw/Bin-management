export interface Bin {
  _id: string;
  binId: string;
  volume: number;
  productId: string;
  location: string;
  availableVolume: number;
  owner: string;
  agencies: Array<{
    agency: {
      _id: string;
      name: string;
      agencyId: string;
    };
    allocatedUnits: number;
    physicalUnits: number;
  }>;
  geoLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  warehouse: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agency {
  _id: string;
  agencyId: string;
  name: string;
  type: 'Primary' | 'Secondary';
  location: string;
  salesReps: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
  bins: Array<{
    bin: {
      _id: string;
      binId: string;
      volume: number;
      productId: string;
      location: string;
    };
    allocatedUnits: number;
    physicalUnits: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface SalesRep {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'salesRep';
  agency?: string;
  ownedBins: string[];
  sharedBins: Array<{
    bin: string;
    allocatedUnits: number;
  }>;
  createdAt: string;
  updatedAt: string;
} 