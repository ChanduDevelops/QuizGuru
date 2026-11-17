import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { NotificationColor } from '../types/common.types';

interface NotificationState {
  message: string;
  active: boolean;
  color: string;
}

interface NotificationContextValue {
  notification: NotificationState;
  notify: (msg?: string, color?: NotificationColor) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

const resolveColor = (color: NotificationColor = '#357cb4'): string => {
  switch (color.toLowerCase()) {
    case 'green':
      return '#00bf00';
    case 'red':
      return '#ff0000';
    case 'blue':
      return '#357cb4';
    default:
      return color;
  }
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState>({
    message: 'New notification',
    active: false,
    color: '#357cb4',
  });
  const timeoutRef = useRef<number | null>(null);

  const notify = useCallback((msg?: string, color: NotificationColor = '#357cb4') => {
    const resolvedColor = msg ? resolveColor(color) : '#ff0000';
    const resolvedMessage = msg || 'Something went wrong!';

    document.documentElement.style.setProperty('--notification-bg', resolvedColor);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setNotification({
      message: resolvedMessage,
      active: true,
      color: resolvedColor,
    });

    timeoutRef.current = window.setTimeout(() => {
      setNotification((prev) => ({ ...prev, active: false }));
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
