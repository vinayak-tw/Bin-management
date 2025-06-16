import React from 'react';
import { List, Map, Eye } from 'lucide-react';
import { useInventoryStore } from '../../store/useInventoryStore';

export const ViewToggle: React.FC = () => {
  const { displayMode, setDisplayMode } = useInventoryStore();

  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <div className="flex items-center space-x-3">
        <Eye className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold text-gray-700">Display Mode:</span>
      </div>
      
      <div className="flex bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-2xl p-1.5 shadow-lg border border-green-200">
        <button
          onClick={() => setDisplayMode('list')}
          className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 transform ${
            displayMode === 'list'
              ? 'bg-white text-green-800 shadow-lg scale-105 border border-green-200'
              : 'text-green-600 hover:text-green-800 hover:bg-white/50 hover:scale-102'
          }`}
        >
          <List className={`w-4 h-4 ${displayMode === 'list' ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-medium">List View</span>
        </button>
        
        <button
          onClick={() => setDisplayMode('map')}
          className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 transform ${
            displayMode === 'map'
              ? 'bg-white text-green-800 shadow-lg scale-105 border border-green-200'
              : 'text-green-600 hover:text-green-800 hover:bg-white/50 hover:scale-102'
          }`}
        >
          <Map className={`w-4 h-4 ${displayMode === 'map' ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-medium">Map View</span>
        </button>
      </div>
    </div>
  );
};