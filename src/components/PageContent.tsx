import React from 'react';

interface Props {
  children: React.ReactNode;
}

function PageContent({ children }: Props) {
  return (
    <section style={{
      maxWidth: '640px',
      paddingBottom: '60px',
    }}>
      {children}
    </section>
  );
}

export default PageContent;
