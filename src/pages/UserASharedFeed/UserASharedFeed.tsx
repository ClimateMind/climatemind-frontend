import {
  Box,
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
// import {
//     postSharedSolutions,
//     TChoosenSharedSolution,
// } from '../../../api/postSharedSolutions';
import { COLORS } from '../../common/styles/CMTheme';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader';
import CardOverlay from '../../components/CardOverlay';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import PageTitle from '../../components/PageTitle';
import Paragraphs from '../../components/Paragraphs';
import SourcesList from '../../components/SourcesList';
import TabbedContent from '../../components/TabbedContent';
import Wrapper from '../../components/Wrapper';
import Error500 from '../Error500';
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import getSelectedTopics from '../../api/getSelectedTopics';

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
  })
);

// interface SharedSolutionsOverlayProps {
//     solutionIri: string;
//     selectAction: React.ReactNode;
// }

type UrlParamType = {
  conversationId: string;
};

const UserASharedFeed: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();

  useEffect(()=>{
    console.log('conversationId', conversationId);
  },[]);
  
  const { conversationId } =  useParams<UrlParamType>();

  const { data, isLoading, isSuccess } = useQuery(
    ['selectedTopics', conversationId],
    () => {
      if (conversationId) {
        return getSelectedTopics(conversationId);
      }
    }
  );

  useEffect(() => {
    console.log('selected topics data', data);
  },[data]);

  const labelStyles = {
    fontSize: '10px',
    fontFamily: 'Bilo',
    fontWeight: 500,
    lineHeight: '10px',
    maxWidth: '40px',
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

        <Wrapper bgColor={COLORS.SECTION4}>
          <PageSection>
            {/* {isLoading ? (
                            <Loader />
                        ) : ( */}
            <>
              <PageTitle>Climate solutions for you and userAName</PageTitle>

              <Box textAlign="center">
                <Typography variant="subtitle2">
                  Here are some solutions we’d think you’d be interested in
                  based on your shared core values.
                </Typography>
              </Box>

              {/* <Box textAlign="center" pt={4} pb={4}>
                                    <Typography variant="h6">
                                        Select two solutions to share with {userAName} so you can
                                        act together!
                                    </Typography>
                                </Box>

                                {solutions?.map((solution, index) => (
                                    <div
                                        data-testid={`SharedSolutionsCard-${solution.solutionId}-testid`}
                                        key={index}
                                    >
                                        <Card
                                            header={<CardHeader title={solution.solutionTitle} />}
                                            index={index}
                                            imageUrl={solution.imageUrl}
                                            border={
                                                !isCheckboxDisabled(solution.solutionId) &&
                                                !!solutionIds.find(
                                                    (x) => x.solutionId === solution.solutionId
                                                )
                                            }
                                            disabled={isCheckboxDisabled(solution.solutionId)}
                                            footer={
                                                <SharedSolutionsOverlay
                                                    solutionIri={solution.solutionId}
                                                    selectAction={
                                                        <FormControlLabel
                                                            value="Select"
                                                            control={
                                                                <Checkbox
                                                                    onChange={(e) =>
                                                                        handleSelectSolution(e, solution.solutionId)
                                                                    }
                                                                    disabled={isCheckboxDisabled(
                                                                        solution.solutionId
                                                                    )}
                                                                />
                                                            }
                                                            label={
                                                                <>
                                                                    <Typography style={labelStyles}>
                                                                        SELECT
                                                                    </Typography>
                                                                    <Typography style={labelStyles} align="right">
                                                                        TOPIC
                                                                    </Typography>
                                                                </>
                                                            }
                                                            labelPlacement="start"
                                                            style={actionStyles}
                                                        />
                                                    }
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
                                ))} */}


            </>
            {/* )} */}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default UserASharedFeed;

