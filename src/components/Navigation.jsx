import React from 'react';
import { BarChart3, Target, ScrollText, TrendingUp, History } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'rules', icon: Target, label: 'Rules' },
    { id: 'logs', icon: ScrollText, label: 'Logs' },
    { id: 'charts', icon: TrendingUp, label: 'Charts' },
    { id: 'history', icon: History, label: 'History' }
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 mb-6 sm:mb-8">
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 sm:space-x-2 md:space-x-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold transition-all transform hover:scale-105 ${
                isActive
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
