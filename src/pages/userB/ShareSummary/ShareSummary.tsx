import {
    Box,
    Button,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography,
  } from '@material-ui/core';
  import React, { useEffect } from 'react';
  import { useQuery } from 'react-query';
  import { useHistory } from 'react-router-dom';
  import getSummary from '../../../api/getSummary';
  import { COLORS } from '../../../common/styles/CMTheme';
  import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
  import PageSection from '../../../components/PageSection';
  import PageTitle from '../../../components/PageTitle';
  import ROUTES_CONFIG from '../../../components/Router/RouteConfig';
  import Wrapper from '../../../components/Wrapper';
  import { useAlignment } from '../../../hooks/useAlignment';
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        minHeight: '100vh',
      },
      typography: {
        textAlign: 'center',
      },
      upper: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        fontWeight: 500,
      },
    })
  );
  
  const ShareSummary: React.FC = () => {
    const { alignmentScoresId } = useAlignment();
    const { data, isLoading, isSuccess, error } = useQuery(['summary', alignmentScoresId], () => {
      if(alignmentScoresId) {
        return getSummary(alignmentScoresId);
      }
    });

    useEffect(()=> {
      console.log('summary data', data);
    },[data]);

    const classes = useStyles();
    // TODO: will be used later
    const { push } = useHistory();
  
    // const { conversationId } = useAlignment();
  
    const handleUserBTakesQuiz = () => {
      push(ROUTES_CONFIG.ROUTE_QUIZ);
    };
  
    return (
      <main>
        <Grid
          container
          className={classes.root}
          data-testid="PersonalValues"
          justify="space-around"
        >
          {/* --- */}
  
          <Wrapper bgColor={COLORS.SECTION5}>
            <PageSection>
              <PageTitle>Sharing is caring!</PageTitle>
  
              <Box textAlign="center">
                <Typography variant="subtitle2">Share the impact and solutions you selected 
                with {data?.userAName} and let them know which core values you share!
                </Typography>
              </Box>
              
  
              
              <FooterAppBar bgColor={COLORS.ACCENT10}>
                <Button
                  style={{ border: '1px solid #07373B', marginRight: '8px' }}
                >
                  Not Now
                </Button>
  
                <Button
                  variant="contained"
                  data-testid="take-quiz-userb-button"
                  color="primary"
                  disableElevation
                  style={{ border: '1px solid #a347ff', marginLeft: '8px' }}
                  onClick={handleUserBTakesQuiz}
                >
                  Share with {data?.userAName}
                </Button>
              </FooterAppBar>
              
            </PageSection>
          </Wrapper>
  
        </Grid>
      </main>
    );
  };
  
  export default ShareSummary;
  