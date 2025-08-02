import React, { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

const Rules = ({ data, saveData }) => {
  const [newRule, setNewRule] = useState({ name: '', severity: 'medium' });

  const addRule = () => {
    if (newRule.name.trim()) {
      const updatedData = {
        ...data,
        rules: [...data.rules, { ...newRule, id: Date.now() }]
      };
      saveData(updatedData);
      setNewRule({ name: '', severity: 'medium' });
    }
  };

  const deleteRule = (id) => {
    const updatedData = {
      ...data,
      rules: data.rules.filter(rule => rule.id !== id)
    };
    saveData(updatedData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Rule</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Rule name"
            value={newRule.name}
            onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <select
            value={newRule.severity}
            onChange={(e) => setNewRule({ ...newRule, severity: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <button
            onClick={addRule}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Current Rules</h2>
        {data.rules.length === 0 ? (
          <p className="text-gray-500">No rules added yet.</p>
        ) : (
          <div className="space-y-3">
            {data.rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{rule.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                    rule.severity === 'critical' ? 'bg-red-200 text-red-800' :
                    rule.severity === 'high' ? 'bg-orange-200 text-orange-800' :
                    rule.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {rule.severity.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rules;
