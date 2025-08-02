import React, { useState, useEffect } from 'react';
import Snackbar from './components/Snackbar';
import { useViolationLogs } from './hooks/useViolationLogs';
import { addViolationWithSync, syncQueuedViolations } from './utils/sync';

export default function App() {
  const { logs } = useViolationLogs();
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const triggerSync = async () => {
      const synced = await syncQueuedViolations();
      if (synced > 0) setMsg(\`✅ Synced \${synced} queued log(s)\`);
    };
    window.addEventListener('online', triggerSync);
    return () => window.removeEventListener('online', triggerSync);
  }, []);

  const handleAdd = async () => {
    const success = await addViolationWithSync({ text: "Meditated" });
    setMsg(success ? "✅ Log synced!" : "📂 Log saved offline");
  };

  return (
    <div>
      <h1>Discipline Logs</h1>
      <button onClick={handleAdd}>➕ Add Log</button>
      <ul>
        {logs.map((log, i) => <li key={i}>{log.text}</li>)}
      </ul>
      <Snackbar message={msg} />
    </div>
  );
}
