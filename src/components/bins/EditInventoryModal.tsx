import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, AlertTriangle, Package, TrendingUp } from 'lucide-react';
import { Bin } from '../../types';
import { useInventoryStore } from '../../store/useInventoryStore';

interface EditInventoryModalProps {
  bin: Bin;
  onClose: () => void;
}

export const EditInventoryModal: React.FC<EditInventoryModalProps> = ({ bin, onClose }) => {
  const [action, setAction] = useState<'add' | 'withdraw'>('add');
  const [quantity, setQuantity] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [error, setError] = useState('');
  const [selectedAllocation, setSelectedAllocation] = useState<Bin['allocations'][0] | null>(null);
  
  const { addStock, withdrawStock, agencies } = useInventoryStore();

  useEffect(() => {
    if (selectedAgency) {
      const allocation = bin.allocations.find(a => a.agencyId === selectedAgency);
      setSelectedAllocation(allocation || null);
    } else {
      setSelectedAllocation(null);
    }
  }, [selectedAgency, bin.allocations]);

  const validateQuantity = (qty: number): string | null => {
    if (isNaN(qty) || qty <= 0) {
      return 'Please enter a valid quantity';
    }

    if (action === 'add') {
      if (qty > bin.availableVolume) {
        return `Cannot add more than available volume (${bin.availableVolume} units)`;
      }
    } else {
      if (!selectedAgency) {
        return 'Please select an agency for withdrawal';
      }

      if (!selectedAllocation) {
        return 'Selected agency has no allocation in this bin';
      }

      if (qty > selectedAllocation.physicalUnits) {
        return `Insufficient physical units. Available: ${selectedAllocation.physicalUnits}`;
      }

      if (qty > selectedAllocation.allocatedUnits) {
        return `Cannot withdraw more than allocated units (${selectedAllocation.allocatedUnits})`;
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const qty = parseInt(quantity);
    const validationError = validateQuantity(qty);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    if (action === 'add') {
      addStock(bin.id, qty, 'Current User');
      onClose();
    } else {
      withdrawStock(bin.id, selectedAgency, qty, 'Current User');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Edit Inventory</h3>
              <p className="text-sm text-gray-500">{bin.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Action
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setAction('add');
                  setError('');
                  setSelectedAgency('');
                }}
                className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 transform ${
                  action === 'add'
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-300 scale-105 shadow-lg'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Stock</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAction('withdraw');
                  setError('');
                }}
                className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 transform ${
                  action === 'withdraw'
                    ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-2 border-red-300 scale-105 shadow-lg'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                }`}
              >
                <Minus className="w-5 h-5" />
                <span className="font-medium">Withdraw Stock</span>
              </button>
            </div>
          </div>

          {action === 'withdraw' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Agency
              </label>
              <select
                value={selectedAgency}
                onChange={(e) => {
                  setSelectedAgency(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-300"
                required
              >
                <option value="">Select an agency...</option>
                {bin.allocations.map((allocation) => {
                  const agency = agencies.find(a => a.id === allocation.agencyId);
                  return (
                    <option key={allocation.id} value={allocation.agencyId}>
                      {agency?.name} (Available: {allocation.physicalUnits})
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity
            </label>
            <div className="relative">
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-300"
                placeholder="Enter quantity"
                min="1"
                required
              />
              <TrendingUp className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              {action === 'add' && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Available volume:</span> {bin.availableVolume.toLocaleString()} units
                </p>
              )}
              {action === 'withdraw' && selectedAllocation && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Available physical units:</span> {selectedAllocation.physicalUnits.toLocaleString()} units
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-6 py-3 rounded-xl text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ${
                action === 'add'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
              }`}
            >
              {action === 'add' ? 'Add Stock' : 'Withdraw Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};