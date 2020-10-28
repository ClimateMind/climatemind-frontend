import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

type Props = {
  message?: string;
};

const EmptyState: React.FC<Props> = ({ message }) => {
  return (
    <Grid item>
      <Typography variant="h3">
        {message ? message : 'Oops... something went wrong'}
      </Typography>
    </Grid>
  );
};

export default EmptyState;
