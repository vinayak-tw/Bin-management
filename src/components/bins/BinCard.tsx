import React, { useState } from 'react';
import { Package, MapPin, Edit, Trash2, Plus, Minus, Activity, BarChart3 } from 'lucide-react';
import { Bin, Product } from '../../types';
import { useInventoryStore } from '../../store/useInventoryStore';
import { ProgressBar } from '../common/ProgressBar';
import { EditInventoryModal } from './EditInventoryModal';

interface BinCardProps {
  bin: Bin;
  onEdit?: (bin: Bin) => void;
  onDelete?: (binId: string) => void;
}

export const BinCard: React.FC<BinCardProps> = ({ bin, onEdit, onDelete }) => {
  const { agencies } = useInventoryStore();
  const [showEditModal, setShowEditModal] = useState(false);

  const getAgencyName = (agencyId: string) => {
    const agency = agencies.find(a => a.id === agencyId);
    return agency ? agency.name : 'Unknown Agency';
  };

  const isOwner = (agencyId: string) => agencyId === bin.ownerId;

  const totalAllocated = bin.allocations.reduce((sum, alloc) => sum + alloc.allocatedUnits, 0);
  const totalPhysical = bin.allocations.reduce((sum, alloc) => sum + alloc.physicalUnits, 0);
  const utilizationPercentage = (totalPhysical / bin.volume) * 100;

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-emerald-100 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Package className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Activity className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-800 transition-colors duration-300">
                  {bin.id}
                </h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                    {bin.volume.toLocaleString()} units capacity
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <BarChart3 className="w-3 h-3" />
                    <span className="text-xs">{utilizationPercentage.toFixed(1)}% utilized</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Edit className="w-4 h-4" />
              <span className="font-medium">Edit Inventory</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-emerald-600 mb-1 font-medium">Product ID</p>
              <p className="font-bold text-emerald-900">{bin.productId}</p>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <MapPin className="w-3 h-3 text-emerald-500" />
                <p className="text-sm text-emerald-600 font-medium">Location</p>
              </div>
              <p className="font-bold text-emerald-900">{bin.location}</p>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-emerald-600 mb-1 font-medium">Available</p>
              <p className="font-bold text-emerald-900">{bin.availableVolume.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Allocations */}
        <div className="p-6">
          {bin.allocations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-emerald-800 flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Agency Allocations</span>
                </h4>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  {bin.allocations.length} agencies
                </div>
              </div>
              
              <div className="overflow-x-auto bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-emerald-200">
                      <th className="text-left py-3 text-emerald-700 font-semibold">Sales Agency</th>
                      <th className="text-center py-3 text-emerald-700 font-semibold">Status</th>
                      <th className="text-right py-3 text-emerald-700 font-semibold">Allocated</th>
                      <th className="text-right py-3 text-emerald-700 font-semibold pr-8">Physical</th>
                      <th className="text-left py-3 text-emerald-700 font-semibold pl-8">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bin.allocations.map((allocation, index) => {
                      const agency = agencies.find(a => a.id === allocation.agencyId);
                      const utilizationRate = (allocation.physicalUnits / allocation.allocatedUnits) * 100;
                      
                      return (
                        <tr key={allocation.id} className={`border-b border-emerald-100 hover:bg-white transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-emerald-25'
                        }`}>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                isOwner(allocation.agencyId) ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}></div>
                              <span className="font-medium text-emerald-900">{agency?.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              isOwner(allocation.agencyId) 
                                ? 'bg-emerald-100 text-emerald-800 shadow-sm' 
                                : 'bg-amber-100 text-amber-800 shadow-sm'
                            }`}>
                              {isOwner(allocation.agencyId) ? 'Owner' : 'Partner'}
                            </span>
                          </td>
                          <td className="py-4 text-right font-semibold text-emerald-900">
                            {allocation.allocatedUnits.toLocaleString()}
                          </td>
                          <td className="py-4 text-right pr-8 font-semibold text-emerald-900">
                            {allocation.physicalUnits.toLocaleString()}
                          </td>
                          <td className="py-4 pl-8">
                            <div className="flex items-center space-x-3">
                              <ProgressBar 
                                value={utilizationRate} 
                                max={100} 
                                className="flex-1"
                                color={isOwner(allocation.agencyId) ? 'green' : 'yellow'}
                              />
                              <span className="text-xs font-semibold text-emerald-700 w-12">
                                {utilizationRate.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <EditInventoryModal
          bin={bin}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};