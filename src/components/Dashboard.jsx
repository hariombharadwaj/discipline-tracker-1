import React from 'react';
import { AlertTriangle, Flame, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = ({ data }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-2xl">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-4" />
            <p className="text-red-100 text-xs sm:text-sm font-bold mb-1 sm:mb-2">Total Violations</p>
            <p className="text-2xl sm:text-3xl md:text-5xl font-black">{data.totalViolations}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-2xl">
          <div className="text-center">
            <Flame className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-4" />
            <p className="text-orange-100 text-xs sm:text-sm font-bold mb-1 sm:mb-2">Critical</p>
            <p className="text-2xl sm:text-3xl md:text-5xl font-black">{data.criticalViolations}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-2xl">
          <div className="text-center">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-4" />
            <p className="text-green-100 text-xs sm:text-sm font-bold mb-1 sm:mb-2">Clean Days</p>
            <p className="text-2xl sm:text-3xl md:text-5xl font-black">{data.cleanDays}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-2xl">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-4" />
            <p className="text-blue-100 text-xs sm:text-sm font-bold mb-1 sm:mb-2">Progress</p>
            <p className="text-2xl sm:text-3xl md:text-5xl font-black">
              {data.progress.current}/{data.progress.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
