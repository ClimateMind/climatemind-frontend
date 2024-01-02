import { useCallback, useEffect } from 'react';
import { ReactPortal } from '../ReactPortal';

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  color?: string;
  closeOnKeyPress?: boolean;
};

interface KeyboardEvent {
  key: string;
}

const keys = ['Escape'];

const Modal = ({
  children,
  handleClose,
  isOpen,
  color = '#07373BCC',
  closeOnKeyPress = false,
}: ModalProps) => {
  const closeOnEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      return keys.includes(e.key) ? handleClose() : null;
    },
    [handleClose]
  );

  useEffect(() => {
    if (closeOnKeyPress) {
      document.body.addEventListener('keydown', closeOnEscapeKey);

      return () => {
        document.body.removeEventListener('keydown', closeOnEscapeKey);
      };
    }
  }, [handleClose, closeOnKeyPress, closeOnEscapeKey]);

  if (!isOpen) return null;

  return (
    <ReactPortal>
      <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: `${color} 0% 0% no-repeat padding-box`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease-in-out',
      overflow: 'hidden',
      padding: '24px',
    }}>{children}</div>
    </ReactPortal>
  );
};

export default Modal;
