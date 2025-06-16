import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { CompanyHeader } from './components/common/CompanyHeader';
import { KPISection } from './components/dashboard/KPISection';
import { SearchAndFilters } from './components/dashboard/SearchAndFilters';
import { ViewToggle } from './components/dashboard/ViewToggle';
import { AgencyOverview } from './components/agencies/AgencyOverview';
import { BinOverview } from './components/bins/BinOverview';
import MapView from './components/map/MapView';
import { useInventoryStore } from './store/useInventoryStore';

function App() {
  const { currentView, displayMode, calculateKPIs } = useInventoryStore();

  useEffect(() => {
    calculateKPIs();
  }, [calculateKPIs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-zinc-100 relative overflow-hidden">
      {/* Enhanced Agricultural Background Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Agricultural Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Wheat stalks */}
        <div className="absolute top-20 left-10 animate-float-slow opacity-10">
          <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
            <path d="M20 80V10" stroke="#16a34a" strokeWidth="2"/>
            <ellipse cx="15" cy="15" rx="3" ry="8" fill="#22c55e" opacity="0.6"/>
            <ellipse cx="25" cy="18" rx="3" ry="8" fill="#22c55e" opacity="0.6"/>
            <ellipse cx="12" cy="25" rx="3" ry="8" fill="#16a34a" opacity="0.6"/>
            <ellipse cx="28" cy="28" rx="3" ry="8" fill="#16a34a" opacity="0.6"/>
            <ellipse cx="18" cy="35" rx="3" ry="8" fill="#15803d" opacity="0.6"/>
            <ellipse cx="22" cy="38" rx="3" ry="8" fill="#15803d" opacity="0.6"/>
          </svg>
        </div>

        {/* Corn stalks */}
        <div className="absolute top-32 right-16 animate-float-medium opacity-10">
          <svg width="30" height="100" viewBox="0 0 30 100" fill="none">
            <path d="M15 100V20" stroke="#16a34a" strokeWidth="3"/>
            <rect x="10" y="20" width="10" height="25" rx="5" fill="#eab308" opacity="0.7"/>
            <rect x="8" y="22" width="14" height="3" fill="#ca8a04" opacity="0.8"/>
            <rect x="8" y="27" width="14" height="3" fill="#ca8a04" opacity="0.8"/>
            <rect x="8" y="32" width="14" height="3" fill="#ca8a04" opacity="0.8"/>
            <rect x="8" y="37" width="14" height="3" fill="#ca8a04" opacity="0.8"/>
          </svg>
        </div>

        {/* Soybean plants */}
        <div className="absolute bottom-20 left-20 animate-float-fast opacity-10">
          <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
            <path d="M25 60V30" stroke="#16a34a" strokeWidth="2"/>
            <ellipse cx="20" cy="35" rx="8" ry="4" fill="#22c55e" opacity="0.6"/>
            <ellipse cx="30" cy="38" rx="8" ry="4" fill="#22c55e" opacity="0.6"/>
            <ellipse cx="15" cy="45" rx="6" ry="3" fill="#16a34a" opacity="0.6"/>
            <ellipse cx="35" cy="48" rx="6" ry="3" fill="#16a34a" opacity="0.6"/>
          </svg>
        </div>

        {/* Floating seeds */}
        <div className="absolute top-1/3 right-1/4 animate-bounce-slow opacity-20">
          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 animate-bounce-medium opacity-20">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-bounce-fast opacity-20">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
        </div>
      </div>

      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="animate-fade-in-up">
          <CompanyHeader />
        </div>
        <div className="animate-fade-in-up animation-delay-200">
          <KPISection />
        </div>
        <div className="animate-fade-in-up animation-delay-400">
          <SearchAndFilters />
        </div>
        <div className="animate-fade-in-up animation-delay-600">
          <ViewToggle />
        </div>
        {displayMode === 'map' ? (
          <div style={{ height: '100vh' }} className="animate-fade-in-up animation-delay-800">
            <MapView />
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in-up animation-delay-800">
            {currentView === 'agency' ? <AgencyOverview /> : <BinOverview />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;