import React from 'react';
import { Plus, Building2 } from 'lucide-react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { AgencyCard } from './AgencyCard';

export const AgencyOverview: React.FC = () => {
  const { agencies } = useInventoryStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Sales Agency Overview</h2>
        </div>
        
        <button className="flex items-center space-x-2 border border-emerald-400 bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 hover:border-emerald-500 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Sales Agency</span>
        </button>
      </div>

      <div className="space-y-6">
        {agencies.map((agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </div>
  );
};