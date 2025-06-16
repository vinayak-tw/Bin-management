import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import { useInventoryStore } from '../../store/useInventoryStore';

export const SearchAndFilters: React.FC = () => {
  const { currentView, setCurrentView, searchQuery, setSearchQuery } = useInventoryStore();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search bins, agencies, or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300 bg-gray-50 focus:bg-white"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-3 border-2 border-green-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-300 group">
            <Filter className="w-4 h-4 text-green-600 group-hover:animate-pulse" />
            <span className="text-sm font-medium text-green-700">Advanced Filters</span>
          </button>

          <div className="flex bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setCurrentView('agency')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                currentView === 'agency'
                  ? 'bg-white text-green-800 shadow-lg scale-105'
                  : 'text-green-600 hover:text-green-800 hover:bg-white/50'
              }`}
            >
              By Sales Agency
            </button>
            <button
              onClick={() => setCurrentView('bin')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                currentView === 'bin'
                  ? 'bg-white text-green-800 shadow-lg scale-105'
                  : 'text-green-600 hover:text-green-800 hover:bg-white/50'
              }`}
            >
              By Bin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};