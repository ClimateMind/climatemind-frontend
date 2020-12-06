import React from 'react';
import {
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { COLORS } from '../common/styles/CMTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    content: {
      maxHeight: '50px',
      backgroundColor:  COLORS.YELLOW,
      width: '100%',
      paddingTop: '0.4em',
      marginBottom: '-5px'
    },
    smallTitle: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      marginBottom: '-0.6em',
    },
    headline: {},
    iconContainer: {
      marginLeft: '-10px'
    }
  })
);

export interface ActionHeadlineProps {
  actionHeadline: string;
  smallTitle?: string;
  icon?: React.ReactNode;
};

const ActionHeadline: React.FC<ActionHeadlineProps> = ({
  actionHeadline, icon, smallTitle
}: ActionHeadlineProps) => {
  const classes = useStyles();

  return (
    <CardContent className={classes.content} data-testid="ActionHeadline">
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid container item xs={2} justify="center" className={classes.iconContainer}>
          {icon}
        </Grid>
        <Grid item xs={10}>
          <Grid container direction="column">
            <Typography
              className={classes.smallTitle}
              gutterBottom
              variant="overline"
              component="p"
            >
              {smallTitle}
            </Typography>
            <Typography
              className={classes.headline}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {actionHeadline}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  );
};

ActionHeadline.defaultProps = {
  smallTitle: 'Action',
};

export default ActionHeadline;
