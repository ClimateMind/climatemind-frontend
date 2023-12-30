import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

import { COLORS } from '../../common/styles/CMTheme';
import { ItsBrokenIcon } from '../../components/ItsBrokenIcon';
import Wrapper from '../../components/Wrapper';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton } from 'shared/components';

function Error500Page() {
  const navigate = useNavigate();
  const { logMessage } = useErrorLogging();
  const { pathname } = useLocation();

  useEffect(() => {
    logMessage(`Err500: ${pathname}`);
    //eslint-disable-next-line
  }, []);

  const sendEmail = () => {
    window.open('mailto:hello@climatemind.org');
  };

  return (
    <Wrapper bgColor={COLORS.PRIMARY}>
      <ItsBrokenIcon />

      <Grid item style={{ textAlign: 'center' }}>
        <Grid item container justifyContent="center" direction="column">
          <CmButton
            text='Go Back to Previous Page'
            onClick={() => navigate(-1)}
            style={{ marginBottom: 10 }}
          />

          <CmButton
            text='Get Help / Contact Us'
            variant="text"
            onClick={() => sendEmail()}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Error500Page;
