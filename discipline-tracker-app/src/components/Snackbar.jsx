import React, { useEffect, useState } from 'react';

export default function Snackbar({ message = '', duration = 3000 }) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  return (
    <div style={styles.snackbar}>{message}</div>
  );
}

const styles = {
  snackbar: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#333',
    color: '#fff',
    borderRadius: '6px',
    padding: '10px 20px',
    zIndex: 999
  }
};
