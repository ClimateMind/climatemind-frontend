import React from 'react';
import { Typography, TypographyProps, Box, Grid } from '@mui/material';

export interface PageTitleProps {
  align?: string;
}

const PageTitle: React.FC<TypographyProps & PageTitleProps> = ({
  children,
  variant = 'h1',
  align = 'center',
}) => {
  return (
    <Grid container direction="row" justifyContent="center">
      <Box py={8} style={{ textAlign: align ? align : 'center',
        width: '100%', }}>
        <Typography
          style={{fontSize: '32px',}}
          variant={variant}
          component="h1"
        >
          {children}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PageTitle;
