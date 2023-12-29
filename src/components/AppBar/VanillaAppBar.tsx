import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Slide, useScrollTrigger } from '@material-ui/core';
import { ReactComponent as CMLogoBright } from '../../assets/cm-logo-bright.svg';
import { Toolbar, AppBar } from '@material-ui/core';
import CmTypography from 'shared/components/CmTypography';
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
  })
);

const VanillaAppBar: React.FC = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const iconStyle = { height: '22px', width: '24px', paddingLeft: '17px' };

  return (
    <>
      <div className={classes.root}>
        <Slide in={!trigger}>
          <AppBar
            position="fixed"
            color="default"
            data-testid="VanillaAppBar"
            id="VanillaAppBar"
            aria-label="Climate Mind"
          >
            <Toolbar disableGutters={true}>
              <Grid justifyContent="space-between" container>
                <Grid xs={1} item>
                  <CMLogoBright style={iconStyle} />
                </Grid>
                <Grid xs={4} item>
                  <Grid container justifyContent="center">
                    <CmTypography variant="h4" className={classes.title} style={{ color: 'white', margin: 0 }}>
                      Climate Mind
                    </CmTypography>
                  </Grid>
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Toolbar>
          </AppBar>
        </Slide>
      </div>
    </>
  );
};

export default VanillaAppBar;
