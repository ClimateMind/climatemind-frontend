import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../common/styles/CMTheme';
import { useAuth } from '../../hooks/auth/useAuth';
import ROUTES from '../../router/RouteConfig';
import { CmTypography } from 'shared/components';

export const AccountIcon: React.FC<{}> = () => {
  const { auth } = useAuth();
  const { isLoggedIn } = auth;
  const navigate = useNavigate();

  return (
    <div
      style={{cursor: 'pointer'}}
      onClick={() => navigate(ROUTES.PROFILE_PAGE)}
    >
      {isLoggedIn && (
        <Grid
          id="AccountIcon"
          container
          item
          style={{
            width: isLoggedIn ? '40px' : '25px',
            height: isLoggedIn ? '40px' : '25px',
            borderRadius: '50%',
            backgroundColor: COLORS.SECONDARY,
            marginLeft: 'auto',
            marginRight: '30px',
          }}
          alignItems="center"
          justifyContent="center"
        >
          <CmTypography variant="h4" style={{ margin: 0, letterSpacing: 1 }}>
            {auth.userIntials ? auth.userIntials : 'CM'}
          </CmTypography>
        </Grid>
      )}
    </div>
  );
};
