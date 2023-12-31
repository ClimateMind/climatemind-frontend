import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material';

import { COLORS } from '../../common/styles/CMTheme';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader';
import CardOverlay from '../../components/CardOverlay';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import Paragraphs from '../../components/Paragraphs';
import SourcesList from '../../components/SourcesList';
import TabbedContent from '../../components/TabbedContent';
import Wrapper from '../../components/Wrapper';
import { useAlignment } from '../../hooks/useAlignment';
import { useSharedSolutions } from '../../hooks/useSharedSolutions';
import Error500 from '../SharedPages/Error500Page';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { useUserB } from '../../hooks/useUserB';
import { ClimateApi } from '../../api/ClimateApi';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { CmButton, CmTypography } from 'shared/components';

interface SharedSolutionsOverlayProps {
  solutionIri: string | undefined;
  selectAction: React.ReactNode;
}
// TODO: [CM-1098] Refactor over lay into new componsent and api calls into a hook
export const SharedSolutionsOverlay: React.FC<SharedSolutionsOverlayProps> = ({
  solutionIri,
  selectAction,
}) => {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const { logError } = useErrorLogging();
  const { data, isSuccess } = useQuery(
    ['solutionDetails', solutionIri],
    () => {
      if (solutionIri) {
        return new ClimateApi(sessionId, accessToken).getSolutionDetails(
          solutionIri
        );
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

type TChoosenSharedSolution = {
  solutionId: string;
};

function UserBSharedSolutionsPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { solutions, userAName, isError, isLoading } = useSharedSolutions();
  const { logError } = useErrorLogging();

  const { alignmentScoresId } = useAlignment();

  const [solutionIds, setSolutionIds] = useState<TChoosenSharedSolution[]>([]);

  const mutateChooseSharedSolutions = useMutation(
    (_: {
      solutionIds: TChoosenSharedSolution[];
      alignmentScoresId: string;
    }) =>
      new ClimateApi(sessionId, accessToken).postSharedSolutions({
        alignmentScoresId,
        solutionIds,
      }),
    {
      onSuccess: (response: { message: string }) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(response.message);
        }
        navigate(`/shared-summary/${conversationId}`, {
          state: { from: location.pathname, id: conversationId },
        });
      },
      onError: (error: any) => {
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

  const actionStyles = {
    marginBottom: '-0.5em',
  };

  if (isError) return <Error500 />;

  return (
    <main>
      <Grid
        container
        style={{ minHeight: '100vh' }}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* --- */}

        <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
          <PageSection>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <CmTypography variant='h1'>Climate solutions for you and {userAName}</CmTypography>

                <Box textAlign="center">
                  <CmTypography variant="h4">
                    Here are some solutions we’d think you’d be interested in
                    based on your shared core values.
                  </CmTypography>
                </Box>

                <Box textAlign="center" pt={4} pb={4}>
                  <CmTypography variant="body">
                    Select two solutions to share with {userAName} so you can
                    act together!
                  </CmTypography>
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
                                  <CmTypography variant='label' style={{ textAlign: 'right', fontSize: 10 }}>SELECT</CmTypography>
                                  <CmTypography variant='label' style={{ textAlign: 'right', fontSize: 10 }}>TOPIC</CmTypography>
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
                        <CmTypography variant="body">
                          {solution.solutionShortDescription}
                        </CmTypography>
                      </div>
                    </Card>
                  </div>
                ))}

                <FooterAppBar bgColor={COLORS.ACCENT10}>
                  <CmTypography variant="button">
                    Selected {solutionIds.length} of 2
                  </CmTypography>
                  <CmButton
                    text='Next: Sharing'
                    disabled={solutionIds.length < 2}
                    onClick={handleNextSharing}
                  />
                </FooterAppBar>
              </>
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default UserBSharedSolutionsPage;
