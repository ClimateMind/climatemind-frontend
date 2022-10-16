import React from 'react';

export interface TDetails {
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

const Details: React.FC<TDetails> = ({ defaultOpen = false, children }) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <details open={defaultOpen} onClick={() => setOpen(!open)}>
      <summary>{open ? 'Less Info' : 'More Info'}</summary>
      {open && children}
    </details>
  );
};

export default Details;
