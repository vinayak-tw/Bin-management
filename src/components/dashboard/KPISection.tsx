import React from 'react';
import { Package, TrendingUp, Database, Users } from 'lucide-react';
import { KPICard } from './KPICard';
import { useInventoryStore } from '../../store/useInventoryStore';

export const KPISection: React.FC = () => {
  const { kpiData } = useInventoryStore();

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h2 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Bins in Use"
          value={`${kpiData.binsInUse.current} / ${kpiData.binsInUse.total}`}
          subtitle="All bins currently active"
          icon={Package}
        />
        
        <KPICard
          title="Capacity Utilization"
          value={`${kpiData.capacityUtilization}%`}
          subtitle="Utilized volume across all owned bins"
          icon={TrendingUp}
        />
        
        <KPICard
          title="Total Capacity (Owned)"
          value={`${kpiData.totalCapacity.toLocaleString()} units`}
          subtitle="Volume managed by Franklin Sisters Inc"
          icon={Database}
        />
        
        <KPICard
          title="Partner Collaboration"
          value={`${kpiData.partnerCollaboration.agencies} Agencies | ${kpiData.partnerCollaboration.units.toLocaleString()} Units`}
          subtitle="Partner network and allocation"
          icon={Users}
        />
      </div>
    </div>
  );
};