import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';

import { COLORS } from '../../common/styles/CMTheme';
import { ItsBrokenIcon } from '../../components/ItsBrokenIcon';
import Wrapper from '../../components/Wrapper';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton } from 'shared/components';

const styles = makeStyles(() => {
  return {
    root: {},
    emoji: {
      fontSize: '60px',
      fontWeight: 900,
      marginTop: '15vh',
    },
    title: {
      fontSize: '32px',
      fontWeight: 900,
      margin: '1em 0',
    },
    message: { fontSize: '20px' },
    buttonDiv: {
      textAlign: 'center',
    },
    textButton: {
      color: COLORS.DK_TEXT,
      marginTop: '1em',
    },
  };
});

function Error500Page() {
  const classes = styles();
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

      <Grid item className={classes.buttonDiv}>
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
