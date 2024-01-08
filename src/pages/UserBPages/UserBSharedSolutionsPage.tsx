import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAlignment } from '../../hooks/useAlignment';
import { useSharedSolutions } from '../../hooks/useSharedSolutions';
import Error500 from '../SharedPages/Error500Page';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { useUserB } from '../../hooks/useUserB';
import { ClimateApi } from '../../api/ClimateApi';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { UserBSharedSolutionCard, UserBSharedSolutionDetailsModal, FooterAppBar } from 'features/userB/components';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';
import { useAppSelector } from 'store/hooks';

type TChoosenSharedSolution = {
  solutionId: string;
};

function UserBSharedSolutionsPage() {
  const { sessionId, user } = useAppSelector(state => state.auth);

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
      new ClimateApi(sessionId, user.accessToken).postSharedSolutions({
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
    <Page>
      <PageContent style={{ textAlign: 'center' }}>
        <CmTypography variant='h1'>Climate solutions for you and {userAName}</CmTypography>

        <CmTypography variant="h4">
          Here are some solutions we’d think you’d be interested in
          based on your shared core values.
        </CmTypography>

        <CmTypography variant="body" style={{ marginBottom: 30 }}>
          Select two solutions to share with {userAName} so you can
          act together!
        </CmTypography>

        {isLoading && <CmLoader />}

        {solutions?.map((solution) => (
          <UserBSharedSolutionCard
            key={solution.solutionId}
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
          />
        ))}
      </PageContent>

      <FooterAppBar bgColor={'#B9DEDF'}>
        <CmTypography variant="button">Selected {solutionIds.length} of 2</CmTypography>
        <CmButton color='userb' text='Next: Sharing' disabled={solutionIds.length < 2} onClick={handleNextSharing} />
      </FooterAppBar>

      {showDetailsModal && <UserBSharedSolutionDetailsModal showDetails={showDetailsModal !== null} {...findSolution(showDetailsModal)} onClose={closeCardHandler} />}
    </Page>
  );
}

export default UserBSharedSolutionsPage;
