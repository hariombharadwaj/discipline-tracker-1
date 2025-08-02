import React from 'react';
import { FileDown, Download, Share2, Trash2 } from 'lucide-react';

const Header = ({ data, saveData }) => {
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `iron-discipline-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          saveData(imported);
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Iron Discipline System',
        text: 'Check out this discipline tracking app',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      const emptyData = {
        violations: [],
        rules: [],
        totalViolations: 0,
        criticalViolations: 0,
        cleanDays: 0,
        progress: { current: 0, total: 10 }
      };
      saveData(emptyData);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-3">
          ⚡ IRON DISCIPLINE SYSTEM
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 md:mb-6">
          Forge yourself through fire and discipline
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
          <button onClick={exportData} className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg sm:rounded-xl font-bold hover:scale-105 transition-all">
            <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Export</span>
          </button>
          
          <label className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl font-bold hover:scale-105 transition-all cursor-pointer">
            <input type="file" accept=".json" onChange={importData} className="hidden" />
            <Download className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
            <span>Import</span>
          </label>
          
          <button onClick={shareApp} className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg sm:rounded-xl font-bold hover:scale-105 transition-all">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Share</span>
          </button>
          
          <button onClick={clearAllData} className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-bold hover:bg-red-700 transform hover:scale-105 transition-all">
            <Trash2 className="w-4 h-4 inline mr-1" />
            Clear
          </button>
        </div>
        
        <div className="p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="text-center">
            <p className="text-blue-800 font-bold text-xs sm:text-sm">💾 PERSISTENT STORAGE ACTIVE</p>
            <p className="text-blue-600 text-xs mt-1">Status: 🔄 Ready</p>
            <p className="text-blue-500 text-xs mt-1">
              Records: {data.totalViolations} violations • {data.rules.length} rule breaches
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
