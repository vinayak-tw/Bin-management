import React from 'react';
import { Plus, Package } from 'lucide-react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { BinCard } from './BinCard';

export const BinOverview: React.FC = () => {
  const { bins } = useInventoryStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Bin Inventory Management</h2>
        </div>
        
        <button className="flex items-center space-x-2 border border-emerald-400 bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 hover:border-emerald-500 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Bin</span>
        </button>
      </div>

      <div className="space-y-6">
        {bins.map((bin) => (
          <BinCard key={bin.id} bin={bin} />
        ))}
      </div>
    </div>
  );
};