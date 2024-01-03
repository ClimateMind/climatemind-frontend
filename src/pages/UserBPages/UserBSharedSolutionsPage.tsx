import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
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
import { UserBSharedSolutionCard, UserBSharedSolutionDetailsModal } from 'features/userB/components';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';

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

  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);
  const [solutionIds, setSolutionIds] = useState<TChoosenSharedSolution[]>([]);

  function learnMoreHandler(effectId: string) {
    analyticsService.postEvent(CardOpenEvent, effectId);
    setShowDetailsModal(effectId);
  }

  function closeCardHandler() {
    analyticsService.postEvent(CardCloseEvent, showDetailsModal!);
    setShowDetailsModal(null);
  }

  function findSolution(effectId: string) {
    const effect = solutions?.find(value => value.solutionId === showDetailsModal)
    if (!effect) throw new Error(`Could not find solution with id ${effectId}`)
    return effect
  }

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

  function handleSelectSolution(newSolutionId: string) {
    const hasSolutionId = solutionIds.find(
      (item) => item.solutionId === newSolutionId
    );
    if (hasSolutionId) {
      setSolutionIds(
        solutionIds.filter((item) => item.solutionId !== newSolutionId)
      );
    } else {
      if (solutionIds.length >= 2) return;
      setSolutionIds((prevIds) => [...prevIds, { solutionId: newSolutionId }]);
    }
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
                    <UserBSharedSolutionCard
                      {...solution}
                      onLearnMore={(solutionId) => learnMoreHandler(solutionId)}
                      isSelected={solutionIds.some((x) => x.solutionId === solution.solutionId)}
                      onSelected={(solutionId) => handleSelectSolution(solutionId)}
                      disabled={
                        solutionIds.length >= 2 &&
                        !solutionIds.some(
                          (x) => x.solutionId === solution.solutionId
                        )
                      }
                      style={{ marginBottom: 20 }}
                      key={solution.solutionId}
                    />
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

            {showDetailsModal && (
              <UserBSharedSolutionDetailsModal
                showDetails={showDetailsModal !== null}
                {...findSolution(showDetailsModal)}
                onClose={closeCardHandler}
              />
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default UserBSharedSolutionsPage;
