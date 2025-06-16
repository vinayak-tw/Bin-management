# Seed Bin Management System

A web application for managing agricultural seed bins, agencies, and sales representatives.

## Prerequisites

- Docker and Docker Compose
- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### 1. Database Setup

The application uses MongoDB as its database. You can start the database using Docker Compose:

```bash
# Start MongoDB
docker-compose up -d
```

This will:
- Start MongoDB on port 27018
- Create the necessary collections and indexes
- Insert sample data for testing

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27018/seed-bin-management
JWT_SECRET=your-secret-key" > .env

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

## Sample Data

The database comes pre-populated with sample data:

### Sales Representatives
- John Doe (john.doe@example.com / password123)
- Jane Smith (jane.smith@example.com / password123)

### Agencies
- Franklin Sisters Inc (AG-001)
- Green Valley Seeds (AG-002)

### Bins
- BIN-001 (Minneapolis)
- BIN-002 (Chicago)

## API Endpoints

### Bins
- GET /api/bins - Get all bins
- GET /api/bins/:id - Get a single bin
- POST /api/bins - Create a new bin
- PUT /api/bins/:id/capacity - Update bin capacity
- PUT /api/bins/:id/allocation - Update agency allocation
- PUT /api/bins/:id/inventory - Update inventory
- DELETE /api/bins/:id - Delete a bin

### Agencies
- GET /api/agencies - Get all agencies
- GET /api/agencies/:id - Get a single agency
- POST /api/agencies - Create a new agency
- PUT /api/agencies/:id - Update an agency
- PUT /api/agencies/:id/salesrep - Add a sales rep
- DELETE /api/agencies/:id/salesrep - Remove a sales rep
- DELETE /api/agencies/:id - Delete an agency 