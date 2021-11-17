import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { ReactComponent as CMLogoBright } from '../../assets/cm-logo-bright.svg';
import {
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
// import theme from '../../common/styles/CMTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
    },
    title: {
      color: theme.palette.primary.main,
    },
    customizeToolbar: {
      minHeight: 56
    }
  })
);

const VanillaAppBar: React.FC = () => {
  const classes = useStyles();
  const iconStyle = { height: '22px', width: '24px', paddingLeft: '17px' };

  return (
    <>
      <div className={classes.root}>
          <AppBar
            position="fixed"
            color="default"
            data-testid="VanillaAppBar"
            id="VanillaAppBar"
            aria-label="Climate Mind"
          >
            <Toolbar disableGutters={true}>
            <Grid justify={"space-between"} container>
            <Grid xs={1} item>
              <CMLogoBright style={ iconStyle }/>
            </Grid>
            <Grid xs={4} item>
              <Grid container justify={"center"}>
              <Typography variant="h6" className={classes.title}>
                  Climate Mind
                </Typography> 
              </Grid>
            </Grid>
            <Grid item xs={1} />
          </Grid>
            </Toolbar>
          </AppBar>
      </div>
    </>
  );
};

export default VanillaAppBar;
