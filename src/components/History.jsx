import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const History = ({ data }) => {
  const groupedViolations = data.violations.reduce((groups, violation) => {
    const date = new Date(violation.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(violation);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      {Object.keys(groupedViolations).length === 0 ? (
        <p className="text-gray-500">No history available yet.</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedViolations).map(([date, violations]) => (
            <div key={date} className="border-l-4 border-red-400 pl-4">
              <h3 className="font-semibold text-lg flex items-center mb-3">
                <Calendar className="w-5 h-5 mr-2" />
                {date}
              </h3>
              <div className="space-y-2">
                {violations.map((violation) => (
                  <div key={violation.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{violation.rule}</h4>
                        {violation.notes && <p className="text-gray-600 text-sm mt-1">{violation.notes}</p>}
                      </div>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(violation.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
