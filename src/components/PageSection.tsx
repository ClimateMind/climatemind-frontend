import React from 'react';

export type PageSectionProps = {
  bgColor?: string;
};

const PageSection: React.FC<PageSectionProps> = ({ children, bgColor }) => {
  return (
    <main style={{
      backgroundColor: bgColor ? bgColor : 'inherit',
      maxWidth: '640px',
      paddingBottom: '60px',
    }}>
      {children}
    </main>
  );
};

export default PageSection;
