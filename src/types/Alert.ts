export type TAlert = {
  message: string;
  type: 'success' | 'error' | 'info';
};

export type TAlerts = TAlert[];
