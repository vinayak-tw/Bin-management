// Create collections and indexes
db.createCollection('salesreps');
db.createCollection('agencies');
db.createCollection('bins');

// Create indexes
db.salesreps.createIndex({ email: 1 }, { unique: true });
db.agencies.createIndex({ agencyId: 1 }, { unique: true });
db.bins.createIndex({ binId: 1 }, { unique: true });
db.bins.createIndex({ geoLocation: '2dsphere' });

// Insert sample sales representatives
db.salesreps.insertMany([
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqDp0.3TqKJHy', // hashed 'password123'
    role: 'salesRep',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqDp0.3TqKJHy', // hashed 'password123'
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample agencies
db.agencies.insertMany([
  {
    agencyId: 'AG-001',
    name: 'Mumbai Central Agency',
    type: 'Primary',
    location: {
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      zipCode: '400001'
    },
    salesReps: [],
    bins: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    agencyId: 'AG-002',
    name: 'Delhi North Agency',
    type: 'Secondary',
    location: {
      address: '456 North Road',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      zipCode: '110001'
    },
    salesReps: [],
    bins: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Update sales reps with agency references
db.salesreps.updateOne(
  { email: 'john.doe@example.com' },
  { $set: { agency: db.agencies.findOne({ agencyId: 'AG-001' })._id } }
);

db.salesreps.updateOne(
  { email: 'jane.smith@example.com' },
  { $set: { agency: db.agencies.findOne({ agencyId: 'AG-002' })._id } }
);

// Update agencies with sales rep references
db.agencies.updateOne(
  { agencyId: 'AG-001' },
  { $set: { salesReps: [db.salesreps.findOne({ email: 'john.doe@example.com' })._id] } }
);

db.agencies.updateOne(
  { agencyId: 'AG-002' },
  { $set: { salesReps: [db.salesreps.findOne({ email: 'jane.smith@example.com' })._id] } }
);

// Insert sample bins
db.bins.insertMany([
  {
    binId: 'BIN-001',
    volume: 1000,
    currentLevel: 500,
    agencies: [
      {
        agencyId: 'AG-001',
        allocation: 500
      }
    ],
    geoLocation: {
      type: 'Point',
      coordinates: [72.8777, 19.0760]
    },
    lastUpdated: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    binId: 'BIN-002',
    volume: 2000,
    currentLevel: 1000,
    agencies: [
      {
        agencyId: 'AG-002',
        allocation: 1000
      }
    ],
    geoLocation: {
      type: 'Point',
      coordinates: [77.1025, 28.7041]
    },
    lastUpdated: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Update agencies with bin references
db.agencies.updateOne(
  { agencyId: 'AG-001' },
  { $set: { bins: [{ bin: db.bins.findOne({ binId: 'BIN-001' })._id, allocatedUnits: 200, physicalUnits: 150 }] } }
);

db.agencies.updateOne(
  { agencyId: 'AG-002' },
  { $set: { bins: [{ bin: db.bins.findOne({ binId: 'BIN-002' })._id, allocatedUnits: 500, physicalUnits: 400 }] } }
); 