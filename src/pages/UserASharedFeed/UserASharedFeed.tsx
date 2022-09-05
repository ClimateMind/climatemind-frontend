import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { COLORS } from '../../common/styles/CMTheme';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import getSelectedTopics from '../../api/getSelectedTopics';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { Pil } from '../../components/Pil';
import { SharedSolutionsOverlay } from '../userB/SharedSolutions/SharedSolutions';
import { SharedImpactsOverlay } from '../userB/SharedImpacts/SharedImpacts';
import PrevButton from '../../components/PrevButton';
import { TLocation } from '../../types/Location';

const useStyles = makeStyles(() =>
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
    prevButtonContainer: {
      height: '24px',
    },
  })
);

type UrlParamType = {
  conversationId: string;
};

const UserASharedFeed: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<TLocation>();

  const { conversationId } = useParams<UrlParamType>();

  const { conversation } = useGetOneConversation(conversationId);

  const { data, isLoading } = useQuery(
    ['selectedTopics', conversationId],
    () => {
      if (conversationId) {
        return getSelectedTopics(conversationId);
      }
    }
  );

  const handleGoBack = () => {
    if (location.state?.from && location.state?.id) {
      history.push({
        pathname: location.state.from,
        state: { from: location.pathname, id: location.state.id },
      });
    } else {
      history.goBack();
    }
  };

  return (
    <main>
      <ScrollToTopOnMount />
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* --- */}
        <Wrapper bgColor={COLORS.SECONDARY}>
          <PageSection>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <Grid item xs={3} className={classes.prevButtonContainer}>
                  <PrevButton text="Back" clickPrevHandler={handleGoBack} />
                </Grid>
                <PageTitle>
                  Your shared feed with {conversation?.userB?.name}
                </PageTitle>

                <Box textAlign="center" pb={3}>
                  <Typography variant="subtitle2">
                    These are climate effects that matter to you both; great
                    starting point for having a constructive conversation.
                  </Typography>
                </Box>

                {data?.climateEffects?.map((effect, index) => (
                  <div
                    data-testid={`TopicsEffectCard-${effect.effectId}-testid`}
                    key={index}
                  >
                    <Card
                      header={
                        <CardHeader
                          title={effect.effectTitle}
                          preTitle={
                            effect?.isPossiblyLocal ? 'Local impact' : 'Impact'
                          }
                        />
                      }
                      index={index}
                      imageUrl={effect.imageUrl}
                      footer={
                        <SharedImpactsOverlay
                          impactIri={effect.effectId}
                          selectAction={<></>}
                        />
                      }
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <Typography variant="body1">
                          {effect.effectShortDescription}
                        </Typography>
                      </div>
                      {effect.relatedPersonalValues.map(
                        (relPersonalVal, ind) => (
                          <Pil text={relPersonalVal} key={ind}></Pil>
                        )
                      )}
                    </Card>
                  </div>
                ))}

                {data?.climateSolutions?.map((solution, index) => (
                  <div
                    data-testid={`TopicsSolutionCard-${solution.solutionId}-testid`}
                    key={index}
                  >
                    <Card
                      header={
                        <CardHeader
                          title={solution.solutionTitle}
                          preTitle={'Mitigation Action'}
                        />
                      }
                      index={index}
                      imageUrl={solution.imageUrl}
                      footer={
                        <SharedSolutionsOverlay
                          solutionIri={solution.solutionId}
                          selectAction={<></>}
                        />
                      }
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <Typography variant="body1">
                          {solution.solutionShortDescription}
                        </Typography>
                      </div>
                    </Card>
                  </div>
                ))}
              </>
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default UserASharedFeed;
