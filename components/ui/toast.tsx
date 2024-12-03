import React from 'react';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, duration, onDismiss }) => {
  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => onDismiss(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  return (
    <div className={`toast toast-${type}`}>
      {message}
      <button onClick={() => onDismiss(id)}>Dismiss</button>
    </div>
  );
};

export default Toast;