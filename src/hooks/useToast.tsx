import { useContext } from 'react';
import { AlertContext, AlertDispatch } from '../contexts/alert';
import { TAlert } from '../types/Alert';

export const useToast = () => {
  const alerts = useContext(AlertContext);
  const setAlerts = useContext(AlertDispatch);

  const showToast = (newAlert: TAlert) => {
    console.log('Show Toast');
    const updatedAlerts = [...alerts, newAlert];
    if (setAlerts) {
      setAlerts(updatedAlerts);
    }
  };

  return {
    showToast,
  };
};
