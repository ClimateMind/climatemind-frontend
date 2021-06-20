import React, { createContext, useState } from 'react';
import { TAlerts } from '../types/Alert';
import Toast from '../components/Toast';

export type TAlertDispatch = React.Dispatch<React.SetStateAction<TAlerts>>;

export const NotificationContext = createContext<TAlerts>([] as TAlerts);
export const NotificationDispatch = createContext<TAlertDispatch | null>(null);

const initialAlerts = [] as TAlerts;

export const NotificationProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<TAlerts>(initialAlerts);

  return (
    <NotificationContext.Provider value={alerts}>
      <NotificationDispatch.Provider value={setAlerts}>
        {children}
        {alerts.map((alert, i) => (
          <Toast key={`alert-${i}`} message={alert.message} type={alert.type} />
        ))}
      </NotificationDispatch.Provider>
    </NotificationContext.Provider>
  );
};
