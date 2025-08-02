import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

const Logs = ({ data, saveData }) => {
  const [newLog, setNewLog] = useState({ rule: '', notes: '' });

  const addLog = () => {
    if (newLog.rule) {
      const violation = {
        id: Date.now(),
        rule: newLog.rule,
        notes: newLog.notes,
        timestamp: new Date().toISOString()
      };
      
      const updatedData = {
        ...data,
        violations: [...data.violations, violation],
        totalViolations: data.totalViolations + 1
      };
      
      saveData(updatedData);
      setNewLog({ rule: '', notes: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Log Violation</h2>
        <div className="space-y-4">
          <select
            value={newLog.rule}
            onChange={(e) => setNewLog({ ...newLog, rule: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select a rule</option>
            {data.rules.map((rule) => (
              <option key={rule.id} value={rule.name}>{rule.name}</option>
            ))}
          </select>
          <textarea
            placeholder="Notes (optional)"
            value={newLog.notes}
            onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg h-20"
          />
          <button
            onClick={addLog}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Log Violation
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Violations</h2>
        {data.violations.length === 0 ? (
          <p className="text-gray-500">No violations logged yet.</p>
        ) : (
          <div className="space-y-3">
            {data.violations.slice().reverse().map((violation) => (
              <div key={violation.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-red-800">{violation.rule}</h3>
                    {violation.notes && <p className="text-gray-600 text-sm mt-1">{violation.notes}</p>}
                  </div>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(violation.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;
