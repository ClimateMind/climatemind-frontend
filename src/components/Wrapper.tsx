import React from 'react';
import { Grid } from '@mui/material';

export type WrapperProps = {
  bgColor?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
  bgColor,
  fullHeight = false,
}) => {
  return (
    <div style={{
      backgroundColor: bgColor ? bgColor : 'inherit',
      minHeight: fullHeight ? 'calc(100vh - 48px)' : 'auto',
      minWidth: '304px',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        style={{
          padding: '0 1em',
          minHeight: fullHeight ? '100vh' : 'auto',
        }}
      >
        <Grid item>{children}</Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
