import React, { useState } from 'react';
import { Building2, MapPin, Edit, Trash2, ChevronDown, ChevronUp, X, Users, TrendingUp } from 'lucide-react';
import { Agency } from '../../types';
import { useInventoryStore } from '../../store/useInventoryStore';

interface AgencyCardProps {
  agency: Agency;
}

export const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: agency.name,
    type: agency.type,
    location: agency.location,
  });
  const { bins, products, updateAgency } = useInventoryStore();

  // Get bins allocated to this agency
  const agencyAllocations = bins.flatMap(bin => 
    bin.allocations
      .filter(allocation => allocation.agencyId === agency.id)
      .map(allocation => ({
        ...allocation,
        bin,
        product: products.find(p => p.id === bin.productId)
      }))
  );

  // Get the primary product for this agency
  const primaryProduct = products.find(p => p.id === agency.productId) || {
    name: agency.productName || 'Not Assigned',
    id: agency.productId || 'N/A',
    type: 'Unknown'
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    updateAgency(agency.id, formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleDeleteConfirm = () => {
    updateAgency(agency.id, { name: '[Deleted]', type: agency.type, location: agency.location });
    setIsDeleting(false);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-green-100 overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-6 border-b border-green-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{agency.type === 'Primary' ? 'P' : 'S'}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-800 transition-colors duration-300">
                {agency.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  agency.type === 'Primary' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {agency.type} Agency
                </span>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">{agency.salesReps.length} Sales Reps</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Agency ID</p>
            <p className="font-bold text-green-800">{agency.id}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Type</p>
            <p className="font-bold text-gray-800">{agency.type}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <p className="text-sm text-gray-500">Location</p>
            </div>
            <p className="font-bold text-gray-800">{agency.location}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {agencyAllocations.length > 0 && (
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full py-3 text-left hover:bg-green-50 rounded-lg px-3 transition-colors duration-200 group/button"
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-gray-700 group-hover/button:text-green-700">
                  Product/Bin Allocation Details ({agencyAllocations.length})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {agencyAllocations.reduce((sum, alloc) => sum + alloc.allocatedUnits, 0).toLocaleString()} units
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 group-hover/button:text-green-600 transition-colors duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover/button:text-green-600 transition-colors duration-200" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="mt-4 overflow-x-auto bg-gray-50 rounded-xl p-4 animate-fade-in">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-green-200">
                      <th className="text-left py-3 text-green-700 font-semibold">Product Name/ID</th>
                      <th className="text-left py-3 text-green-700 font-semibold">Bin ID</th>
                      <th className="text-left py-3 text-green-700 font-semibold">Bin Location</th>
                      <th className="text-right py-3 text-green-700 font-semibold">Allocated Units</th>
                      <th className="text-right py-3 text-green-700 font-semibold">Invoiced Units</th>
                      <th className="text-right py-3 text-green-700 font-semibold">Physical Units</th>
                      <th className="text-right py-3 text-green-700 font-semibold">Returned to plant</th>
                      <th className="text-right py-3 text-green-700 font-semibold">Delivered Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agencyAllocations.map((allocation, index) => {
                      const rowProduct = allocation.product || { name: 'Unknown', id: '', type: '' };
                      return (
                        <tr key={allocation.id} className={`border-b border-green-100 hover:bg-white transition-colors duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-green-25'
                        }`}>
                          <td className="py-4">
                            <div>
                              <p className="font-semibold text-gray-900">{rowProduct.name}</p>
                              <p className="text-gray-500 text-xs">
                                {rowProduct.type} {rowProduct.id && `| ${rowProduct.id}`}
                              </p>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                              {allocation.bin.id}
                            </span>
                          </td>
                          <td className="py-4 text-gray-700">{allocation.bin.location}</td>
                          <td className="py-4 text-right font-semibold text-gray-900">{allocation.allocatedUnits.toLocaleString()}</td>
                          <td className="py-4 text-right text-gray-700">{allocation.invoicedUnits.toLocaleString()}</td>
                          <td className="py-4 text-right text-gray-700">{allocation.physicalUnits.toLocaleString()}</td>
                          <td className="py-4 text-right text-gray-700">{allocation.returnedUnits.toLocaleString()}</td>
                          <td className="py-4 text-right font-semibold text-green-700">{allocation.deliveredUnits.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Agency</h3>
              <button 
                onClick={() => setIsEditing(false)} 
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleEditSave();
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Agency Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as Agency['type'] })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300"
                >
                  <option value="Primary">Primary</option>
                  <option value="Partner">Partner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-scale-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this agency? This action cannot be undone.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsDeleting(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
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