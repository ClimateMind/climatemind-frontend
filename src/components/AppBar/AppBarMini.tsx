import { AppBar, Grid, Toolbar } from '@mui/material';
import { ReactComponent as CMLogo } from '../../assets/cm-logo-bright.svg';
import { useAlignment } from '../../hooks/useAlignment';
import { CmTypography } from 'shared/components';
import { ProfileIcon } from 'features/auth/components';

export const AppBarMini: React.FC = () => {
  const { isUserB } = useAlignment();

  return (
    <>
      <div data-testid="app-bar" key="app-bar">
        <AppBar
          position="fixed"
          color="default"
          data-testid="AppBar"
          id="AppBar"
          aria-label="Climate Mind"
        >
          <Toolbar variant="dense" disableGutters={true}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              direction="row"
            >
              <CMLogo
                style={{
                  height: '22px',
                  width: '24px',
                  paddingLeft: '9px',
                }}
              />
              {!isUserB ? <ProfileIcon /> : null}

              <CmTypography
                variant="h4"
                style={{
                  flexGrow: 1,
                  textAlign: 'center',
                  marginLeft: '-29px',
                  color: 'white', margin: 0
                }}
              >
                Climate Mind
              </CmTypography>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
