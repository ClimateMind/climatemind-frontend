import React from 'react';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface InterCardContentProps {
  heading?: string;
  icon?: React.ReactNode;
  bodyText?: string;
  buttonText?: string;
}

const InterCardContent: React.FC<InterCardContentProps> = ({
  heading,
  icon,
  bodyText,
  buttonText,
}: InterCardContentProps) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        margin: '0 0 2em',
        width: '100%',
        textAlign: 'center'
      },
      // Should I be doing something differently with the fonts, the way I'm changing the size seems wrong
      boldText: { 
        fontSize: '16px'
      }
    })
  );

  const classes = useStyles();

  return (
    <Grid item sm={12} lg={12} className={classes.root}>
      <Box mb={1}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
              <Typography variant="h5" className={classes.boldText}>
                {heading}
              </Typography>
          </Grid>
          <Grid item>
              {icon}
          </Grid>
        </Grid>
      </Box>

      <Box mb={2}>
        <Grid>
          <Typography variant="body1">
              {bodyText}
          </Typography>
        </Grid>
      </Box>

      <Grid>
        <Button
            variant="contained"
            color="primary"
            disableElevation
        >
            {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
};

export default InterCardContent;
