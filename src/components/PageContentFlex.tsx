import React from 'react';
import { Grid } from '@mui/material';

const PageContent: React.FC = ({ children }) => {
  const isXS = false;

  return (
    <>
      <main style={{
        width: '100%',
        overflow: 'hidden',
      }}>
        <Grid
          container
          style={{
            height: '100%',
            gap: 0,
            flexWrap: 'nowrap',
            paddingBottom: '75px',
            boxSizing: 'border-box',
          }}
          direction="column"
          justifyContent={isXS ? 'space-between' : 'flex-start'}
          alignItems="center"
        >
          {children}
        </Grid>
      </main>
    </>
  );
};

export default PageContent;
