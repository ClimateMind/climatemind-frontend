import React from 'react';

const PageContent: React.FC = ({ children }) => {
  return (
    <section style={{
      maxWidth: '640px',
      paddingBottom: '60px',
    }}>
      {children}
    </section>
  );
};

export default PageContent;
