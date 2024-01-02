import { useState } from 'react';
import { useScrollTrigger, IconButton, Typography, Toolbar, AppBar, Slide } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ProfileIcon } from 'features/auth/components';
import { MenuDrawer } from 'shared/components';

const CmAppBar: React.FC = () => {
  const [isMenuShowing, setMenu] = useState(false);
  const trigger = useScrollTrigger();

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };

  return (
    <>
      <div
        style={{
          flexGrow: 1,
          position: 'relative',
        }}
      >
        <Slide in={!trigger}>
          <AppBar
            position="fixed"
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
                <ProfileIcon />

                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 1,
                    textAlign: 'center',
                  }}
                >
                  Climate Mind
                </Typography>

                <IconButton
                  edge="start"
                  id="TopMenuToggle"
                  color="inherit"
                  aria-label="menu"
                  aria-expanded={isMenuShowing}
                  onClick={handleMenu}
                >
                  {isMenuShowing ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
        </Slide>
      </div>

      {/* {isSmall ? (
        <MenuPaper isShowing={isMenuShowing} setIsShowing={setMenu} />
      ) : ( */}
      <MenuDrawer isShowing={isMenuShowing} setIsShowing={setMenu} />
    </>
  );
};

export default CmAppBar;
