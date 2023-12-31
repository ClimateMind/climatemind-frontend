import { AppBar, Grid, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import { ReactComponent as CMLogoBright } from '../../assets/cm-logo-bright.svg';
import { CmTypography } from 'shared/components';;

const VanillaAppBar: React.FC = () => {
  const trigger = useScrollTrigger();
  const iconStyle = { height: '22px', width: '24px', paddingLeft: '17px' };

  return (
    <>
      <div style={{
      flexGrow: 1,
      position: 'relative',
    }}>
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
                    <CmTypography variant="h4" style={{ color: 'white', margin: 0 }}>
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
