import React from 'react';

interface Props {
  children: React.ReactNode;
  bgColor?: string;
};

function PageSection({ children, bgColor }: Props) {
  return (
    <main style={{
      backgroundColor: bgColor ? bgColor : 'inherit',
      maxWidth: '640px',
      paddingBottom: '60px',
    }}>
      {children}
    </main>
  );
}

export default PageSection;
