import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';
import { useAppSelector } from 'store/hooks';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { UserBSharedSolutionCard, UserBSharedSolutionDetailsModal, FooterAppBar } from 'features/userB/components';
import { useSharedSolutions } from 'features/userB/hooks';

function UserBSharedSolutionsPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const { alignmentScoresId } = useAppSelector(state => state.userB);
  const { solutions, chooseSharedSolutions } = useSharedSolutions(alignmentScoresId);

  const [solutionIds, setSolutionIds] = useState<{ solutionId: string }[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  function learnMoreHandler(effectId: string) {
    analyticsService.postEvent(CardOpenEvent, effectId);
    setShowDetailsModal(effectId);
  }

  function closeCardHandler() {
    analyticsService.postEvent(CardCloseEvent, showDetailsModal!);
    setShowDetailsModal(null);
  }

  function findSolution(effectId: string) {
    const effect = solutions?.climateSolutions.find(value => value.solutionId === showDetailsModal)
    if (!effect) throw new Error(`Could not find solution with id ${effectId}`)
    return effect
  }

  function handleSelectSolution(newSolutionId: string) {
    const hasSolutionId = solutionIds.find(
      (item) => item.solutionId === newSolutionId
    );
    if (hasSolutionId) {
      setSolutionIds(solutionIds.filter((item) => item.solutionId !== newSolutionId));
    } else {
      if (solutionIds.length >= 2) return;
      setSolutionIds((prevIds) => [...prevIds, { solutionId: newSolutionId }]);
    }
  };

  async function handleSubmitSolutions() {
    await chooseSharedSolutions(alignmentScoresId, solutionIds.map((x) => x.solutionId));
    navigate(`${ROUTES.USERB_SHARED_SUMMARY_PAGE}/${conversationId}`);
  }

  return (
    <Page>
      <PageContent style={{ textAlign: 'center' }}>
        <CmTypography variant='h1'>Climate solutions for you and {solutions?.userAName}</CmTypography>

        <CmTypography variant="h4">
          Here are some solutions we’d think you’d be interested in
          based on your shared core values.
        </CmTypography>

        <CmTypography variant="body" style={{ marginBottom: 30 }}>
          Select two solutions to share with {solutions?.userAName} so you can
          act together!
        </CmTypography>

        {solutions?.climateSolutions.map((solution) => (
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
        <CmButton color='userb' text='Next: Sharing' disabled={solutionIds.length < 2} onClick={handleSubmitSolutions} />
      </FooterAppBar>

      {showDetailsModal && <UserBSharedSolutionDetailsModal showDetails={showDetailsModal !== null} {...findSolution(showDetailsModal)} onClose={closeCardHandler} />}
    </Page>
  );
}

export default UserBSharedSolutionsPage;
