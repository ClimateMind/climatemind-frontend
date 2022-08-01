import { useContext } from 'react';
import {
  NotificationContext,
  NotificationDispatch,
} from '../contexts/notifications';
import {
  RatingNotificationContext,
  RatingNotificationDispatch,
} from '../contexts/ratingNotifications';
import { TAlert, TRatingAlert } from '../types/Alert';

export const useToast = () => {
  const alerts = useContext(NotificationContext);
  const setAlerts = useContext(NotificationDispatch);

  const ratingAlerts = useContext(RatingNotificationContext);
  const setRatingAlerts = useContext(RatingNotificationDispatch);

  const showToast = (newAlert: TAlert) => {
    const updatedAlerts = [...alerts, newAlert];
    if (setAlerts) {
      setAlerts(updatedAlerts);
    }
  };

  const showRatingToast = (newRatingAlert: TRatingAlert) => {
    const updateRatingAlerts = [...ratingAlerts, newRatingAlert];
    console.log(updateRatingAlerts);
    if (setRatingAlerts) {
      setRatingAlerts(updateRatingAlerts);
    }
  };

  return {
    showToast,
    showRatingToast,
  };
};
