import { useContext } from 'react';
import {
  NotificationContext,
  NotificationDispatch,
} from '../contexts/notifications';
import { TAlert } from '../types/Alert';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useToast = () => {
  const alerts = useContext(NotificationContext);
  const setAlerts = useContext(NotificationDispatch);

  const showToast = (newAlert: TAlert) => {
    const updatedAlerts = [...alerts, newAlert];
    if (setAlerts) {
      setAlerts(updatedAlerts);
    }
  };

  return {
    showToast,
  };
};
