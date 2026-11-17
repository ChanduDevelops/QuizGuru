import React from 'react';
import { useNotification } from '../../context/NotificationContext';

export const NotificationToast: React.FC = () => {
  const { notification } = useNotification();

  return (
    <div className={`notification ${notification.active ? 'active' : 'close'}`}>
      {notification.message}
    </div>
  );
};
