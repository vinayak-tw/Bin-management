import React, { useEffect, useState } from 'react';
import { agencyService } from '../../services/agencyService';
import { X, Pencil, Trash2 } from 'lucide-react';

interface Agency {
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
}

interface EditAgencyModalProps {
  agency: Agency;
  onClose: () => void;
  onSave: (id: string, data: Partial<Agency>) => void;
}

const EditAgencyModal: React.FC<EditAgencyModalProps> = ({ agency, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: agency.name,
    location: agency.location,
    type: agency.type
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(agency._id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Edit Agency</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agency Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Primary' | 'Secondary' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AgencyList: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      const data = await agencyService.getAgencies();
      setAgencies(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch agencies');
      console.error('Error fetching agencies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAgency = async (id: string, updateData: Partial<Agency>) => {
    try {
      await agencyService.updateAgency(id, updateData);
      fetchAgencies(); // Refresh the list
    } catch (err) {
      console.error('Error updating agency:', err);
    }
  };

  const handleDeleteAgency = async (id: string) => {
    try {
      await agencyService.deleteAgency(id);
      fetchAgencies(); // Refresh the list
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error deleting agency:', err);
    }
  };

  const handleAddSalesRep = async (agencyId: string, salesRepId: string) => {
    try {
      await agencyService.addSalesRep(agencyId, salesRepId);
      fetchAgencies(); // Refresh the list
    } catch (err) {
      console.error('Error adding sales rep:', err);
    }
  };

  const handleRemoveSalesRep = async (agencyId: string, salesRepId: string) => {
    try {
      await agencyService.removeSalesRep(agencyId, salesRepId);
      fetchAgencies(); // Refresh the list
    } catch (err) {
      console.error('Error removing sales rep:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Agencies</h2>
      {agencies.map((agency) => (
        <div key={agency._id} className="border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{agency.name}</h3>
              <p>Agency ID: {agency.agencyId}</p>
              <p>Type: {agency.type}</p>
              <p>Location: {agency.location}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingAgency(agency)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit Agency"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDeleteConfirmId(agency._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Agency"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Sales Representatives</h4>
            <div className="space-y-2">
              {agency.salesReps.map((rep) => (
                <div key={rep._id} className="border-t pt-2">
                  <p>Name: {rep.name}</p>
                  <p>Email: {rep.email}</p>
                  <button
                    onClick={() => handleRemoveSalesRep(agency._id, rep._id)}
                    className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Bin Allocations</h4>
            <div className="space-y-2">
              {agency.bins.map((binAllocation) => (
                <div key={binAllocation.bin._id} className="border-t pt-2">
                  <p>Bin ID: {binAllocation.bin.binId}</p>
                  <p>Product ID: {binAllocation.bin.productId}</p>
                  <p>Location: {binAllocation.bin.location}</p>
                  <p>Allocated Units: {binAllocation.allocatedUnits}</p>
                  <p>Physical Units: {binAllocation.physicalUnits}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editingAgency && (
        <EditAgencyModal
          agency={editingAgency}
          onClose={() => setEditingAgency(null)}
          onSave={handleUpdateAgency}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this agency? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAgency(deleteConfirmId)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyList; 