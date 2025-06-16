import React from 'react';
import { Building2, MapPin, Award, TrendingUp } from 'lucide-react';

export const CompanyHeader: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8 mb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-emerald-500 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Franklin Sisters Inc
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Primary Agricultural Agency</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">Inventory Management Hub</span>
                </div>
              </div>
              <p className="text-gray-500 mt-2 text-sm">
                Comprehensive seed bin allocation and distribution oversight
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">2024</div>
              <div className="text-sm text-gray-500">Growing Season</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};