import React from 'react';
import { Wheat, Bell, User, Sprout } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-800 via-emerald-800 to-teal-800 text-white px-6 py-4 shadow-lg border-b-4 border-green-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="p-2 bg-green-700 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Wheat className="w-7 h-7 text-green-100" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-100 to-emerald-100 bg-clip-text text-transparent">
              AgriSeed Inventory Dashboard
            </h1>
            <p className="text-green-200 text-sm flex items-center space-x-1">
              <Sprout className="w-3 h-3" />
              <span>Smart Agricultural Management System</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <div className="p-2 rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer">
              <Bell className="w-5 h-5 text-green-100 group-hover:animate-swing" />
            </div>
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white animate-pulse">
              3
            </span>
          </div>
          
          <div className="flex items-center space-x-3 bg-green-700 rounded-xl px-4 py-2 hover:bg-green-600 transition-colors duration-200 cursor-pointer group">
            <div className="p-1 bg-green-600 rounded-lg group-hover:bg-green-500 transition-colors duration-200">
              <User className="w-4 h-4 text-green-100" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-100">Franklin Sisters Inc</span>
              <p className="text-xs text-green-200">Sales Rep</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};