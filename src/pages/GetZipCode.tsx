import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { postZipcode } from '../api/postZipcode';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import ROUTES from '../components/Router/RouteConfig';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import TextField from '../components/TextInput';
import Wrapper from '../components/Wrapper';
import { containsInvalidZipChars, isValidZipCode } from '../helpers/zipCodes';
// import { useNoSessionRedirect } from '../hooks/useNoSessionRedirect';
import { useSession } from '../hooks/useSession';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      marginBottom: 0,
    },
    form: {
      width: '100%',
    },
    formInput: {
      paddingRight: 8,
    },
    skipButton: {
      color: COLORS.DK_TEXT,
    },
    submit: {
      textAlign: 'center',
    },
  })
);

const GetZipCode: React.FC<{}> = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [isInputError, setIsInputError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const { setZipCode, sessionId, quizId } = useSession();
  const [postCode, setPostCode] = useState('');
  const yPadding = 3; // Padding between boxes

  // useNoSessionRedirect();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPostCode(value);
    //Input validation
    const isError = containsInvalidZipChars(value);
    setIsInputError(isError);
  };

  const handleSkip = () => {
    push(ROUTES.ROUTE_REGISTER);
  };

  const mutateAddZip = useMutation(
    (data: { postCode: string | null; sessionId: string | null }) =>
      postZipcode({ postCode, quizId })
  );

  const handleSubmit = () => {
    setZipCode(postCode); // store zipcode in context, for future use?
    mutateAddZip.mutate({ postCode, sessionId });
    push(ROUTES.ROUTE_REGISTER);
  };

  // Enable submit when zip code valid
  useEffect(() => {
    const isValidZip = isValidZipCode(postCode);
    setCanSubmit(isValidZip);
  }, [postCode]);

  return (
    <>
      <ScrollToTopOnMount />
      <Wrapper bgColor={COLORS.ACCENT1} fullHeight>
        {/* Page header */}

        <PageContent>
          <PageTitle>Climate change is location dependant.</PageTitle>

          <Box component="div" py={4}>
            <Typography variant="body1" align="center">
              Tailor your results to include impacts affecting your local area
              by entering your zip code below. (only available for US locations
              currently)
            </Typography>
          </Box>

          <form className={classes.form}>
            <Box py={yPadding}>
              <TextField
                id="zipCodeInput"
                label="Zip code"
                placeholder="90210"
                fullWidth={true}
                variant="filled"
                color="secondary"
                value={postCode}
                margin="none"
                onChange={handleInputChange}
                error={isInputError}
                helperText={isInputError ? 'Invalid Zip Code' : ' '}
              />
            </Box>
            <Box component="div" className={classes.submit} py={yPadding}>
              <Button
                id="submitButton"
                disabled={!canSubmit}
                color="primary"
                onClick={handleSubmit}
                variant="contained"
                disableElevation
              >
                SUBMIT
              </Button>
            </Box>
          </form>

          <Box py={yPadding}>
            <Typography variant="body1" align="center">
              If you don't live in the US or don't want local impacts indicated,
              click below:
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" align="center">
              <Button onClick={handleSkip} className={classes.skipButton}>
                DON'T USE ZIP CODE
              </Button>
            </Typography>
          </Box>

          <Box py={yPadding}>
            <Typography variant="body1" align="center">
              But… just so you know, your information won’t be shared with
              anyone.
            </Typography>
          </Box>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default GetZipCode;
