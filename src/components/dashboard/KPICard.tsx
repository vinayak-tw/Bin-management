import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof LucideIcon;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="group relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden bg-white/60 backdrop-blur-md">
      {/* Glassmorphic Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"></div>
      <div className="relative p-7 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors duration-300">
            {title}
          </h3>
          <div className="p-3 rounded-full bg-gradient-to-br from-emerald-200/60 to-teal-200/60 shadow-md group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-emerald-600 group-hover:text-teal-700 transition-colors duration-300" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-4xl font-extrabold text-gray-900 group-hover:text-emerald-800 transition-colors duration-300">
            {value}
          </p>
          <p className="text-sm text-gray-500 group-hover:text-emerald-600 transition-colors duration-300">
            {subtitle}
          </p>
        </div>
        {/* Progress indicator */}
        <div className="mt-5 h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
        </div>
      </div>
    </div>
  );
};