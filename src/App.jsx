import React, { useState, useEffect } from 'react';
import { useDailySummary } from './hooks/useDailySummary';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Rules from './components/Rules';
import Logs from './components/Logs';
import Charts from './components/Charts';
import History from './components/History';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({
    violations: [],
    rules: [],
    totalViolations: 0,
    criticalViolations: 0,
    cleanDays: 0,
    progress: { current: 0, total: 10 }
  });

  useEffect(() => {
    const savedData = localStorage.getItem('ironDisciplineData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem('ironDisciplineData', JSON.stringify(newData));
  };

  const summaryWasCreated = useDailySummary(data);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={data} />;
      case 'rules':
        return <Rules data={data} saveData={saveData} />;
      case 'logs':
        return <Logs data={data} saveData={saveData} />;
      case 'charts':
        return <Charts data={data} />;
      case 'history':
        return <History data={data} />;
      default:
        return <Dashboard data={data} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="min-h-screen p-2 sm:p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {summaryWasCreated && (
            <div className="bg-green-100 border border-green-300 text-green-800 p-4 mb-4 rounded-lg text-center shadow-md">
              ✅ Your summary for today has been generated!
            </div>
          )}
          <Header data={data} saveData={saveData} />
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div id="content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
