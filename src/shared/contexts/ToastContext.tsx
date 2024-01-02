import React, { createContext, useState } from 'react';
import { CmToast } from '../components';

interface ToastContextProps {
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode}) {
  const [toastState, setToastState] = useState({ open: false, message: '', type: 'success' });

  const showSuccessToast = (message: string) => {
    setToastState({ open: true, message, type: 'success' });
  };

  const showErrorToast  = (message: string) => {
    setToastState({ open: true, message, type: 'error' });
  };

  const contextValue: ToastContextProps = {
    showSuccessToast,
    showErrorToast,
  };

  const handleClose = () => {
    setToastState({ open: false, message: '', type: 'success' });
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <CmToast type='success' open={toastState.open} message={toastState.message} onClose={handleClose} />
    </ToastContext.Provider>
  );
}
