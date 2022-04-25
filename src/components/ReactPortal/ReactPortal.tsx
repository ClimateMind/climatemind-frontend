import React from 'react';
import { createPortal } from 'react-dom';

type ReactPortalProps = {
  children: React.ReactNode;
};

const ReactPortal = ({ children }: ReactPortalProps) => {
  return createPortal(children, document.getElementById('modal') as Element);
};

export default ReactPortal;
