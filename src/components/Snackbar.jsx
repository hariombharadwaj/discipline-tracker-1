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
    <div style={styles.snackbar}>
      {message}
    </div>
  );
}

const styles = {
  snackbar: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#323232',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  }
};
