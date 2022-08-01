import React, { createContext, useState } from 'react';
import { TRatingAlert, TRatingAlerts } from '../types/Alert';
import { RatingToast } from '../components/RatingToast';

export type TAlertDispatch = React.Dispatch<
  React.SetStateAction<TRatingAlerts>
>;

export const RatingNotificationContext = createContext<TRatingAlerts>(
  [] as TRatingAlerts
);
export const RatingNotificationDispatch = createContext<TAlertDispatch | null>(
  null
);

const initialAlerts = [] as TRatingAlerts;

export const RatingNotificationProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<TRatingAlerts>(initialAlerts);

  return (
    <RatingNotificationContext.Provider value={alerts}>
      <RatingNotificationDispatch.Provider value={setAlerts}>
        {children}
        {alerts.map((alert, i) => (
          <RatingToast
            key={`alert-${i}`}
            conversationId={alert.conversationId}
            userBName={alert.userBName}
            conversationRating={alert.conversationRating}
            conversationState={alert.conversationState}
          />
        ))}
      </RatingNotificationDispatch.Provider>
    </RatingNotificationContext.Provider>
  );
};
