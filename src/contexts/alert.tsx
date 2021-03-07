import React, { createContext, useState } from 'react';
import { TAlerts } from '../types/Alert';
import Toast from '../components/Toast';

export type TAlertDispatch = React.Dispatch<React.SetStateAction<TAlerts>>;

export const AlertContext = createContext<TAlerts>([] as TAlerts);
export const AlertDispatch = createContext<TAlertDispatch | null>(null);

const initialAlerts = [] as TAlerts;

export const AlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<TAlerts>(initialAlerts);

  return (
    <AlertContext.Provider value={alerts}>
      <AlertDispatch.Provider value={setAlerts}>
        {children}
        {alerts.map((alert, i) => (
          <Toast key={`alert-${i}`} message={alert.message} type={alert.type} />
        ))}
      </AlertDispatch.Provider>
    </AlertContext.Provider>
  );
};
