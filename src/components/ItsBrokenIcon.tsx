import React from 'react';
import { Grid, Box } from '@material-ui/core';

import CmTypography from 'shared/components/CmTypography';

export const ItsBrokenIcon: React.FC<{}> = () => {
  return (
    <Grid item>
      <Box>
        <CmTypography variant="h1" style={{ fontSize: 60, marginTop: '15vh' }}>
          :(
        </CmTypography>
        <CmTypography variant="h2" >It’s broken…</CmTypography>
        <CmTypography variant="body" style={{ fontSize: 20, textAlign: 'center', margin: '1em 0' }}>
          the page that is, not the Earth <br />
          – there’s still hope for it!
        </CmTypography>
      </Box>
    </Grid>
  );
};
