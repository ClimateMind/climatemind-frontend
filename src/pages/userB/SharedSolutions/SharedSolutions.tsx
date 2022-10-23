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
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import getSolutionDetails from '../../../api/getSolutionDetails';
import {
  postSharedSolutions,
  TChoosenSharedSolution,
} from '../../../api/postSharedSolutions';
import { COLORS } from '../../../common/styles/CMTheme';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/CardHeader';
import CardOverlay from '../../../components/CardOverlay';
import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
import Loader from '../../../components/Loader';
import PageSection from '../../../components/PageSection';
import PageTitle from '../../../components/PageTitle';
import Paragraphs from '../../../components/Paragraphs';
import SourcesList from '../../../components/SourcesList';
import TabbedContent from '../../../components/TabbedContent';
import Wrapper from '../../../components/Wrapper';
import { useAlignment } from '../../../hooks/useAlignment';
import { useSharedSolutions } from '../../../hooks/useSharedSolutions';
import Error500 from '../../Error500';
import ScrollToTopOnMount from '../../../components/ScrollToTopOnMount';
import { useErrorLogging } from '../../../hooks/useErrorLogging';
import { useUserB } from '../../../hooks/useUserB';

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

interface SharedSolutionsOverlayProps {
  solutionIri: string | undefined;
  selectAction: React.ReactNode;
}
// TODO: [CM-1098] Refactor over lay into new componsent and api calls into a hook
export const SharedSolutionsOverlay: React.FC<SharedSolutionsOverlayProps> = ({
  solutionIri,
  selectAction,
}) => {
  const { logError } = useErrorLogging();
  const { data, isSuccess } = useQuery(
    ['solutionDetails', solutionIri],
    () => {
      if (solutionIri) {
        return getSolutionDetails(solutionIri);
      }
    },
    {
      onError: (error) => {
        logError(error);
      },
    }
  );

  return (
    <div>
      {isSuccess && (
        <div style={{ marginTop: '-20px' }}>
          <CardOverlay
            iri="1"
            title="Overlay Title"
            cardHeader={
              <CardHeader
                title={data?.solutionTitle}
                preTitle={data?.solutionType[0]}
              />
            }
            imageUrl={data?.imageUrl}
            selectAction={selectAction}
          >
            <TabbedContent
              details={
                <Box p={3}>
                  <Paragraphs text={data?.longDescription} />
                </Box>
              }
              sources={<SourcesList sources={data?.solutionSources} />}
            />
          </CardOverlay>
        </div>
      )}
    </div>
  );
};

const SharedSolutions: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { solutions, userAName, isError, isLoading } = useSharedSolutions();
  const { logError } = useErrorLogging();

  const { alignmentScoresId } = useAlignment();

  const [solutionIds, setSolutionIds] = useState<TChoosenSharedSolution[]>([]);

  const mutateChooseSharedSolutions = useMutation(
    (data: {
      solutionIds: TChoosenSharedSolution[];
      alignmentScoresId: string;
    }) => postSharedSolutions({ solutionIds, alignmentScoresId }),
    {
      onSuccess: (response: { message: string }) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(response.message);
        }
        push({
          pathname: `/shared-summary/${conversationId}`,
          state: { from: location.pathname, id: conversationId },
        });
      },
      onError: (error: any) => {
        showToast({
          message:
            'Failed to save Shared solutions to the db: ' +
            error.response?.data?.error,
          type: 'error',
        });
        logError(error);
      },
    }
  );

  const handleNextSharing = () => {
    mutateChooseSharedSolutions.mutate({ solutionIds, alignmentScoresId });
  };

  const handleSelectSolution = (
    e: React.ChangeEvent<HTMLInputElement>,
    solutionId: string
  ) => {
    if (e.target.checked) {
      // add to selected solutions
      setSolutionIds((prevIds) => [...prevIds, { solutionId: solutionId }]);
    }
    if (!e.target.checked) {
      // remove from selected solutions
      setSolutionIds(
        solutionIds.filter((item) => item.solutionId !== solutionId)
      );
    }
    // TODO: add select logic
  };

  const isCheckboxDisabled = (currentSolutionId: string) => {
    if (solutionIds.length < 2) {
      return false; // up to 2 solutions must be selected
    } else if (
      solutionIds.find((item) => item.solutionId === currentSolutionId)
    ) {
      // the 2 solutions selected can be de-selected
      return false;
    }
    return true;
  };

  const labelStyles = {
    fontSize: '10px',
    fontFamily: 'Bilo',
    fontWeight: 500,
    lineHeight: '10px',
    maxWidth: '40px',
  };

  const actionStyles = {
    marginBottom: '-0.5em',
  };

  if (isError) return <Error500 />;

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
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <PageTitle>Climate solutions for you and {userAName}</PageTitle>

                <Box textAlign="center">
                  <Typography variant="subtitle2">
                    Here are some solutions we’d think you’d be interested in
                    based on your shared core values.
                  </Typography>
                </Box>

                <Box textAlign="center" pt={4} pb={4}>
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
                ))}

                <FooterAppBar bgColor={COLORS.ACCENT10}>
                  <Typography variant="button">
                    Selected {solutionIds.length} of 2
                  </Typography>
                  <Button
                    variant="contained"
                    data-testid="next-sharing-button"
                    color="primary"
                    disableElevation
                    disabled={!!(solutionIds.length < 2)}
                    style={{ border: '1px solid #a347ff', marginLeft: '8px' }}
                    onClick={handleNextSharing}
                  >
                    Next: Sharing
                  </Button>
                </FooterAppBar>
              </>
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default SharedSolutions;

function showToast(arg0: { message: string; type: string }) {
  throw new Error('Function not implemented.');
}
